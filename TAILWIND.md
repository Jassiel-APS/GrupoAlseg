Tailwind quick integration (CDN)

This project now includes Tailwind via the Play CDN (loaded in `index.html`). The CDN is useful for rapid prototyping but is not recommended for production.If you want to migrate to a full Tailwind build (recommended for production), follow the steps below.

What I added:
- Inline `tailwind.config` in the head with brand colors:
  - `primary: #182259`
  - `secondary: #030A8C`
  - `accent: #0511F2`
  - `accentBlue: #367FBF`
  - `brandBlack: #0D0D0D`
- Tailwind Play CDN script tag.

How to use now:
- You can start using utility classes (e.g., `bg-primary`, `text-accentBlue`, `px-6`, `py-3`) directly in `index.html`.
- Existing `styles.css` remains and will override Tailwind where selectors match; keep that in mind.

Recommended production migration (brief):
1. Install npm and Tailwind:
   npm init -y
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
2. Configure `tailwind.config.js` with the same colors and set `content` to scan your HTML/JS files.
3. Import Tailwind directives into a new `src/styles/tailwind.css`:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
4. Build a production CSS file with Purge enabled:
   npx tailwindcss -i ./src/styles/tailwind.css -o ./dist/tailwind.css --minify
5. Replace the CDN link with the built `dist/tailwind.css` and migrate styles from `styles.css` into Tailwind utilities/components as desired.

If you want, I can:
- Convert parts of the layout to Tailwind utility classes now (header, hero, nav), or
- Create a basic npm-based Tailwind build config and generate a built `tailwind.css` in the repo.
