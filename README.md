# Coffee Pantry

A personal archive of a home coffee hobby: equipment, brewing recipes, beans tried, cafes visited, social media posts, and people worth following.

Plain HTML/CSS/JS, no build step. Dark theme with a full-bleed, pinned photo background per page (glassmorphism cards on top) — hosted on GitHub Pages.

## Structure

- `index.html` (Beans), `recipes.html`, `equipment.html` — one page per section
- `about.html` — the personal story, plus Cafes, Social, and References folded in as full-width scrolling sections (each with its own pinned background photo), rather than separate nav pages
- `css/style.css` — shared styles, including the dark/glass theme and the per-page (`body[data-page]`) and per-section (`.hero-band[data-hero]`) background photos
- `js/main.js` — shared nav + data-rendering helpers
- `data/*.json` — one JSON file per section; each page reads its file and renders cards
- `images/backgrounds/` — the full-bleed hero photos, one per page/section
- `source-material/` — PDFs/images with raw info to be transcribed into `data/*.json` (not for direct publishing, just working source)

## Viewing locally

Because pages fetch their `data/*.json` via `fetch()`, opening the HTML files directly (`file://`) may be blocked by the browser's CORS policy. Serve the folder instead, e.g.:

```
python3 -m http.server
```

then visit `http://localhost:8000`.

## Adding content

Add a new object to the relevant `data/*.json` file (and a photo under `source-material/<section>/` if relevant) — no other changes needed, the page picks it up automatically.
