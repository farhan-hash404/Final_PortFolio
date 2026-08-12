# Muhammad Farhan — Portfolio

Personal portfolio for **Muhammad Farhan**, AI Engineer (LLMs & Agentic Systems).
Built with React + Vite, no UI framework, no runtime dependencies beyond React itself.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build
```

The production bundle lands in `dist/`. Preview it with `npm run preview`.

## Deploy to Netlify

`netlify.toml` is already configured (`npm run build` → publish `dist`, Node 20,
SPA redirect, asset caching), so no settings need to be entered by hand.

**Option A — connect the repo (recommended)**

1. Push this folder to GitHub.
2. Netlify → *Add new site* → *Import an existing project* → pick the repo.
3. Netlify reads `netlify.toml`; just click **Deploy**.

**Option B — drag and drop**

Run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop.

**Option C — CLI**

```bash
npx netlify-cli deploy --prod
```

### After the first deploy

The Open Graph tags in `index.html` use root-relative image paths, which most
scrapers resolve fine. If you want bulletproof link previews, swap `/og.png`
for the absolute URL once you know your domain, e.g.
`https://your-site.netlify.app/og.png`.

## Editing content

**All copy lives in one file: [`src/data/content.js`](src/data/content.js).**
Name, role, contact links, projects, timeline, stack, and certifications are
plain objects — change them there and every section updates. You should not need
to touch JSX to update text.

- Replace the CV download by dropping a new PDF at
  `public/Muhammad-Farhan-CV.pdf` (or change `profile.cv`).
- Regenerate the social image by replacing `public/og.png` (1200×630).

## Structure

```
src/
  data/content.js        every string on the site
  components/
    Cursor.jsx           custom two-part cursor
    Rail.jsx             fixed left nav + mobile top bar
    Palette.jsx          ⌘K jump menu
    ProjectVisual.jsx    per-project SVG schematics
    Button.jsx           magnetic button
    Icon.jsx             inline icon set
    SectionHead.jsx      numbered section header
  sections/              Intro · Projects · Experience · Stack · Credentials · Contact
  hooks/
    useReveal.js         IntersectionObserver scroll-in
    useActiveSection.js  scroll spy for the rail
    usePointer.js        fine-pointer test, spotlight, magnetic
  styles/                design tokens + base
```

## Interaction notes

- **Custom cursor** — a dot that tracks exactly plus a ring that trails it.
  Position is written directly to the DOM inside a `requestAnimationFrame` loop,
  so moving the mouse never re-renders React. Hover variants:
  - links and buttons → ring expands, tints accent
  - the project schematic → fills accent and reads `SCHEMA`
  - text inputs → collapses to an I-beam
  - Opt any element in with `data-cursor="view"` and `data-cursor-label="…"`.
- **Spotlight** — cards track the cursor via `--mx`/`--my` CSS variables.
- **Magnetic buttons** — buttons lean toward the cursor and spring back.
- The cursor and magnetics are disabled automatically on touch devices
  (`pointer: coarse`) and for `prefers-reduced-motion: reduce`, where the system
  cursor is restored.

## Accessibility

Skip link, visible focus rings, `aria-current` on the active nav item, labelled
icon buttons, reduced-motion fallbacks, and full keyboard support in the ⌘K
palette (`↑`/`↓`/`↵`/`esc`).
