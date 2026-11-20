# OrganonGallery — progress and continuation plan

Updated: 2026-11-20. Current phase: first design review implemented, verified and saved to F:\GITHUB\OrganonGallery. Ready for further user feedback or phase-two source import. Existing project import is still phase two.

## User requirements and accepted feedback
- Public web app in F:\GITHUB\OrganonGallery, hosted through the user's GitHub repository.
- Browse distinct templates, see features, try a working iframe, expand fullscreen and download a ZIP.
- Templates must be unbranded: generic logos, lorem ipsum, image placeholders. Keep standard menus and controls.
- Color changes are options on a template, never duplicate gallery entries.
- Blue sticky left navigation with white text. Darker borders and readable contrast throughout.
- Sticky charcoal top bar holds the current page title and a Color palette dropdown. Do not repeat the title in the gallery body.
- No promotional slogans, marketing banners, Explore palettes button, progress pitches or duplicate right-hand palette panel.
- Show features as plain text above the preview. Keep desktop/tablet/mobile controls and fullscreen.
- Replace Desktop apps category with Dashboards. Blank Page now belongs under Web apps; Overview belongs under Dashboards.
- Add Elements for reusable pieces that can be combined with templates. Initial elements: Navigation Panel, Photo Gallery, Tabs & Accordion.
- Build the frame before extracting source projects; retain one progress/plan Markdown file in the repository.

## Locations and repository
- Destination and source of truth: F:\GITHUB\OrganonGallery.
- Remote: https://github.com/cinaedvsstudios/OrganonGallery.git ; branch: main.
- Other existing projects: F:\GITHUB (26 initial top-level folders, including this gallery).
- Extension projects: C:\Users\User\OneDrive\Documents\Extentions (11 initial folders).
- Writable staging copy: C:\Users\User\OneDrive\Documents\ChatGPT\Organon\OrganonGallery.
- QA scripts, extracted sample ZIPs and screenshots: qa/ in the staging copy; ignored by Git and excluded from publication.
- Read applicable AGENTS.md instructions before working in another source project. Preserve existing .git and .gitattributes.

## Current content
Ready, previewable and downloadable:
1. Basic Site: responsive header, navigation dropdown, two-column hero, cards, dialogs, validated demo contact form.
2. Editorial Site: asymmetrical three-column hero, serif headings, image panels, pill controls. Inspired by the user's first supplied website reference, with generic content and no copied brand or photography.
3. Panorama Site: full-height background placeholder, floating navigation, centered hero, project dialog and section navigation. Inspired by the user's second website reference, with local CSS artwork.
4. Navigation Panel element: expandable groups, active page state and responsive menu toggle.
5. Photo Gallery element: filterable grid, lightbox, previous/next and keyboard/Escape controls. Generic local SVG placeholders.
6. Tabs & Accordion element: accessible keyboard tabs, expandable panels, settings switch and dialogs.

Five interactive layout studies (clearly labeled Study; no download): Overview dashboard, Workspace task board, Data Room table, Pocket Panel extension popup, Blank Page editor. These are demonstration UI layouts, not extractions from the user's original projects.

Total: 11 gallery entries. Three website templates and three elements have downloads. Each of the six downloadable starters has 21 prebuilt palette ZIPs (126 archives total).

## Palettes
Single source: palettes.js. The gallery, iframe previews and downloadable starters all read this same registry.

Studio, LCARS, Cyberpunk, Windows Default, Cherry Blossom, Springtime, Ink Wash, Burnt Sienna, Desert Dusk, Zesty Lemon, California Beaches, Sunny Day, Bubblegum Pop, Cool Revival, Neon Jungle, Pop Art, Cobalt Sky, Salt and Pepper, Old Photograph, Cappuccino, Mountain Mist.

- Cherry Blossom retains its name but uses the Wisteria Bloom reference: #D3D3FF, #9400D3, #D8BFD8, #ED80E9.
- Neon Noir is merged into Cyberpunk: black, #2CFF05, #BF00FF and #2D2D2D, plus the previous yellow/pink accents. There is no separate duplicate Neon Noir scheme.
- All supplied reference palette hex values are recorded in palettes.js. Additional light/dark text/background tokens keep controls readable.
- Selecting a palette on the gallery sets the scheme for the next preview; selecting it in a template updates the iframe and the download link. Gallery thumbnail drawings remain neutral structural previews.

