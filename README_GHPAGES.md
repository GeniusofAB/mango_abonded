GitHub Pages deployment notes
-----------------------------
This project was adjusted for GitHub Pages.

What changed:
- Vite base set to './' so assets use relative paths.
- Vite build output set to the `docs/` folder.
- A postbuild script creates an empty docs/.nojekyll so GitHub Pages won't ignore files starting with underscore.

Publish steps:
1) Install deps: `npm install` (or `pnpm install` / `yarn`)
2) Build: `npm run build` — this produces the `docs/` folder.
3) Commit and push the repo to GitHub (main branch).
4) In GitHub repo settings -> Pages: set Source to `main` branch and `/docs` folder. Save.
5) Wait a minute — your site will be at https://<your-username>.github.io/<repo-name>.

Alternative (gh-pages branch):
- If you'd rather deploy to a `gh-pages` branch, add the `gh-pages` package and use it to publish `docs/`.

Notes:
- If you already use a `homepage` field or custom domain, check settings.
- If you get 404s, confirm `base` is './' and Pages source is `/docs` on `main`.
