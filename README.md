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

## Separate domains

Keep one shared codebase and generate two standalone site folders:

```sh
npm run build:sites
```

- Upload the **contents** of `deploy/landing-1/` to the root of the first domain.
- Upload the **contents** of `deploy/landing-2/` to the root of the second domain.

Each folder contains its own root `index.html`, shared assets, and only its
variant's images. The pages therefore load at `/` on their respective domains;
no `/landing-1/` or `/landing-2/` URL path is needed. Configure each domain to
serve its folder as the site root.

To preview both standalone builds locally, run these in separate terminals
after `npm run build:sites`:

```sh
npm run preview:landing-1 # http://localhost:5101/
npm run preview:landing-2 # http://localhost:5102/
```

The localhost ports are for local review. Domain routing and DNS are configured
on the production hosts. Rebuild with `npm run build:sites` after source changes.
The existing combined build and GitHub Pages workflow remain available.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` checks types and builds the site
on every pull request targeting `main`. Pushes to `main`, including merged pull
requests, also deploy the build to GitHub Pages. The workflow can be started
manually from the Actions tab; deployment is restricted to `main`.

In the repository settings, select **Pages → Build and deployment → Source →
GitHub Actions** before the first deployment. The `github-pages` environment
must allow deployments from `main`.

The workflow builds with the `/lunazo-wheel-of-fortune/` base path. Published URLs:

- `https://vladi375.github.io/lunazo-wheel-of-fortune/landing-1/`
- `https://vladi375.github.io/lunazo-wheel-of-fortune/landing-2/`

Local development and the default `npm run build` retain the `/` base path.

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