## Files and operation
- index.html: sidebar, sticky title bar, palette dropdown and help dialog.
- app.js: metadata, filters, sorting, saved favorites, routing, fullscreen and responsive preview controls.
- style.css: gallery presentation. Later review overrides are at the end.
- palettes.js: palette names, reference swatches and semantic CSS token values.
- previews/demo.html: shared iframe host and original studies/Basic Site.
- previews/websites.css and websites.js: Editorial/ Panorama website layouts.
- previews/elements.css and elements.js: reusable element demos.
- build_downloads.py: standard-library Python ZIP builder. Embeds the selected default scheme, strips unused study logic, and includes needed local assets plus setup instructions.
- downloads/: 126 static ZIP files; no server or credentials required.
- .github/workflows/pages.yml: GitHub Pages deployment workflow, uploading only public site files, including palettes.js.
- PROGRESS.md: this single handoff file.

Open index.html directly in a browser, or serve the folder with any static web server. Rebuild ZIPs with `python build_downloads.py`. No Node packages or build installation are needed to use the gallery.

Each ZIP opens independently and includes editable source, all palettes, START-HERE.txt and a generic starter license. Contact forms validate and confirm locally; no messages are sent. Database/extension studies have no live connection or browser permissions. Elements include component source for manual reuse; a visual mix-and-match page builder has not been implemented or requested yet.

## Verification
- Complete Chrome browser review passed: blue/white sidebar, darker borders, sticky charcoal title bar, one gallery page title, removed promotional copy, no right sidebar, inline features, categories, search, sorting and saved favorites.
- All 21 palette switches checked; selected ZIP links match the chosen palette. Cherry Blossom reference values and Cyberpunk merge explicitly checked.
- Menus, information dialogs, demo contact form, fullscreen and responsive sizes checked. Sticky top bar stays at viewport top while scrolling.
- New website menus/dialogs and phone navigation checked.
- Elements checked: nested navigation/active states, gallery filtering/lightbox/next/previous/keyboard/Escape, keyboard tabs and accordion expansion.
- Actual element ZIP download checked. All 126 archives passed integrity, selected-config and asset-reference checks. Six representative extracted starters passed JavaScript syntax and standalone browser checks.
- All ready entries fit 390px outer and inner viewports. Phone palette dropdown fits. Desktop and mobile screenshots inspected.
- Full review run had no browser exceptions or failed HTTP requests.
- Direct-file gallery/iframe/theme switching checked. On file:// a palette change reloads the iframe; on HTTP it preserves demo state using messaging.
- Final desktop/mobile menu CSS is included in the rebuilt standalone downloads. All six rebuilt starters were reopened and checked after resuming.

## Deployment state
No commit/push or deployment performed by this agent. The user committed the initial frame between reviews; repository was clean when this review began. Do not overwrite unrelated user changes.

GitHub Pages workflow is prepared. To publish when requested: commit/push reviewed files to main, set Pages source to GitHub Actions if necessary, and observe workflow completion. Relative links support /OrganonGallery/. QA files and this progress file are excluded from the published artifact.

## Next steps
1. Completed: final ZIP rebuild, integrity/asset checks, repository copy and updated-frame preview.
2. Apply further frame feedback if requested.
3. Inventory F:\GITHUB and the extensions folder. Identify genuinely distinct layouts and components; group recolors as themes.
4. Extract reusable templates and elements. Remove brands, private data, credentials, runtime data and unnecessary live integrations. Record source provenance and check third-party asset licenses before public distribution.
5. Replace demonstration studies with verified imported content. Keep generic lorem ipsum, standard controls and accurate feature lists.
6. Verify each preview, responsive layout and ZIP. Publish through the user's repository when requested.

## Resume
Read this file, inspect repository status and current source, then continue the next steps. Preserve the latest user feedback: functional library interface, no promotional copy, palettes in the sticky top bar, no right-hand panel, and separate Elements and Dashboards categories. Update this file as work progresses.
