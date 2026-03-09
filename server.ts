import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';
import bootstrap from './src/main.server';

const require = createRequire(import.meta.url);
const multer = require('multer');
const fs = require('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Upload config
const UPLOADS_DIR = join(process.cwd(), 'uploads', 'gallery');
const METADATA_FILE = join(UPLOADS_DIR, 'metadata.json');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req: unknown, _file: unknown, cb: (a: null, b: string) => void) => cb(null, UPLOADS_DIR),
  filename: (_req: unknown, file: { originalname: string }, cb: (a: null, b: string) => void) => {
    const ext = (file.originalname.match(/\.[^.]+$/) || ['.jpg'])[0];
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req: unknown, file: { originalname: string; mimetype: string }, cb: (a: Error | null, b: boolean) => void) => {
    const allowed = /jpeg|jpg|png|gif|webp/i;
    if (allowed.test(file.originalname) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'), false);
    }
  }
});

function getMetadata(): Record<string, { title: string; description: string }> {
  try {
    return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveMetadata(meta: Record<string, { title: string; description: string }>) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(meta, null, 2));
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.json());

  // API: list images
  server.get('/api/images', (_req, res) => {
    try {
      const files = fs.readdirSync(UPLOADS_DIR).filter((f: string) => /\.(jpe?g|png|gif|webp)$/i.test(f));
      const meta = getMetadata();
      const images = files
        .map((f: string) => ({
          filename: f,
          url: `/api/images/${f}`,
          title: meta[f]?.title,
          description: meta[f]?.description,
          mtime: fs.statSync(join(UPLOADS_DIR, f)).mtimeMs
        }))
        .sort((a: { mtime: number }, b: { mtime: number }) => b.mtime - a.mtime)
        .map(({ mtime, ...rest }: { mtime: number }) => rest);
      res.json(images);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  });

  // API: serve image
  server.get('/api/images/:filename', (req, res) => {
    const file = join(UPLOADS_DIR, req.params.filename);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.status(404).send('Not found');
      return;
    }
    res.sendFile(resolve(file));
  });

  // API: upload
  server.post('/api/upload', upload.single('image'), (req: express.Request & { file?: { filename: string } }, res) => {
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' });
      return;
    }
    const { title, description } = req.body || {};
    const meta = getMetadata();
    meta[req.file.filename] = { title: title || '', description: description || '' };
    saveMetadata(meta);
    res.json({ filename: req.file.filename, url: `/api/images/${req.file.filename}` });
  });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['SSR_PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
