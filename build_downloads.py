"""Build the Basic Site ZIPs with only the selected default palette changed."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

ROOT = Path(__file__).resolve().parent
source = (ROOT / 'previews' / 'demo.html').read_text(encoding='utf-8')
target = ROOT / 'downloads'
target.mkdir(exist_ok=True)
for theme in ['original', 'lcars', 'cyberpunk', 'windows', 'cherry', 'spring']:
    config = json.dumps({'kind': 'site', 'theme': theme})
    html = source.replace('const FIXED_CONFIG = null;', f'const FIXED_CONFIG = {config};')
    # Strip unused layout-study controls from the starter source.
    start = html.index('const menus=')
    end = html.index('({site,dashboard,board,table,extension,editor}[kind]||site)();')
    html = html[:start] + 'site();\n' + html[end + len('({site,dashboard,board,table,extension,editor}[kind]||site)();'):]
    with ZipFile(target / f'basic-site-{theme}.zip', 'w', ZIP_DEFLATED) as archive:
        archive.writestr('basic-site/index.html', html)
        archive.writestr('basic-site/START-HERE.txt', f'''BASIC SITE\nSelected palette: {theme}\n\nOpen index.html in your browser. No installation or build is needed.\nUpload index.html to any static web host, including GitHub Pages.\n\nReplace the generic logo and lorem ipsum with your own content.\nEdit the palettes object and FIXED_CONFIG in index.html to change the default colors.\nNavigation, dropdowns, hover states, dialogs and form validation work locally.\nThe contact form demonstrates the interaction only; connect it to your own form service to receive messages.\n\nSystem fonts and CSS artwork. No external dependencies or private credentials.\n''')
        archive.writestr('basic-site/LICENSE.txt', 'Basic Site starter\n\nPermission is granted to use, modify and redistribute this generic starter for personal or commercial projects, without warranty.\n')
print('Built 6 Basic Site ZIPs.')
