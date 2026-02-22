# Rahul's Personal Website Source

This repository contains the **source code** for my personal website, hosted at [rahulbs98.github.io](https://rahulbs98.github.io) and mirrored to [rahulbs.me](https://rahulbs.me). The website showcases my research in applied cryptography and secure computation, features my photography, and links to my Substack blog.

---

## Features

- Applied cryptography research portfolio and CV
- Blog section integrated with Substack
- Research publications loaded from BibTeX
- Photography albums with metadata support
- Dark/light theme toggle
- Fully responsive design

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Build Tools:** Node.js, npm
- **Deployment:** GitHub Pages (via rahulbs98.github.io)
- **Blog Integration:** Substack API
- **Metadata:** BibTeX for publications, JSON for albums

---

## Getting Started (Development)

1. **Clone the repository**
   ```bash
   git clone https://github.com/rahulbs98/website_src.git
   cd website_src
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Regenerate Publications (optional)**
   ```bash
   npm run pubs
   ```

6. **Regenerate Albums (optional)**
   ```bash
   npm run albums
   ```

## Deployment (GitHub Pages)

1. Push your changes to the `main` branch.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose `main` and the `/ (root)` folder, then save.
5. Your site will be available at `https://rahulbs98.github.io`.

## Albums (Organized & Tagged)

### Using Photo Manager App (Recommended)

The `photomanager/` directory contains a **Rust-based Tauri desktop app** for efficiently organizing photos.

**Setup:**
```bash
cd photomanager
npm install
npm run dev  # Start the app
```

**Workflow:**
1. Select a folder with photos
2. App scans and extracts EXIF data (date, location)
3. Edit metadata (titles, tags, location, date) for each photo
4. Create album → automatically copies photos and generates JSON

**Next steps after creating album:**
```bash
cd ..
npm run albums  # Regenerate albums.json
```

**Features:**
- ✅ EXIF auto-extraction
- ✅ Fast Rust backend
- ✅ Cross-platform (macOS, Windows, Linux)
- ✅ Auto-generates `albums.meta.json`

See [photomanager/README.md](photomanager/README.md) for detailed setup.

### Manual Workflow (No App)

1. Create folder structure:
   ```
   assets/images/albums/
   ├── tokyo-2024/
   │   ├── photo1.jpg
   │   └── photo2.jpg
   └── goa-2024/
       ├── photo3.jpg
       └── photo4.jpg
   ```

2. Add metadata in `assets/data/albums.meta.json`:
    ```json
    {
       "tokyo-2024/photo1.jpg": {
          "title": "Shibuya Crossing",
          "tags": ["travel", "architecture"],
          "location": "Tokyo, Japan",
          "date": "May 2024"
       }
    }
    ```

3. Regenerate albums:
   ```bash
   npm run albums
   ```

## Contributing

Contributions are welcome! If you want to contribute:

- Fork the repository
- Make changes on a feature branch
- Open a pull request with a clear description

**Note:** This repository is for **non-commercial use only**. Any commercial usage requires explicit permission. Please attribute the source if you reuse code, styles, or assets.

---

## License

The source code in this repository is licensed under the **MIT License**. 
All written content and photographs are © Rahul and are not **covered by the MIT License**.
They may not be reused without explicit permission. See [LICENSE](LICENSE) for details.

---

## Contact

- [GitHub](https://github.com/rahulbs98)
- [Email](mailto:rahs@itu.dk)


