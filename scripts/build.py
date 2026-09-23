"""Prepara esclusivamente gli asset pubblici per GitHub Pages."""
import hashlib
from pathlib import Path
import re
import shutil
ROOT = Path(__file__).resolve().parent.parent
FILES = ['index.html', 'styles.css', 'app.js', 'core.js', 'foods.js',
         'plan-foods.js', 'manifest.webmanifest', 'icons/icon.svg',
         'icons/icon-192.png', 'icons/icon-512.png', 'sw.js']

def prepare(target):
    contents = {name: (ROOT / name).read_bytes() for name in FILES}
    digest = hashlib.sha256()
    for name, data in contents.items():
        digest.update(name.encode() + b'\0' + data)
    release = digest.hexdigest()[:20]
    sw = contents['sw.js'].decode()
    sw, count = re.subn(r"const CACHE='[^']+';", f"const CACHE='viva-shell-{release}';", sw, count=1)
    if count != 1:
        raise RuntimeError('Versione cache non riconosciuta: pubblicazione interrotta.')
    contents['sw.js'] = sw.encode()
    for name, data in contents.items():
        path = target / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    return release


if __name__ == '__main__':
    target = ROOT / 'dist'
    if target.exists():
        shutil.rmtree(target)
    target.mkdir()
    release = prepare(target)
    (target / '.nojekyll').touch()
    print(f'{len(FILES)} asset pronti per GitHub Pages; cache {release}.')
