# Lunazo — Wheel of Fortune

Two responsive landing pages built with React, TypeScript, and Vite.

## Getting started

Requires Node.js 22.18 or later.

```sh
npm ci
npm run dev
```

- `http://localhost:5001/landing-1/` — landing page featuring Zeus.
- `http://localhost:5001/landing-2/` — landing page featuring a woman and a panther.
- `/` — the first landing page.

## Build and deployment

```sh
npm run build
```

This command checks TypeScript types and generates a static build in `dist/`.
To deploy, upload the contents of `dist/` to the website root. Source files,
`node_modules`, and configuration files do not need to be uploaded.
Configure the server to serve `index.html` within directories and redirect
directory URLs without a trailing slash to their trailing-slash equivalents.

To preview the build locally, stop the development server and run:

```sh
npm run preview
```

Both the development server and preview use `localhost:5001`.
To check types separately, run `npm run typecheck`.

## Project structure

- `src/config.ts` — links and variant settings.
- `src/App.tsx` — landing page structure.
- `src/features/wheel/` — wheel component and single-spin logic.
- `src/components/` — prize popup and footer.
- `src/styles.css` — styles and responsive layout.
- `public/assets/` — images, local fonts, and their licenses.
- `landing-1/`, `landing-2/` — HTML entry points.

The wheel spins once per page load and stops at `300% + 40 GG`.
A popup appears after the spin; clicking again reopens the result without
another spin. IP-based country routing is not implemented.
