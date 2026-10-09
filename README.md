# Lunazo — Wheel of Fortune

Four responsive landing pages built with React, TypeScript, and Vite: two visual
designs for Argentina and Colombia.

## Getting started

Requires Node.js 22.18 or later.

```sh
npm ci
npm run dev
```

- `http://localhost:5001/wheel-v1-co/` — Zeus, Colombia.
- `http://localhost:5001/wheel-v1-ar/` — Zeus, Argentina.
- `http://localhost:5001/wheel-v2-co/` — woman and panther, Colombia.
- `http://localhost:5001/wheel-v2-ar/` — woman and panther, Argentina.
- `/` — an alias for `wheel-v1-co`.

The four URLs and standalone builds are separate. Country-specific copy,
bonuses, and destination links have not yet been supplied, so each country's
page currently shares the copy and links of its visual design.

For separate development servers with live reload, start these commands in
different terminals:

```sh
npm run dev:wheel-v1-co # http://localhost:5101/
npm run dev:wheel-v1-ar # http://localhost:5102/
npm run dev:wheel-v2-co # http://localhost:5103/
npm run dev:wheel-v2-ar # http://localhost:5104/
```

`npm run dev` remains the combined development server on port 5001.

## Build and deployment

### GitLab deployment at `/lunazo/`

The `start.lunazo.bet` repository serves these four routes:

- `/lunazo/wheel-v1-ar/`
- `/lunazo/wheel-v1-co/`
- `/lunazo/wheel-v2-ar/`
- `/lunazo/wheel-v2-co/`

After changing source files, run `npm run build:gitlab`. Copy the contents of
`deploy/lunazo/` into the GitLab repository's top-level `lunazo/` directory and
commit both the source changes and this generated directory. The four
`lunazo/wheel-*/index.php` files include their matching compiled pages in
`lunazo/dist/`; all pages share the compiled assets in `lunazo/dist/assets/`.
The build checks that these entry points and asset references resolve. This
format follows the PHP entry and committed build used by `lunazo-partners`.

The top-level `lunazo/index.php` also handles these four routes if the root
front controller forwards nested URLs to it. It can serve the compiled assets
when requests are forwarded through PHP; a normal web server may serve those
files directly. The directory name now matches the `/lunazo/` URL, so no
special alias to `lunazo-wheel-of-fortune/` is needed. Do not copy only the
source directory or only the `dist` directory: both the PHP entries and
`lunazo/dist/` must be present at the domain root.

### General static build

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

Keep one shared codebase and generate four standalone site folders:

```sh
npm run build:sites
```

- Upload the **contents** of the appropriate `deploy/wheel-v1-co/`,
  `deploy/wheel-v1-ar/`, `deploy/wheel-v2-co/`, or `deploy/wheel-v2-ar/` folder
  to its domain's document root.

Each folder contains its own root `index.html`, shared assets, and only its
variant's images. The pages therefore load at `/` on their respective domains;
no variant or country URL path is needed. Configure each domain to serve its
folder as the site root.

To preview the standalone builds locally, run these in separate terminals
after `npm run build:sites`:

```sh
npm run preview:wheel-v1-co # http://localhost:5101/
npm run preview:wheel-v1-ar # http://localhost:5102/
npm run preview:wheel-v2-co # http://localhost:5103/
npm run preview:wheel-v2-ar # http://localhost:5104/
```

Stop the dev servers before starting previews because each pair uses the same
ports.

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

- `https://vladi375.github.io/lunazo-wheel-of-fortune/wheel-v1-co/`
- `https://vladi375.github.io/lunazo-wheel-of-fortune/wheel-v1-ar/`
- `https://vladi375.github.io/lunazo-wheel-of-fortune/wheel-v2-co/`
- `https://vladi375.github.io/lunazo-wheel-of-fortune/wheel-v2-ar/`

Local development and the default `npm run build` retain the `/` base path.

## Project structure

- `src/config.ts` — links and variant settings.
- `src/App.tsx` — landing page structure.
- `src/features/wheel/` — wheel component and single-spin logic.
- `src/components/` — prize popup and footer.
- `src/styles.css` — styles and responsive layout.
- `public/assets/` — images, local fonts, and their licenses.
- `wheel-v1-co/`, `wheel-v1-ar/`, `wheel-v2-co/`, `wheel-v2-ar/` — HTML entry points.

The wheel spins once per page load and stops at `300% + 40 GG`.
A popup appears after the spin; clicking again reopens the result without
another spin. Country selection uses explicit URLs; IP-based routing is not
implemented.
