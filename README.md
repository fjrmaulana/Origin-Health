# Origin Health — Landing Page

A minimal, calm landing page for **Origin Health**, a primary-care and wellness brand.
Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html          Page markup
css/styles.css      All styles (tokens, layout, responsive rules)
js/main.js          Mobile menu, booking widget, scroll reveal
assets/logo.png     Logo (dark), assets/logo-light.png (light)
assets/fonts/       Newsreader + Figtree (self-hosted, SIL Open Font License)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Publish with GitHub Pages

1. Push this folder to a GitHub repository (files at the repo root).
2. Set the repository to **Public** (Settings › General › Danger Zone › Change visibility).
3. Go to **Settings › Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<username>.github.io/<repo-name>/`.

No compiling is needed; GitHub Pages serves the files as they are.

## Placeholders to replace

- `[PHONE NUMBER]` in the CTA section
- `[CLINIC ADDRESS]` in the footer

## Design notes

- Palette from the logo: olive ink `#404934`, sage dot `#969876`, cool mist `#EDF1EE`, ground `#F7F7F3`.
- Type: Newsreader (display serif) and Figtree (sans).
- Concept: concentric rings radiating from the logo’s sage dot, care that starts at its origin.
- The booking card shows the next five weekdays automatically. The form is a front-end demo; connect it to a booking system before going live.
