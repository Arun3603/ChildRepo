# The Child Trust - Angular Website

A static Angular website for The Child Trust with image upload capability. Images are stored in the `uploads/gallery` folder within the project.

## Features

- **Home** – Hero section, mission, driving principles, core values
- **Events** – Upcoming events and activities
- **Donation** – Donation options and information
- **Trustees** – Board members list
- **News** – Latest updates and stories
- **Gallery** – Image gallery with upload (images stored in project folder)

## Run the Application

### Development (with image upload)

For image upload to work, run both the Angular dev server and the upload API:

```bash
# Terminal 1: Angular app
npm start

# Terminal 2: Upload server (for Gallery)
npm run upload-server
```

Then open http://localhost:4200

### Production (SSR with upload)

```bash
npm run build
npm run serve:ssr:FirstNew
```

Open http://localhost:4000 — the built-in server handles both the app and image upload API.

## Image Upload

- Images are saved to `uploads/gallery/` in the project root
- Metadata (title, description) is stored in `uploads/gallery/metadata.json`
- Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
