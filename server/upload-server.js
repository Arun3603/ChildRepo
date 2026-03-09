const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.UPLOAD_PORT || 3001;

// Uploads folder - in project root
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'gallery');
const METADATA_FILE = path.join(UPLOADS_DIR, 'metadata.json');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/i;
    if (allowed.test(path.extname(file.originalname)) || allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, PNG, GIF, WebP) are allowed'));
    }
  }
});

function getMetadata() {
  try {
    const data = fs.readFileSync(METADATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveMetadata(meta) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(meta, null, 2));
}

// CORS for dev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// GET /api/images - list all images
app.get('/api/images', (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR).filter(f => 
      /\.(jpe?g|png|gif|webp)$/i.test(f)
    );
    const meta = getMetadata();
    const images = files
      .map(f => {
        const stat = fs.statSync(path.join(UPLOADS_DIR, f));
        return {
          filename: f,
          url: `/api/images/${f}`,
          title: meta[f]?.title,
          description: meta[f]?.description,
          mtime: stat.mtimeMs
        };
      })
      .sort((a, b) => b.mtime - a.mtime)
      .map(({ mtime, ...rest }) => rest);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/images/:filename - serve image
app.get('/api/images/:filename', (req, res) => {
  const file = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return res.status(404).send('Not found');
  }
  res.sendFile(file);
});

// POST /api/upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }
  const { title, description } = req.body || {};
  const meta = getMetadata();
  meta[req.file.filename] = { title: title || '', description: description || '' };
  saveMetadata(meta);
  res.json({
    filename: req.file.filename,
    url: `/api/images/${req.file.filename}`
  });
});

app.listen(PORT, () => {
  console.log(`Upload server running on http://localhost:${PORT}`);
});
