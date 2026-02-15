# Spring Festival Wishes · 新春祝福

A key-protected website for Spring Festival regards. Two keys lead to two experiences, both with dynamic fireworks and a warm red theme.

## Keys

- **`Miluna`** — Personal experience for 辛桐: festival wishes plus love phrases (e.g. "Love from your Allen", "想着你的叶"), and a **photo gallery** section. Add your photos in the `gallery/` folder (see below).
- **`2026`** — General experience: festival wishes only (e.g. "Happy Year of the Horse!", "新春快乐"), no love messages or gallery.

Both experiences share a **dynamic background**: fireworks and a subtle Year of the Horse (马) motif.

## Features

- **Key gate**: Enter **Miluna** or **2026** to unlock (case-insensitive).
- **Dynamic messages**: Phrases appear over time; Miluna’s view includes personal love messages.
- **Gallery (Miluna only)**: "我们的时光 · Our Moments" section with a grid of photos. Add images as `gallery/1.jpg`, `gallery/2.jpg`, etc. If a file is missing, a placeholder is shown.
- **Dynamic background**: Canvas fireworks (red/gold) and a soft floating 马 character on both pages.
- **Responsive**: Works on desktop and mobile.

## Try it locally

1. Open `index.html` in a browser, or run a local server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```
2. Enter **Miluna** or **2026** to see the corresponding experience.

## Customize

- **Messages**: In `script.js`, edit `GENERAL_MESSAGES` (for key 2026) and `MILUNA_MESSAGES` (for key Miluna). Add or change phrases, names, and love notes.
- **Gallery (Miluna)**: Put images in the `gallery/` folder as `1.jpg`, `2.jpg`, … up to `6.jpg`. To use more or different filenames, edit the `GALLERY_IMAGES` array in `script.js`.
- **Timing**: Adjust `MIN_INTERVAL_MS`, `MAX_INTERVAL_MS`, and `MESSAGE_DURATION_MS` in `script.js`.
- **Colors**: Change the CSS variables in `styles.css` (e.g. `--red-deep`, `--gold`).

## Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Push this folder:
   ```bash
   cd spring-festival-wishes
   git init
   git add .
   git commit -m "Spring Festival wishes site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repo: **Settings → Pages → Source**: deploy from branch **main**, folder **/ (root)**.
4. The site will be at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

**Note**: Keys are in the front-end (`script.js`), so anyone who views the source can see them. This setup is for a simple, shareable greeting page.

## License

Use and modify freely for personal or educational purposes.
