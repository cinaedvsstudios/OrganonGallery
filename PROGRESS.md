# OrganonGallery — progress and continuation plan

## PROJECT HANDOFF DOWNLOADS — completed and verified (2026-11-20)
- All 31 downloadable starters, in all 21 palettes (651 static ZIPs), now include BUILD-INSTRUCTIONS.md, optional PROJECT-BRIEF.md and TEMPLATE-MANIFEST.json or ELEMENT-MANIFEST.json. START-HERE.txt points to them. Manifests record base/additional-element role, exact palette tokens/roles, custom visual settings, entry point, render function/source, features and extension manifest path where relevant.
- Instructions preserve the chosen design and interactions, read supplied content first, ask one short batch of only unanswered applicable questions, accept "I'll provide it later", record TO PROVIDE items, and start building immediately if no essential answers are missing. Missing destinations/integrations remain clearly pending; no invented emails, URLs or claims of successful sending/publishing.
- Category questions cover simple website content/contact/link destinations; interactive-app state; database engine/local-browser/file-import/server choices, private/shared data and permissions; dashboard sources/filters/calculations; native extension target sites, permissions, storage, lifecycle and distribution; and element placement/content/host behavior.
- Every actual template/element has its own control-specific questions and preserved-behavior notes in package_instructions.py. All eight element types are covered. Native extension profiles distinguish Workflow Popup (toolbar popup), Automation Queue (separate window) and Social Composer (side panel). Pocket Panel has its own explicit future profile but remains a preview-only study; no new starter was invented for it.
- Element ZIPs AND their internal folders are now named additional-element-{id}-{palette}.zip / additional-element-{id}/. Gallery IDs and package-data filenames stay stable. Superseded unprefixed element ZIPs are removed by exact filename after successful builds. Base instructions explicitly recognize these additions, ask intended placement/content, and ask which palette/style to use if package manifests conflict. Component extraction must preserve host markup/state and scope CSS/events/IDs rather than overwrite the whole page.
- Added Project prompt directly underneath Elements. Its page (#project-prompt) contains a short generic prompt and a Copy project prompt button with manual-copy fallback. It directs a fresh chat to open all ZIPs and read BUILD-INSTRUCTIONS.md, completed PROJECT-BRIEF.md and manifests. Filling a brief is optional; answers may be supplied in chat. This is a navigation page, not a template or category; collection counts are unchanged.
- Browser-created downloads update selected appearance consistently in BUILD-INSTRUCTIONS.md, manifests, style-config.js and standalone/native-extension bootstraps. Both custom appearance and static fallback links preserve the element filename convention.
- Verification passed: all 651 static ZIP CRCs/paths/instructions/manifests/source mappings and canonical package-data; all 31 actual download buttons with California Beaches plus custom glass/3px settings; matching documentation/config in the resulting ZIPs; native extension manifests/CSP scripts; 10 extracted standalone/native pages; working extracted gallery lightbox; prompt navigation/reload/copy/fallback; mobile overflow and desktop/mobile screenshots; no browser errors. QA is in staging qa/ only.
- Saved files: app.js, index.html, style.css, zip-download.js, build_downloads.py, new package_instructions.py, this progress file, 31 package-data scripts and 651 archives. Existing GitHub Pages workflow runs the builder (which imports the new helper); no public runtime dependency was added. Catalog, preview designs and prior pending documentation-placement task are unchanged.
- Suggestions discussed for a later batch, not implemented: media editing workbench; storyboard/shot planning board; relationship explorer; guided file-import wizard; game interface shell. These differ structurally from the current collection.

## GALLERY PALETTE AND LOCK — completed and verified (2026-11-20)
- Color palette now changes the gallery shell as well as the selected template: sidebar, title bar, page background, cards, controls, text and borders use the shared palette roles with readable foregrounds.
- Added the checkbox "Don't change this site" immediately to the left of Color palette. Unchecked by default: gallery follows the selected palette. Checking freezes the current gallery colors while template previews and downloads keep following the palette control. Unchecking immediately synchronizes the gallery again.
- The checkbox preference and frozen gallery palette persist across reloads. Mobile places the checkbox above the two dropdowns to keep the controls within the screen.
- Verification: desktop and mobile toggle behavior, ordering, template changes while locked, reload persistence, all 21 palettes' navigation/title/card-text contrast, no horizontal mobile overflow and no browser errors passed. Desktop and mobile screenshots inspected.
- Changed only index.html, app.js, style.css and this progress file; no starter/ZIP rebuild needed. QA helpers and screenshots stay in staging qa/ and are excluded from the public site.

## PENDING — template information placement clarification
- User explicitly rejected the generic "Template details" disclosure above each template's normal content. They want the information integrated into a suitable place in each actual page design, replacing relevant placeholder text where appropriate: Photo Gallery below its title; Panorama hero title/paragraph can become the template information. Each design needs individual inspection and placement.
- This clarification has been acknowledged; placement changes have NOT been made in the gallery palette/checkbox task. The existing disclosure is not an approved final solution.

## THIRD REVIEW — completed, verified and saved (2026-11-20)
- Websites and Web apps merged. Current counts: **35 entries, 31 downloadable starters, 4 studies, 21 palettes, 651 prebuilt palette ZIPs**. Categories: 12 Websites & Web apps, 4 Databases, 4 Chrome extensions, 7 Dashboards, 8 Elements.
- Sliding Tool Hub corrected using the original Organon navigation/timer structure: two independently collapsible rows; category selection replaces the tool row. After idle, row two begins a 550ms fade/collapse at 3.2 seconds; row one follows 1.75 seconds later (transition plus gap). Hover/keyboard interaction resets timing; pinning prevents closure. No combined hide animation.
- Moving Showcase now has a measured moving strip, even over the pointer and with reduced-motion set when running is explicitly selected. Old hover/reduced-motion CSS no longer silently stops it. Explicit pause/resume remains available. Desktop/mobile loops use the correct 8-item cycle width.
- Palettes now have semantic primary, secondary, tertiary and fourth accent roles; buttons, title accents, panel borders, field borders and panel/header tints all respond. California Beaches visibly uses #FFC067 warm yellow/orange; Cyberpunk visibly uses #BF00FF purple, #00F0FF cyan and #2CFF05 green. Foreground colors are computed for readability.
- Separate top-bar Style dropdown: Original, Soft Rounded, Sharp Lines, Glass, Bold Blocks, Orbital and Minimal presets. Independent controls: original/square/rounded/circular shapes, solid/gradient button fills, solid/translucent panels, 1–4px borders, colored emojis/outline symbols/no generated icons. Native logo/artwork graphics are retained.
- Registry Reports added under Dashboards from backroomadmin/public/admin-phase2-geo.js and the supplied screenshot: country/city/classification/origin/status filters, sorting, country edit/add, location edit/add/delete, JSON import/export/reset and filtered CSV export. Sample data only. Imported table text is escaped before display.
- Downloads now preserve selected styles. The site uses a dependency-free client ZIP writer and one local source-data script per downloadable template; this works on file:// as well as HTTP. It changes style-config.js in both standalone and extension folders and updates palette config and instructions. It does not create thousands of style-only archives or gallery entries.
- New files: styles.js, zip-download.js, previews/appearance.js/.css, previews/style-config.js, previews/interaction-fixes.js/.css, previews/registry-reports.js/.css, package-data/*.js (31 source bundles). Build/downloads and GitHub Pages artifact list include them.
- Verification passed: actual row heights and transition duration at timed intervals; actual moving-strip transforms, hover, pause/resume and reduced-motion preference; visible California/Cyberpunk button colors and differing borders; shape/thickness/glass/gradients/icon modes; custom ZIP download; Registry Reports combined filters and CRUD; visual initialization in all 35 entries; representative phone previews and both dropdowns fit.
- All 651 static ZIPs passed integrity/theme/local-asset/CSP checks. All 31 extracted starters and three extension UI files opened independently. File-based custom site and extension ZIPs passed CRC/config checks and rendered their selected styles after extraction.
- Thumbnails were refreshed from the actual updated previews (26 screenshot thumbnails). User selections are applied to the preview; thumbnails remain neutral layout snapshots.
- Completed: saved all revisions to F:\GITHUB\OrganonGallery; 734 copied files were hash-verified. .git and unrelated files were preserved. No publication performed.

## Previous completed batch / source mapping

Updated: 2026-11-20. Current phase: third review complete, checked and saved to F:\GITHUB\OrganonGallery. No publication performed.

## User requirements
- Public gallery web app in F:\GITHUB\OrganonGallery. Blank, unbranded starters with generic logos, lorem ipsum, placeholder imagery, real menus and normal controls.
- Filter by Websites & Web apps (merged), Databases, Chrome extensions, Dashboards and Elements; saved favorites and search/sort.
- Sticky sidebar with white navigation text and darker borders; sticky title bar with current page title, gallery-color lock checkbox, Color palette, Style and Download ZIP. The gallery now follows the selected palette unless locked. No duplicate title, promotional copy, marketing banners or right-hand palette panel.
- Actual iframe previews with desktop/tablet/mobile sizing and fullscreen. Feature information must be integrated into the actual template page's normal content in a suitable location for each design. The existing “Template details” disclosure was rejected; replacement remains pending as described above. Starter downloads currently omit that disclosure.
- A single layout per template; color schemes are options. 21 shared palettes. Cherry Blossom uses Wisteria Bloom colors; Neon Noir merged into Cyberpunk.
- Editorial must be a centered frame with headline and image columns, side arrows, and separate carousels for each menu. Implemented with Pages, About, Services, Contact; each collection remembers its own slide position.
- Blank Page removed from the catalog, as requested. The former Desktop apps category remains replaced by Dashboards.
- Elements are separately reusable pieces for manually combining with starters. No visual page builder was requested or implemented.
- Maintain this single Markdown handoff file so work can resume without chat history.

## Locations and repository
- Final destination: F:\GITHUB\OrganonGallery.
- Remote: https://github.com/cinaedvsstudios/OrganonGallery.git ; branch: main.
- Writable staging: C:\Users\User\OneDrive\Documents\ChatGPT\Organon\OrganonGallery.
- Source projects: F:\GITHUB. Extensions: C:\Users\User\OneDrive\Documents\Extentions.
- QA scripts, extracted starter samples and screenshots: staging qa/ (ignored by Git and excluded from public deployment).
- Preserve .git, .gitattributes and unrelated user edits. Before this batch only our checkpoint PROGRESS.md differed in the repository.

## Current collection
35 entries: 31 ready downloadable starters, 4 clearly marked interactive studies. By category: 12 Websites & Web apps, 4 Databases, 4 Chrome extensions, 7 Dashboards, 8 Elements.

Existing ready starters: Basic Site, rebuilt Editorial Site, Panorama Site, Navigation Panel, Photo Gallery, Tabs & Accordion.

Four original studies remain without downloads: Overview, Workspace, Data Room, Pocket Panel. They are UI studies, not source extractions. Blank Page has been removed.

25 selected source adaptations/reconstructions:

| Source project | Generic gallery name | Category |
| --- | --- | --- |
| backroomadmin | Record Admin | Database UI |
| VENIVIDIVICI | Dome Studio | Website |
| Organon | Sliding Tool Hub | Website |
| cinaedvshub | Task Planner | Website |
| worksuff/Manifest suite | Workflow Popup | Chrome popup |
| Extentions/MAC | Automation Queue | Chrome extension |
| SOPScout Analytics | Usage Analytics | Dashboard |
| Extentions/Organon-Instagram | Social Reports | Dashboard |
| Extentions/Organon-Instagram | Social Composer | Chrome side panel |
| Backroom-site | Events Directory | Website |
| ChristopherTyler | Portfolio Frame | Website |
| cinaedvs | Studio Carousel | Website |
| misschristinadior/misschristinadior | Moving Showcase | Website |
| ForeverBound/ForeverBound | Story Frame | Website |
| forever-bound-wiki | Writing Room | Element |
| forever-bound-wiki | Settings Designer | Element |
| Extentions/specnoto | Context Search | Element |
| backroomadmin | Admin Reports | Dashboard |
| Backroom-site | System Settings | Element |
| Backroom-site | Location Panel | Element |
| chrisfit | History Dashboard | Dashboard |
| Viaticum | Calendar Records | Database UI |
| Viaticum | Trip Itinerary | Database UI |
| actarium | Month Dashboard | Dashboard |

These preserve recognizable layout structures and interface interactions, not the original branded content or production integrations. Layouts were rebuilt with shared semantic color variables and local demo data. Source project/file provenance and adaptation approach are in catalog.js and each adapted starter's SOURCE.txt.

Registry Reports is the additional source adaptation from backroomadmin/public/admin-phase2-geo.js. The full current catalog is in catalog.js.

## Source evidence and limits
- Read local layout/UI source for backroomadmin (public/admin.html, public/admin-reporting.js, public/admin-insights.js), VENIVIDIVICI (index.html, assets/pantheon-header.css), Organon (index.html visibility engine and basin structure), cinaedvshub (index.html), worksuff/Manifest suite (main_hub.js), MAC (panel.html and manifest.json), Organon-Instagram (app.html, ui/app.js and ui/views.js), Backroom-site (index.html), ChristopherTyler (index.html/indexpanel.html), cinaedvs (index.html, assets/css/index.css).
- Added components based on forever-bound-wiki/writing-room-ui.js and editor.html (Writing Room/jumprail and settings), Specnoto/content.js and the Capsanoto Specnoto module, ChrisFit/js/history.js, Viaticum/js/screens/overviewScreen.js and tripScreen.js, Actarium/app.js and shell structure.
- The requested Christina Dior and Forever Bound website sources were read from connected GitHub: misschristinadior/misschristinadior (index.html, assets/js/site.js) and ForeverBound/ForeverBound (index.html, navigation.js). Do not confuse the latter with local Forever-Bound-Game or the Capsanoto wiki.
- SOPScout Analytics source was not found in local or connected code search. Usage Analytics is explicitly a reconstruction from the supplied screenshot, not a direct source extraction. No source is missing for the other requested layout references.
- No source media, user records, credentials, account integrations, live databases or business automation were copied. The originals were not changed.
- Location Panel uses browser geolocation only after the visitor clicks GPS; it handles permission denial. City search uses generic local sample locations and a clearly labeled schematic map, not geocoding/map tiles. No location is sent to a server.
- Queue operations, publishing and chart data are local demonstrations. No real external operations occur. Blank-form/template controls are functional; these starters are foundations for later backend work.

## Architecture and files
- Buildless HTML/CSS/JavaScript; works directly from index.html or any static server. All site paths are relative, supporting /OrganonGallery/ on GitHub Pages.
- index.html: blue navigation, charcoal sticky title bar, palette dropdown and help.
- app.js: routing, category/search/sort, saved favorites, preview sizes, fullscreen and download selection.
- catalog.js: shared metadata/feature list, kinds and source provenance for all 34 entries. Add content here, not in duplicated arrays.
- palettes.js: shared 21 named palettes and semantic color tokens for previews and downloads.
- style.css: gallery styling; review overrides at end.
- previews/demo.html: shared preview host, Basic Site and original studies. Details disclosure renders from the shared catalog in gallery mode only.
- previews/websites.js/.css: Editorial/Panorama; collection.js/.css: first 14 source layouts and shared helpers; extras.js/.css: the 10 later additions.
- thumbnails/: 26 actual preview screenshots for rebuilt Editorial plus 24 source adaptations. Remaining original cards use lightweight HTML miniatures.
- build_downloads.py: reads catalog and palettes, strips unused study dispatch and gallery documentation, writes standalone starter assets and instructions. Python standard library only.
- downloads/: 651 ZIPs = 31 starters × 21 palettes. ZIPs include all palette definitions with selected default, local source files, instructions and a generic starter license. Adapted entries include provenance.
- .github/workflows/pages.yml: builds downloads and publishes only index/style/app/palettes/catalog/favicon plus previews/downloads/thumbnails. PROGRESS.md and QA are excluded.

## Chrome starter packages
Workflow Popup, Automation Queue and Social Composer ZIPs each contain a standalone demo plus an extension/ folder that can be loaded unpacked.
- Manifest V3; no host permissions or original private automation.
- Popup, separate automation window and native Chrome side-panel modes respectively.
- Bootstrap scripts are external files for extension CSP; background scripts only launch the UI or set side-panel click behavior.
- Manifest/schema/asset/CSP checks and independent browser execution of extension/index.html passed. Actual installation into the user's Chrome profile was not performed or tested.

## Palettes
Studio, LCARS, Cyberpunk, Windows Default, Cherry Blossom, Springtime, Ink Wash, Burnt Sienna, Desert Dusk, Zesty Lemon, California Beaches, Sunny Day, Bubblegum Pop, Cool Revival, Neon Jungle, Pop Art, Cobalt Sky, Salt and Pepper, Old Photograph, Cappuccino, Mountain Mist.

Cherry Blossom reference swatches: #D3D3FF, #9400D3, #D8BFD8, #ED80E9. Cyberpunk incorporates Neon Noir black/#2CFF05/#BF00FF/#2D2D2D plus the earlier yellow/pink accents. All supplied hex references remain in palettes.js. Gallery thumbnails show neutral layout previews; the top-bar palette sets the next/current iframe and matching ZIP. File:// changes reload the iframe; HTTP changes use messaging and retain local demo state.

## Verification completed this batch
- qa/collection-check.cjs passed: 34-entry catalog; Blank Page absent; feature text inside all preview webpages and absent outside; downloads for every ready entry; Editorial collections/arrows/dots/keyboard/remembered positions.
- First source batch controls passed: admin search/full-table/row-selection/removal; dome output and canopy navigation; disappearing tool menus/pin/keyboard; calendar month/task creation/completion; queue paste/start/pause/resume/stop; chart types and period summaries; report cards; composer draft/save/load/publish simulation; directory filters/save; portfolio project/index; studio compositions; moving-strip pause; story sections/chapters.
- qa/extras-check.cjs passed: nested ancestor expansion/jumprail/editing; settings search/expand/live color; fuzzy search/locked tabs/source jump/regex escaping; reporting scope/query; settings close/reopen/edit; GPS API with simulated coordinates and permission; city selection; custom history periods; records search/copy/undo/bulk selection; trip selection/duplicate/add day; month tasks/archive.
- All 25 new/rebuilt preview pages checked for desktop and 390px outer/phone iframe widths. Additional 320px audit passed without horizontal page overflow. Tables scroll within their own frames.
- No runtime exceptions in the complete collection/extra browser runs.
- All 630 ZIPs passed integrity, theme configuration and referenced-asset checks; 30 extracted inline bootstraps parsed successfully. Extension manifests/CSP/local assets validated.
- qa/standalone-collection.cjs passed: all 30 extracted starters open independently using the chosen Cherry Blossom default; all three extracted extension/index.html interfaces execute; direct-file gallery and Cyberpunk switching work.
- Actual screenshots captured for all 25 new/rebuilt thumbnails and representative desktop/mobile gallery states; inspected Editorial, Writing Room, Record Admin and Trip Itinerary.
- Fixed broad outside-click handling so only popup menus close; nested disclosure boxes and jumprail expansion remain open.

## Run / rebuild / deployment
Open index.html in a browser. To rebuild: `python build_downloads.py`. No npm installation is needed. Customized styles are stored in style-config.js; use styles.js for presets, appearance.js/.css for shared visual rules and zip-download.js for browser packaging. Generate updated preview thumbnails after structural changes (the current capture logic is in staging qa/collection-check.cjs).

No commit, push or publication was performed by this agent. When the user requests publishing, review/commit/push files to main, configure Pages source = GitHub Actions if necessary, and verify the workflow deployment. Expected public subpath: /OrganonGallery/.

## Next steps
1. Completed: third-review source, assets, thumbnails, package data and downloads copied and hash-verified.
2. Review further user feedback; preserve distinct structures rather than adding palette-only duplicates.
3. Optionally replace the four remaining generic studies with additional verified source starters, or extract more reusable Elements when requested.
4. Publish via the user's GitHub repository when requested. Actual Chrome installation testing can be done separately if needed.

## Resume
Read this file, inspect repository status and catalog.js, and continue the Next steps. All 25 source adaptations are implemented, including the added Registry Reports; do not restart discovery or rebuild the former Basic-like Editorial layout. Keep the single progress file current.
