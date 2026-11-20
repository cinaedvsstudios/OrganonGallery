"""Build standalone website and element ZIPs using the shared palette registry."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json
import re

ROOT = Path(__file__).resolve().parent
source = (ROOT / 'previews' / 'demo.html').read_text(encoding='utf-8')
target = ROOT / 'downloads'
target.mkdir(exist_ok=True)
registry = (ROOT / 'palettes.js').read_text(encoding='utf-8')
palettes = json.loads(registry.split('=', 1)[1].strip().removesuffix(';'))
templates = [('basic-site', 'site'), ('editorial-site', 'editorial'),
             ('panorama-site', 'panorama'), ('navigation-panel', 'navigation'),
             ('photo-gallery', 'gallery'), ('tabs-accordion', 'controls')]
count = 0
for slug, kind in templates:
    for palette in palettes:
        theme = palette['id']
        config = json.dumps({'kind': kind, 'theme': theme})
        html = source.replace('const FIXED_CONFIG = null;', f'const FIXED_CONFIG = {config};')
        start = html.index('const menus=')
        dispatch = re.search(r'\(\{site,editorial,panorama,.*?\}\[kind\]\|\|site\)\(\);', html)
        assert dispatch, 'Preview dispatch not found'
        html = html[:start] + kind + '();\n' + html[dispatch.end():]
        html = html.replace('../palettes.js', './palettes.js')
        asset_group = 'websites' if kind in ['editorial', 'panorama'] else 'elements' if kind in ['navigation', 'gallery', 'controls'] else None
        for group in ['websites', 'elements']:
            if group != asset_group:
                html = html.replace(f'<link rel="stylesheet" href="./{group}.css">', '')
                html = html.replace(f'<script src="./{group}.js"></script>', '')
        with ZipFile(target / f'{slug}-{theme}.zip', 'w', ZIP_DEFLATED) as archive:
            archive.writestr(f'{slug}/index.html', html)
            archive.writestr(f'{slug}/palettes.js', registry)
            if asset_group:
                for suffix in ['css', 'js']:
                    filename = f'{asset_group}.{suffix}'
                    archive.writestr(f'{slug}/{filename}', (ROOT / 'previews' / filename).read_text(encoding='utf-8'))
            archive.writestr(f'{slug}/START-HERE.txt', f'''{slug.upper()}\nSelected palette: {palette['name']}\n\nOpen index.html in your browser. No installation or build is needed.\nKeep all included files together when uploading to a static host.\n\nReplace generic logos, lorem ipsum, and image placeholders with your own content.\nEdit palettes.js and FIXED_CONFIG in index.html to change the default colors.\nAll available color schemes are included.\nContact forms demonstrate validation and local confirmation only; connect your own form service to receive messages.\n\nELEMENTS\nFor elements, copy the component markup from its render function, its matching CSS, and event handlers into your project. The files include a working standalone demo. Navigation Panel renders navigation(); Photo Gallery renders gallery(); Tabs & Accordion renders controls(). Color variables are set by setTheme() from palettes.js.\n\nSystem fonts and local CSS/SVG placeholders. No external dependencies or private credentials.\n''')
            archive.writestr(f'{slug}/LICENSE.txt', 'Generic starter\n\nPermission is granted to use, modify and redistribute this generic starter for personal or commercial projects, without warranty.\n')
        count += 1
print(f'Built {count} ZIPs: {len(templates)} starters x {len(palettes)} color schemes.')
