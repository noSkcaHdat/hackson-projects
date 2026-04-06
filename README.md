# HacksonAloysis Projects

Standalone recruiter-facing projects site for `projects.hacksonaloysis.me`.

This site now uses the public GitHub profile `noSkcaHdat` as its content source.

## Files

- `index.html`: projects landing page
- `projects.js`: fetches public repositories from GitHub and renders the page
- `styles.css`: shared styling for the projects site
- `CNAME`: custom domain for static hosting
- `robots.txt`: crawler rules
- `sitemap.xml`: URLs for search engines

## Local Preview

From `d:\webni`, run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/projects/`.

## Update Content

1. Open `projects/projects.js`.
2. Update `USERNAME` if your GitHub handle changes.
3. Edit the `FEATURED` list to change which repositories are highlighted first.
4. Improve GitHub repo descriptions and READMEs, since the page pulls from those fields.
5. Update `sitemap.xml` if you later add more pages.

## Deploy

Deploy the `projects/` folder as its own static site project and keep `CNAME` set to `projects.hacksonaloysis.me`.
