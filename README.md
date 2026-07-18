# Yutika Agarwal — Portfolio

A fast, hand-editable personal portfolio. No frameworks, no build step.
Just plain **HTML / CSS / JavaScript** — open `index.html` in a browser to preview.

## Files
| File | What it holds |
|------|----------------|
| `index.html` | All your text content (edit here most often) |
| `style.css`  | Colors, spacing, fonts, animations |
| `script.js`  | Scroll animations + mobile menu (rarely edit) |
| `assets/`    | Your résumé PDF and any images |

## How to make changes
- **Edit text** → open `index.html`, change words between the tags, save, refresh browser.
- **Add a project link** → find the project card in `index.html`, replace `href="#"` with your URL,
  e.g. `href="https://github.com/agarwalyutika/your-repo"`.
- **Change the accent color** → edit `--accent` at the top of `style.css`.
- **Swap the résumé** → replace `assets/Yutika_Agarwal_Resume.pdf` (keep the same name) or update the link in `index.html`.

## Preview locally
Just double-click `index.html`. (Optional: run a local server for a cleaner preview —
`python -m http.server` then visit http://localhost:8000)

## Publish on GitHub Pages (free)
Run these in this folder, one block at a time:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/agarwalyutika/agarwalyutika.github.io.git
git push -u origin main
```

> First create an **empty** repo on GitHub named exactly **`agarwalyutika.github.io`**
> (Public, no README). After pushing, your site goes live at:
> **https://agarwalyutika.github.io**

To update later, just:
```bash
git add .
git commit -m "Update content"
git push
```

(Alternatively, name the repo anything like `portfolio`, push, then enable
GitHub Pages under **Settings → Pages → Branch: main**. The URL becomes
`https://agarwalyutika.github.io/portfolio`.)
