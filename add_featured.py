import re

# We will extract 3 products by regex from the respective files
def extract_product(file, title):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to match <div class="product-card">...<h3>{title}</h3>...</div>
    # we need to be careful with nested divs, but since the structure is known:
    # <div class="product-card">
    #   ...
    #   <div class="product-info">
    #       ...
    #   </div>
    # </div>
    pattern = r'(<div class="product-card">.*?<h3>' + re.escape(title) + r'</h3>.*?</div>\s*</div>)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

p1 = extract_product('gresie-faianta.html', 'GRESIE SUPER WHITE LUCIOS')
p2 = extract_product('spania.html', 'GRESIE AURA SAND')
# Wait, I'm not 100% sure the todoceram one exists, let's use another one from gresie-faianta or spania if needed.
# Let's extract any 3 cards.
def extract_any_cards(file, num):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = r'<div class="product-card">.*?</div>\s*</div>'
    matches = re.findall(pattern, content, re.DOTALL)
    return matches[:num]

p_todoceram = extract_any_cards('todoceram.html', 1)[0]
p_spania = extract_any_cards('spania.html', 1)[0]
p_marliv = extract_any_cards('gresie-faianta.html', 1)[0]

featured_section = f'''
    <section id="produse-recomandate" style="background-color: var(--bg-color); padding: 4rem 0;">
        <div class="section-container">
            <h2 style="text-align: center; margin-bottom: 3rem;">Produse Recomandate</h2>
            <div class="products-grid">
                {p_marliv}
                {p_spania}
                {p_todoceram}
            </div>
            <div style="text-align: center; margin-top: 3rem;">
                <a href="produse.html" class="btn" style="padding: 1rem 2rem; font-size: 1.1rem;">Vezi toate produsele</a>
            </div>
        </div>
    </section>
'''

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

target = '<section id="despre-noi">'
if target in index_content and 'id="produse-recomandate"' not in index_content:
    new_index = index_content.replace(target, featured_section + '\\n\\n    ' + target)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_index)
    print('Added featured products to index.html')
else:
    print('Failed to add section')

