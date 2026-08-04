import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

good_block = """    <section id="despre-noi">
        <div class="section-container">
            <h2>Despre Noi</h2>
            <p>La CN Design, ne dedicăm să aducem eleganță și funcționalitate în fiecare spațiu. Oferim soluții complete de la faza de consultanță și proiectare 3D, până la achiziția materialelor necesare. Cu o atenție deosebită la detalii, punem accent pe calitatea superioară a produselor și serviciilor noastre.</p>
            <p style="margin-top: 1rem; color: var(--accent-color);">Magazinul nostru fizic se află în localitatea Tășnad, Str. Lăcrămioarelor 11.</p>

            <h3 style="margin-top: 3rem; margin-bottom: 1.5rem; text-align: left;">Despre mine</h3>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Sunt Natalia Codrean, designer de interior, iar pentru mine designul înseamnă mult mai mult decât alegerea unor finisaje sau a unor piese de mobilier. Înseamnă să creez spații care spun o poveste, reflectă personalitatea celor care le locuiesc și le oferă starea de bine pe care o caută.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">A existat o perioadă în care, deși lucram intens în mai multe domenii, simțeam că îmi lipsește ceva. Atunci am ales să urmez școala de design interior. A fost una dintre cele mai bune decizii pe care le-am luat, pentru că mi-a confirmat ceea ce simțeam de mult timp: creativitatea, frumosul și bunul gust au făcut mereu parte din mine.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Întotdeauna am fost atrasă de locurile bine amenajate și de emoția pe care o poate transmite un spațiu. Pentru mine este important ca fiecare client care intră în contact cu mine să se simtă ascultat, liniștit și încrezător că proiectul său este pe mâini bune.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Fiecare proiect este diferit, la fel cum fiecare om este diferit. Tocmai asta iubesc la această profesie. Am ocazia să cunosc oameni, povești și stiluri de viață diverse, iar fiecare colaborare mă inspiră și mă ajută să mă dezvolt atât profesional, cât și personal. Îmi place să creez spații cu personalitate, adaptate nevoilor și stilului de viață al fiecărui client.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Mi-am dorit mereu un birou cu geamuri mari, luminos și primitor. Când visul a devenit realitate, mi-am dat seama că pot face mai mult. Așa s-a născut showroomul meu – un loc în care clienții pot vedea și atinge materiale, finisaje și produse pentru amenajări interioare și exterioare, transformând procesul de alegere într-o experiență simplă și plăcută.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Un alt aspect important pentru mine este colaborarea cu furnizori de încredere. Aleg cu atenție partenerii și negociez cele mai bune prețuri pentru clienții mei, astfel încât să beneficieze atât de produse de calitate, cât și de soluții avantajoase. În plus, ofer o gamă completă de servicii conexe, ceea ce simplifică întregul proces de amenajare, economisește timp și oferă siguranța că toate etapele sunt bine coordonate.</p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;"><strong style="color: #fff;">Cred că un design reușit nu înseamnă doar un spațiu frumos, ci unul în care te simți cu adevărat acasă.</strong></p>
            <p style="margin-bottom: 1rem; line-height: 1.6; color: #ddd;">Iubesc ceea ce fac și mi-ar plăcea să te cunosc și pe tine. Împreună putem transforma ideile tale într-un spațiu care să te reprezinte și în care să te simți fericit, zi de zi.</p>

            <div style="margin-top: 3rem; text-align: center;">
                <video src="videos/VID-20260702-WA0000.mp4" controls style="max-width: 100%; width: 800px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); margin-bottom: 2rem;"></video>
                <div>
                    <a href="proiectele-noastre.html" class="btn">Mai multe informații</a>
                </div>
            </div>
        </div>
    </section>"""

content = re.sub(r'[ \t]*</div>\n?[ \t]*</div>\n?[ \t]*</div>\n?[ \t]*</section>', good_block, content, flags=re.MULTILINE)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
