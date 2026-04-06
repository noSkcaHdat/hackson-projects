# HacksonAloysis Projects

Standalone projects site for `projects.hacksonaloysis.me`.

This site now shares the same exported Astro shell, motion system, and asset structure as the main portfolio.

## Files

- `index.html`: projects landing page using the shared portfolio shell
- `_astro/`: copied CSS, JS, and media assets needed by the design
- `images/`, `fonts/`, `icons/`: local assets used by the site
- `content/site-content.template.json`: editable content for the projects site
- `tools/site_content.py`: export/apply helper for updating the site content
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

From `d:\webni\projects`, run:

```powershell
python tools/site_content.py export
```

Edit `content/site-content.template.json`, then apply the changes:

```powershell
python tools/site_content.py apply
```

The featured GitHub repositories in the projects section are currently defined in `content/site-content.template.json`.

## Deploy

Deploy the `projects/` folder as its own static site project and keep `CNAME` set to `projects.hacksonaloysis.me`.
