# Website Configuration Guide

## Substack Blog Integration

To connect your Substack blog to the website, you need to update the blog page with your Substack username:

### Steps:

1. **Open `blog.html`**
2. **Find this line** (near the bottom):
   ```javascript
   const blogManager = new SubstackBlogManager('your-substack-username');
   ```

3. **Replace `'your-substack-username'`** with your actual Substack subdomain
   - Example: If your Substack URL is `https://mycryptoblog.substack.com`, use `'mycryptoblog'`
   - Example: If your Substack URL is `https://rahulsatish.substack.com`, use `'rahulsatish'`

### How It Works:

- The blog page automatically fetches your latest 12 published posts from your Substack RSS feed
- Posts are displayed with title, date, category, excerpt, and a link to read on Substack
- If a post has a cover image, it's displayed; otherwise, it shows a gradient background
- New posts will automatically appear when you publish them on Substack

### Troubleshooting:

- **Posts not showing?** Make sure they're published (not drafts) on Substack
- **Wrong subdomain?** Double-check your Substack URL and use only the subdomain part
- **Styling looks odd?** Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

---

## Theme Configuration

The website automatically supports light and dark modes:

- **Theme Toggle**: Click the moon/sun icon in the top-right corner
- **Auto-Detection**: If no preference is saved, uses your system's theme preference
- **Persistent**: Your theme choice is saved in your browser

To change colors, edit the CSS variables in `assets/css/style.css`:

```css
:root {
  --color-accent: #0ea5e9;          /* Main accent color */
  --color-accent-secondary: #06b6d4; /* Secondary accent */
  --color-accent-tertiary: #a78bfa;   /* Tertiary (purples, gradients) */
  /* ... other variables ... */
}
```

---

## Social Links Configuration

Edit social links in `assets/js/components.js`:

```javascript
const SOCIAL_LINKS = [
  { icon: 'github', url: 'https://github.com/rahulbs98', label: 'GitHub' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/in/rahulbs98', label: 'LinkedIn' },
  { icon: 'email', url: 'mailto:rahs@itu.dk', label: 'Email' },
  // ... update URLs to your actual profiles
];
```

---

## Publications from BibTeX

Publications automatically load from `assets/data/publications.json` which is generated from `publications.bib`.

To update publications:

```bash
node convertBib.js
```

This will regenerate the JSON file from your BibTeX entries.

---

## Quick File Reference

| File | Purpose |
|------|---------|
| `index.html` | Homepage with hero section |
| `about.html` | About page |
| `blog.html` | Blog (Substack RSS integration) |
| `publications.html` | Research publications |
| `albums/index.html` | Photo gallery |
| `assets/css/style.css` | All styling (theme colors, layouts) |
| `assets/js/components.js` | Theme toggle, social links, footer |
| `publications.bib` | BibTeX bibliography file |
| `convertBib.js` | Script to convert BibTeX to JSON |

