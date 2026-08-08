import glob
import re

nav_dropdown = '''<li class="dropdown">
                <a href="produse.html">Produse</a>
                <div class="dropdown-content">
                    <a href="gresie-faianta.html">Catalog MarLiv</a>
                    <a href="todoceram.html">Catalog Todoceram</a>
                    <a href="spania.html">Colecție Spania</a>
                </div>
            </li>'''

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # regex to find the produse li tag, ignoring whitespace
    # <li>\s*<a href="produse.html">Produse</a>\s*</li>
    pattern = r'<li>\s*<a href="produse\.html">Produse</a>\s*</li>'
    
    if re.search(pattern, content):
        content = re.sub(pattern, nav_dropdown, content)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated nav in {f}')
