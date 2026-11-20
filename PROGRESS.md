# OrganonGallery — progress and continuation plan

Updated: 2026-11-20. Phase: gallery frame and Basic Site complete; awaiting design review before source-project import.

## Agreed requirements
- Public web app in F:\GITHUB\OrganonGallery, hosted through its GitHub repository.
- Browse websites, web apps, databases, Chrome extensions and other genuinely distinct layouts.
- Unbranded templates: generic logos, lorem ipsum content; retain standard menus and controls.
- Detail view with features, live iframe preview, fullscreen, responsive sizes and ZIP download.
- Working menus, hover states and tooltips. Sample data for previews; no live private services.
- Named palettes on each template, not duplicate templates for recolors: LCARS, Cyberpunk, Windows Default, Cherry Blossom, Springtime, plus a neutral default.
- Build the frame first, import existing projects second. Include one usable template called Basic Site now.
- Keep this single Markdown file current so another chat or worker can continue independently.

## Locations
- Existing projects: F:\GITHUB (26 top-level folders observed, including this gallery).
- Extensions: C:\Users\User\OneDrive\Documents\Extentions (11 top-level folders observed).
- Initial writable staging: C:\Users\User\OneDrive\Documents\ChatGPT\Organon\OrganonGallery.
- Intended destination: F:\GITHUB\OrganonGallery. Initially contains only .git and .gitattributes. Preserve Git metadata.

## Phase one
- [x] Build responsive gallery, category/search filters, favorites and sorting.
- [x] Build detail view, actual iframe, fullscreen, responsive preview and named palettes.
- [x] Add Basic Site with generic content and functioning controls.
- [x] Generate six ZIPs which preserve the selected palette.
- [x] Check interactions and package contents.
- [x] Prepare GitHub Pages deployment configuration.
- [x] Copy finished files into F:\GITHUB\OrganonGallery; verify copied source hashes and six ZIPs. Open browser preview for review.

## Phase two — after user reviews the frame
1. Inventory source projects. Read local AGENTS.md instructions before examining each project.
2. Identify unique structures and interaction patterns. Group similar layouts; colors are theme options.
3. Extract reusable templates into self-contained folders; remove brands, personal data, credentials, integrations and runtime data. Keep menus and normal controls.
4. Check third-party asset/license requirements before making ZIPs public.
5. Replace gallery layout studies with real imported templates. Preserve separate source provenance metadata.
6. Verify interactive previews and ZIPs, then publish via the user's GitHub repository.

## Implementation decisions
- Buildless HTML/CSS/JavaScript, relative paths, no external fonts or services; suitable for GitHub Pages subpaths.
- Layout studies are explicitly marked as studies. Basic Site is the initial real downloadable template.
- Downloads are prebuilt per palette. The site needs no server to generate ZIPs.
- Native fullscreen has a new-tab fallback. iframe isolates previews from gallery styling.
- No source projects have been copied or published yet.

## What is implemented
- Basic Site: responsive header and mobile navigation, Services dropdown, anchor sections, interactive feature dialogs, hover states/tooltips, sample contact form with validation and local confirmation, placeholder CSS artwork.
- Six palettes: Studio, LCARS, Cyberpunk, Windows Default, Cherry Blossom, Springtime.
- Five clearly labeled layout studies, not imported templates: Overview dashboard, Workspace task board, Data Room records UI, Pocket Panel extension popup, Blank Page document editor. Studies have working controls; downloads intentionally only appear on Basic Site.
- Save favorites in browser storage, search, category filters, sort, desktop/tablet/mobile iframe sizes, native fullscreen with new-tab fallback.
- Files: index.html, style.css, app.js, favicon.svg, previews/demo.html, build_downloads.py, downloads/*.zip, .github/workflows/pages.yml, .gitignore, this progress file.

## Verification completed
- Chrome browser checks passed for all six cards, category/search filters, persisted favorites, menus/dialogs, all palette switches, all six ZIP requests, an actual selected-palette download, demo contact form, mobile menu, preview size controls and native fullscreen.
- Study interactions checked: move task, search records, schema dialog, editable document word count and View menu focus mode.
- Gallery and detail layouts checked at 390px for horizontal overflow; desktop/mobile screenshots inspected.
- No browser exceptions or failed HTTP requests during the complete browser check.
- All six ZIP archives passed integrity checks; extracted JavaScript parses. Gallery and iframe scripts also pass Node syntax checks.
- Additional direct-file check passed: gallery loads from index.html without a server, iframe loads, and LCARS palette selection works. On file:// palette switching reloads the iframe; on HTTP it preserves state through messaging.
- Browser QA artifacts are in qa/ in the staging folder only and are ignored by Git.

## Local use and deployment
- Open index.html directly in a browser; no dependency installation required. Or serve this folder with any static web server.
- Rebuild downloads with: python build_downloads.py (Python standard library only). All other functionality is buildless.
- Confirmed Git remote: https://github.com/cinaedvsstudios/OrganonGallery.git ; branch: main.
- GitHub Pages workflow builds downloads and uploads only public site files. This progress file and QA files are not in the published artifact.
- To publish after review: commit/push to main, select GitHub Pages source = GitHub Actions in repository settings, and run/observe the deployment workflow. No commit, push, repository settings change or public deployment has been performed in this session.
- Expected Pages subpath is /OrganonGallery/; all site links are relative to support that path.
- Destination files are currently untracked, ready for review and an initial implementation commit. Existing .git and .gitattributes were preserved.

## Resume
Read this file, inspect current repository files and Git status, then continue the unchecked steps. Do not start importing source projects until the frame is complete. Do not replace existing source projects. Update this file with checks, remaining issues and deployment state.
