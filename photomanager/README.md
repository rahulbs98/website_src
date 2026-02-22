# 📸 Photo Album Manager

A **Rust-based Tauri desktop app** for efficiently organizing photos into albums with automatic metadata generation.

## Features

- ✅ **Tauri + Rust Backend**: Lightning-fast file operations
- ✅ **EXIF Auto-Extraction**: Automatically extracts date and GPS location from photos
- ✅ **Image Preview**: View photos while editing metadata
- ✅ **Photo Organization**: Create album folders and organize photos
- ✅ **Metadata Generation**: Auto-generates `albums.meta.json` with all photo metadata
- ✅ **Cross-platform**: Works on macOS, Windows, Linux
- ✅ **Efficient**: Fast local processing, no network required

## Prerequisites

**1. Install Rust** (if not already installed):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After installation, run:
```bash
source $HOME/.cargo/env
```

**2. Install Node.js** (https://nodejs.org/) - version 16 or higher

**3. Add Rust to your PATH permanently**:

```bash
echo 'source $HOME/.cargo/env' >> ~/.zshrc
source ~/.zshrc
```

## Setup & Installation

```bash
# 1. Navigate to photomanager folder
cd website_src/photomanager

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
```

**Important**: If you get a "cargo not found" error, run:
```bash
source $HOME/.cargo/env
npm run dev
```

## Usage Workflow

1. **Launch the app**: `npm run dev` (in photomanager directory)
2. **Select folder**: Choose a folder with photos to organize
3. **Scan**: App scans and automatically extracts EXIF data (date, GPS location if available)
4. **Edit metadata**: 
   - View photo previews to identify images
   - Review and update titles, tags (comma-separated), location, dates
   - EXIF data for date and location is auto-filled if available
   - Photos without EXIF data will have empty date/location fields
5. **Set album details**: 
   - Enter album name (e.g., "tokyo-2024")
   - Select output path: `website_src/assets/images/albums`
6. **Create Album**: Click to generate everything
7. **Deploy**: Run `npm run albums` in `website_src/` to update your site

## What It Creates

When you create an album, the app:

1. **Creates folder**: `assets/images/albums/{album-name}/`
2. **Copies photos**: All photos go into the album folder
3. **Generates JSON**: Updates `albums.meta.json` with all metadata

Example output:
```
assets/images/albums/
└── tokyo-2024/
    ├── shibuya-crossing.jpg
    ├── senso-ji.jpg
    └── ... (more photos)

assets/data/albums.meta.json:
{
  "tokyo-2024/shibuya-crossing.jpg": {
    "title": "Shibuya Crossing",
    "tags": ["travel", "architecture"],
    "location": "Tokyo, Japan",
    "date": "May 2024",
    "album": "tokyo-2024"
  }
}
```

## Architecture

- **Backend (Rust)**: File I/O, image scanning, photo copying
- **Frontend (React + Vite)**: User interface with multi-step workflow
- **Tauri Bridge**: Secure IPC between frontend and backend

## Troubleshooting

**"cargo not found" error**
```bash
source $HOME/.cargo/env
```
Or add to ~/.zshrc permanently:
```bash
echo 'source $HOME/.cargo/env' >> ~/.zshrc
```

**Build fails with Rust errors**
```bash
rustup update
cargo clean
npm run dev
```

**Port 5173 already in use**
- Stop other Vite servers or change the port in `vite.config.js`

**File permission issues**
- Grant the app permission to access folders when prompted by macOS

## License

Same as parent website project (MIT for code, © for content/photos)

---

**Built with ❤️ using Tauri + Rust + React**
