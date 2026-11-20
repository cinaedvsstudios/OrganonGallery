"""Build standalone website and element ZIPs using the shared palette registry."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import re
from package_instructions import instruction_files, package_slug

ROOT = Path(__file__).resolve().parent
source = (ROOT / 'previews' / 'demo.html').read_text(encoding='utf-8')
target = ROOT / 'downloads'
target.mkdir(exist_ok=True)
registry = (ROOT / 'palettes.js').read_text(encoding='utf-8')
palettes = json.loads(registry.split('=', 1)[1].strip().removesuffix(';'))
catalog = json.loads((ROOT / 'catalog.js').read_text(encoding='utf-8').split('=',1)[1].strip().removesuffix(';'))
style_registry = json.loads((ROOT / 'styles.js').read_text(encoding='utf-8').split('=',1)[1].strip().removesuffix(';'))
default_style = style_registry['default']
templates = [(t['id'],t['kind']) for t in catalog if t.get('ready')]
count = 0
package_target = ROOT / 'package-data'
package_target.mkdir(exist_ok=True)
for slug, kind in templates:
    item = next(t for t in catalog if t['id']==slug)
    folder = package_slug(item)
    for palette in palettes:
        theme = palette['id']
        config = json.dumps({'kind': kind, 'theme': theme})
        html = source.replace('const FIXED_CONFIG = null;', f'const FIXED_CONFIG = {config};')
        start = html.index('const menus=')
        dispatch = re.search(r'\(\{site,editorial,panorama,.*?\}\[kind\]\|\|site\)\(\);', html)
        assert dispatch, 'Preview dispatch not found'
        escape_helper = next(line for line in source.splitlines() if line.startswith('function escapeHTML(text)'))
        html = html[:start] + escape_helper + '\n' + kind + '();\n' + html[dispatch.end():]
        html = html.replace('showTemplateDetails();','').replace('<script src="../catalog.js"></script>','')
        html = html.replace('../palettes.js', './palettes.js')
        html = html.replace('../styles.js', './styles.js')
        asset_group = 'websites' if kind in ['editorial', 'panorama'] else 'elements' if kind in ['navigation', 'gallery', 'controls'] else None
        for group in ['websites', 'elements']:
            if group != asset_group:
                html = html.replace(f'<link rel="stylesheet" href="./{group}.css">', '')
                html = html.replace(f'<script src="./{group}.js"></script>', '')
        with ZipFile(target / f'{folder}-{theme}.zip', 'w', ZIP_DEFLATED) as archive:
            archive.writestr(f'{folder}/index.html', html)
            archive.writestr(f'{folder}/palettes.js', registry)
            archive.writestr(f'{folder}/styles.js',(ROOT/'styles.js').read_text(encoding='utf-8'))
            for filename in ['collection.css','collection.js','extras.css','extras.js','appearance.css','appearance.js','style-config.js','interaction-fixes.css','interaction-fixes.js','registry-reports.css','registry-reports.js','additions.css','additions-web.js','additions-tools.js']:
                archive.writestr(f'{folder}/{filename}',(ROOT/'previews'/filename).read_text(encoding='utf-8'))
            if asset_group:
                for suffix in ['css', 'js']:
                    filename = f'{asset_group}.{suffix}'
                    archive.writestr(f'{folder}/{filename}', (ROOT / 'previews' / filename).read_text(encoding='utf-8'))
            archive.writestr(f'{folder}/START-HERE.txt', f'''{item['name']}\n\nREAD FIRST: BUILD-INSTRUCTIONS.md is the project handoff prompt.\nPROJECT-BRIEF.md is optional; answers can also be given directly in chat.\nThe package manifest records this download's role, palette and style.\nPackages named additional-element-* are intended additions to a base template.\n\nSelected palette: {palette['name']}\n\nOpen index.html in your browser. No installation or build is needed.\nKeep all included files together when uploading to a static host.\n\nReplace generic logos, lorem ipsum, and image placeholders with your own content.\nEdit palettes.js and FIXED_CONFIG in index.html to change the default colors.\nAll available color schemes are included.\nContact forms demonstrate validation and local confirmation only; connect your own form service to receive messages.\n\nELEMENTS\nFor elements, copy the component markup from its render function, its matching CSS, and event handlers into your project. The files include a working standalone demo. Each additional element has its own renderer, named in ELEMENT-MANIFEST.json, with matching scoped CSS and handlers. Additions are in additions-web.js or additions-tools.js. Preserve existing host markup and events; color variables are set by setTheme() from palettes.js.\n\nSystem fonts and local CSS/SVG placeholders. No external dependencies or private credentials.\n''')
            archive.writestr(f'{folder}/LICENSE.txt', 'Generic starter\n\nPermission is granted to use, modify and redistribute this generic starter for personal or commercial projects, without warranty.\n')
            for filename, text in instruction_files(item, palette, default_style).items():
                archive.writestr(filename, text)
            if item.get('source'):
                archive.writestr(f'{folder}/SOURCE.txt',json.dumps(item['source'],indent=2))
            if item['category']=='extension':
                # Chrome extensions disallow inline script. Extract the bootstrap into a local file.
                bootstrap = re.search(r'<script>(.*?)</script>',html,re.S).group(1)
                html = re.sub(r'<script>.*?</script>','<script src="./bootstrap.js"></script>',html,flags=re.S)
                archive.writestr(f'{folder}/extension/index.html',html)
                archive.writestr(f'{folder}/extension/bootstrap.js',bootstrap)
                assets=['palettes.js','styles.js','collection.js','collection.css','extras.css','extras.js','appearance.css','appearance.js','style-config.js','interaction-fixes.css','interaction-fixes.js','registry-reports.css','registry-reports.js','additions.css','additions-web.js','additions-tools.js']
                for filename in assets:
                    data=registry if filename=='palettes.js' else (ROOT/'styles.js').read_text(encoding='utf-8') if filename=='styles.js' else (ROOT/'previews'/filename).read_text(encoding='utf-8')
                    archive.writestr(f'{folder}/extension/{filename}',data)
                manifest={'manifest_version':3,'name':item['name']+' Starter','version':'1.0.0','description':'Generic UI starter with local demo data. No site access.'}
                if kind=='socialComposer':
                    manifest.update(permissions=['sidePanel'],side_panel={'default_path':'index.html'},action={},background={'service_worker':'extension-background.js'})
                    background="chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:true});"
                elif kind=='automationQueue':
                    manifest.update(action={},background={'service_worker':'extension-background.js'})
                    background="chrome.action.onClicked.addListener(()=>chrome.windows.create({url:chrome.runtime.getURL('index.html'),type:'popup',width:1100,height:700}));"
                else:
                    manifest.update(action={'default_popup':'index.html','default_title':item['name']})
                    background=None
                archive.writestr(f'{folder}/extension/manifest.json',json.dumps(manifest,indent=2))
                if background:archive.writestr(f'{folder}/extension/extension-background.js',background)
                archive.writestr(f'{folder}/extension/INSTALL.txt','Enable Developer mode in chrome://extensions, choose Load unpacked, and select this extension folder. The package contains UI simulations only; no original automation or accounts are connected.')
        if theme=='original':
            with ZipFile(target/f'{folder}-{theme}.zip') as source_zip:
                files={name:source_zip.read(name).decode('utf-8') for name in source_zip.namelist()}
            (package_target/f'{slug}.js').write_text('window.ORGANON_PACKAGE_DATA('+json.dumps(slug)+','+json.dumps(files,ensure_ascii=False)+');\n',encoding='utf-8')
        count += 1
# Remove only the exact old element archive names superseded by successful builds.
for item in catalog:
    if item.get('ready') and item['category'] == 'elements':
        for palette in palettes:
            old = target / f"{item['id']}-{palette['id']}.zip"
            old.unlink(missing_ok=True)
print(f'Built {count} ZIPs: {len(templates)} starters x {len(palettes)} color schemes.')
