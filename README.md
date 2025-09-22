# SmartInventory - Frontend Only

A standalone Vite + React + TypeScript + Tailwind project extracted from the monorepo. This runs independently of the Django backend, using mocked data in the UI.

## Features
- React 18 + TypeScript
- Vite 5 bundler
- TailwindCSS 3
- Lucide React icons
- Demo login, dashboard, upload, and alerts screens

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open the URL Vite prints, e.g. http://localhost:5173

3. Build for production (optional)

```powershell
npm run build
npm run preview
```

## Deploy

This is a static Vite + React site. The production build outputs to `dist/`. You can deploy it on any static host.

### Netlify

Fastest path with zero config (we added `netlify.toml`).

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Create a site at https://app.netlify.com and connect the repo.
3. Build settings:
	- Build command: `npm run build`
	- Publish directory: `dist`
4. Deploy. Client-side routing is handled via SPA fallback.

Local CLI deploy (optional):

```powershell
npm install -g netlify-cli ; netlify deploy --build --prod
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/repo/', // set to '/your-repo-name/'
})
```

### Option D — Any static host (S3, Cloudflare Pages, Azure Static Web Apps, Nginx)

1. Build locally:

```powershell
npm run build
```

2. Upload the contents of `dist/` to your host/bucket.
3. Ensure SPA fallback to `/index.html` for client-side routing:
	- S3/CloudFront: set 404/SPA redirect to `/index.html`
	- Cloudflare Pages: Framework preset = Vite; enable SPA fallback
	- Nginx: `try_files $uri /index.html;`

### Environment variables

If you add environment variables, prefix them with `VITE_` and they’ll be embedded at build time (e.g. `VITE_API_URL`). Configure them in your hosting provider’s dashboard as needed.

## Notes
- No backend calls are made; data is mocked in `App.tsx`.
- If Tailwind classes look unstyled, ensure PostCSS/Tailwind dependencies installed and that `postcss.config.js` and `tailwind.config.js` exist at project root.
