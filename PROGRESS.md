# OrganonGallery — progress and continuation plan

Updated: 2026-11-20. Current phase: second review and both requested source batches complete, verified and saved to F:\GITHUB\OrganonGallery. No publication performed.

## User requirements
- Public gallery web app in F:\GITHUB\OrganonGallery. Blank, unbranded starters with generic logos, lorem ipsum, placeholder imagery, real menus and normal controls.
- Filter by Websites, Web apps, Databases, Chrome extensions, Dashboards and Elements; saved favorites and search/sort.
- Blue sticky sidebar, white navigation text, darker borders. Sticky charcoal top bar contains the current page title, Color palette dropdown and Download ZIP. No duplicate title, promotional copy, marketing banners or right-hand palette panel.
- Actual iframe previews with desktop/tablet/mobile sizing and fullscreen. Feature information must be ON THE TEMPLATE WEBPAGE: it now appears inside the iframe in an open “Template details” disclosure. It is removed from starter downloads.
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
34 entries: 30 ready downloadable starters, 4 clearly marked interactive studies. By category: 11 Websites, 1 Web app, 4 Databases, 4 Chrome extensions, 6 Dashboards, 8 Elements.

Existing ready starters: Basic Site, rebuilt Editorial Site, Panorama Site, Navigation Panel, Photo Gallery, Tabs & Accordion.

Four original studies remain without downloads: Overview, Workspace, Data Room, Pocket Panel. They are UI studies, not source extractions. Blank Page has been removed.

24 selected source adaptations/reconstructions:

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
- thumbnails/: 25 actual preview screenshots for rebuilt Editorial plus 24 source adaptations. Remaining original cards use lightweight HTML miniatures.
- build_downloads.py: reads catalog and palettes, strips unused study dispatch and gallery documentation, writes standalone starter assets and instructions. Python standard library only.
- downloads/: 630 ZIPs = 30 starters × 21 palettes. ZIPs include all palette definitions with selected default, local source files, instructions and a generic starter license. Adapted entries include provenance.
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
Open index.html in a browser. To rebuild: `python build_downloads.py`. No npm installation is needed. Generate updated preview thumbnails after structural changes (the current capture logic is in staging qa/collection-check.cjs).

No commit, push or publication was performed by this agent. When the user requests publishing, review/commit/push files to main, configure Pages source = GitHub Actions if necessary, and verify the workflow deployment. Expected public subpath: /OrganonGallery/.

## Next steps
1. Completed: final copy to F:\GITHUB\OrganonGallery with all 672 copied files hash-verified; updated-frame preview opened.
2. Review further user feedback; preserve distinct structures rather than adding palette-only duplicates.
3. Optionally replace the four remaining generic studies with additional verified source starters, or extract more reusable Elements when requested.
4. Publish via the user's GitHub repository when requested. Actual Chrome installation testing can be done separately if needed.

## Resume
Read this file, inspect repository status and catalog.js, and continue the Next steps. All 24 requested additions are implemented; do not restart discovery or rebuild the former Basic-like Editorial layout. Keep the single progress file current.
