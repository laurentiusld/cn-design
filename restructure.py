import re

with open('proiectele-noastre.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I will extract the about-me-card div
about_me_match = re.search(r'<div class="about-me-card">.*?</div>\n                <button[^>]+>Citește mai mult</button>\n            </div>', html, re.DOTALL)
if not about_me_match:
    print("Could not find about-me-card")
    exit(1)

about_me_block = about_me_match.group(0)

# Remove about-me-card from its current position
html = html.replace(about_me_block, '')

# Now replace the <section style="padding-top: 150px;"> with the about me section, followed by the projects section
old_section_start = '''    <section style="padding-top: 150px;">
        <div class="section-container">
            <h1 style="text-align: center;">Proiectele Noastre</h1>'''

new_structure = f'''    <section id="despre-mine" style="padding-top: 150px; padding-bottom: 4rem;">
        <div class="section-container">
            <h1 style="text-align: center; margin-bottom: 2rem;">Despre Mine</h1>
            {about_me_block}
        </div>
    </section>

    <section id="proiecte" style="padding-top: 4rem; background-color: var(--bg-color);">
        <div class="section-container">
            <h2 style="text-align: center;">Proiectele Noastre</h2>
            <p style="text-align: center; color: #aaa; margin-bottom: 4rem;">Vedeți mai jos câteva dintre amenajările noastre.</p>'''

html = html.replace(old_section_start, new_structure)

with open('proiectele-noastre.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Restructured page successfully!")
