document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuIcon && navLinks) {
      menuIcon.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });

      // Close mobile menu when a link is clicked
      const links = navLinks.querySelectorAll('a');
      links.forEach(link => {
          link.addEventListener('click', () => {
              navLinks.classList.remove('active');
          });
      });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

    // Initialize automatic product filters if a grid exists
    initializeFilters('.products-grid');
});

function initializeFilters(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (!document.getElementById('product-search') && !window.location.pathname.includes('spania.html') && !window.location.pathname.includes('todoceram.html')) return;

    const cards = container.querySelectorAll('.product-card');
    const filterData = {};

    function normalizeString(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    }

    cards.forEach(card => {
        const props = card.querySelectorAll('p');
        props.forEach(p => {
            const strong = p.querySelector('strong');
            if (strong) {
                const key = strong.textContent.replace(':', '').trim();
                let rawValue = p.textContent.replace(strong.textContent, '').trim();
                if (rawValue && rawValue.toLowerCase() !== 'n/a' && rawValue !== '') {
                    if (!filterData[key]) filterData[key] = new Map();
                    const normalized = normalizeString(rawValue);
                    if (!filterData[key].has(normalized)) {
                        const displayValue = rawValue.charAt(0).toUpperCase() + rawValue.slice(1).toLowerCase();
                        filterData[key].set(normalized, displayValue);
                    }
                }
            }
        });
    });

    const filterWrapper = document.createElement('div');
    filterWrapper.className = 'filters-container';
    filterWrapper.style.display = 'flex';
    filterWrapper.style.gap = '15px';
    filterWrapper.style.flexWrap = 'wrap';
    filterWrapper.style.justifyContent = 'center';
    filterWrapper.style.marginBottom = '2rem';

    const selects = {};

    Object.keys(filterData).forEach(key => {
        if (filterData[key].size > 1) {
            const select = document.createElement('select');
            select.className = 'filter-select';
            select.innerHTML = `<option value="">Orice ${key}</option>`;
            
            Array.from(filterData[key].entries())
                .sort((a, b) => a[1].localeCompare(b[1]))
                .forEach(([normVal, displayVal]) => {
                    const option = document.createElement('option');
                    option.value = normVal;
                    option.textContent = displayVal;
                    select.appendChild(option);
                });

            select.addEventListener('change', () => applyFilters());
            selects[key] = select;
            filterWrapper.appendChild(select);
        }
    });

    if (filterWrapper.children.length > 0) {
        container.parentNode.insertBefore(filterWrapper, container);
    }

    function applyFilters() {
        const activeFilters = {};
        Object.keys(selects).forEach(key => {
            const val = selects[key].value;
            if (val) activeFilters[key] = val;
        });

        const searchInput = document.getElementById('product-search');
        const searchTerm = searchInput ? normalizeString(searchInput.value) : '';

        cards.forEach(card => {
            let show = true;
            
            if (searchTerm && !normalizeString(card.innerText).includes(searchTerm)) {
                show = false;
            }

            if (show) {
                const cardProps = {};
                const props = card.querySelectorAll('p');
                props.forEach(p => {
                    const strong = p.querySelector('strong');
                    if (strong) {
                        const key = strong.textContent.replace(':', '').trim();
                        const rawValue = p.textContent.replace(strong.textContent, '').trim();
                        cardProps[key] = normalizeString(rawValue);
                    }
                });

                Object.keys(activeFilters).forEach(key => {
                    if (cardProps[key] !== activeFilters[key]) {
                        show = false;
                    }
                });
            }

            card.style.display = show ? 'block' : 'none';
        });
    }

    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        newSearchInput.addEventListener('input', applyFilters);
    }
}

  // Reveal elements on scroll
  document.addEventListener('DOMContentLoaded', () => {
      const observerOptions = {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px"
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
      });
  });


// About me toggle
function toggleAboutMe() {
    const content = document.getElementById('aboutMeContent');
    const btn = document.getElementById('readMoreBtn');
    if (!content || !btn) return;
    
    content.classList.toggle('expanded');
    if (content.classList.contains('expanded')) {
        btn.textContent = 'Afișează mai puțin';
    } else {
        btn.textContent = 'Citește mai mult';
    }
}


// Mobile Contact Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    // Create modal HTML and inject into body
    const modalHTML = `
        <div id="mobileContactModal" class="contact-modal">
            <div class="contact-modal-content">
                <span class="close-modal">&times;</span>
                <h3 style="margin-bottom: 15px; font-size: 1.4rem;">Alegeți modalitatea de contact</h3>
                <p style="margin-bottom: 25px; color: #aaa;">Cum preferați să luați legătura cu noi?</p>
                <div class="modal-buttons" style="display: flex; flex-direction: column; gap: 15px;">
                    <a href="tel:0742373923" class="btn call-btn-modal" id="btn-phone" style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <i data-feather="phone"></i> Sună-ne acum
                    </a>
                    <a href="https://wa.me/40742373923" target="_blank" rel="noopener noreferrer" class="btn whatsapp-btn-modal" id="btn-whatsapp" style="display: flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; color: white;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Scrie-ne pe WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    if (typeof feather !== 'undefined') feather.replace();

    const modal = document.getElementById('mobileContactModal');
    const closeBtn = modal.querySelector('.close-modal');

    // Close modal handlers
    closeBtn.onclick = () => modal.classList.remove('show');
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
        }
    };
    
    // Close modal when a button is clicked
    modal.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });

    // Intercept clicks on call buttons
    const callLinks = document.querySelectorAll('a[href^="tel:"]');
    callLinks.forEach(link => {
        // Exclude the button inside the modal itself
        if (link.closest('#mobileContactModal')) return;
        
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                modal.classList.add('show');
            }
        });
    });
});

// ==========================================================================
// Cookie Consent & Preferences Management (GDPR & Google Consent Mode v2)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const CONSENT_STORAGE_KEY = 'cn_cookie_preferences';

    // Cookie Icon SVG
    const cookieSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M7 13v.01"></path><path d="M12 16v.01"></path><path d="M16 12v.01"></path></svg>`;

    // Build Banner & Overlay HTML
    const cookieBannerHTML = `
        <div id="cookieOverlay" class="cookie-banner-overlay"></div>
        <div id="cookieBanner" class="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookieBannerTitle">
            <div class="cookie-banner-header">
                <div class="cookie-icon-wrapper">
                    ${cookieSvg}
                </div>
                <h3 id="cookieBannerTitle">Setări de Confidențialitate & Cookie-uri</h3>
            </div>
            <div class="cookie-banner-text">
                Folosim cookie-uri pentru a vă garanta o experiență excelentă de navigare pe site-ul nostru, pentru funcționalități esențiale și pentru a analiza traficul (prin Google Analytics). Puteți alege să acceptați toate cookie-urile, să le refuzați pe cele opționale sau să vă personalizați opțiunile oricând. Consultați <a href="termeni-si-conditii.html">Termenii și Condițiile</a> și <a href="politica-cookies.html">Politica de Cookie-uri</a>.
            </div>

            <!-- Expandable Detailed Preferences -->
            <div class="cookie-preferences-panel" id="cookiePreferencesPanel">
                <!-- Strict Necessary -->
                <div class="cookie-item">
                    <div class="cookie-item-info">
                        <div class="cookie-item-title">
                            <span>Cookie-uri Strict Necesare</span>
                            <span class="cookie-badge cookie-badge-necessary">Mereu Active</span>
                        </div>
                        <p class="cookie-item-desc">Esențiale pentru buna funcționare tehnică a site-ului, securitate și memorarea consimțământului dumneavoastră. Nu pot fi dezactivate.</p>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" checked disabled>
                        <span class="cookie-slider"></span>
                    </label>
                </div>

                <!-- Analytics -->
                <div class="cookie-item">
                    <div class="cookie-item-info">
                        <div class="cookie-item-title">
                            <span>Statistici și Analiză Trafic</span>
                            <span class="cookie-badge cookie-badge-optional">Opțional</span>
                        </div>
                        <p class="cookie-item-desc">Ne ajută să înțelegem modul în care vizitatorii utilizează site-ul (prin Google Analytics), ajutându-ne să îmbunătățim performanța fără a colecta date personale de identificare directă.</p>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" id="cookieAnalyticsToggle">
                        <span class="cookie-slider"></span>
                    </label>
                </div>

                <!-- Marketing -->
                <div class="cookie-item">
                    <div class="cookie-item-info">
                        <div class="cookie-item-title">
                            <span>Marketing și Publicitate</span>
                            <span class="cookie-badge cookie-badge-optional">Opțional</span>
                        </div>
                        <p class="cookie-item-desc">Utilizate pentru a evalua eficiența campaniilor noastre și comunicarea pe rețele sociale (ex: Facebook, Instagram).</p>
                    </div>
                    <label class="cookie-switch">
                        <input type="checkbox" id="cookieMarketingToggle">
                        <span class="cookie-slider"></span>
                    </label>
                </div>

                <div class="cookie-prefs-actions">
                    <button type="button" class="btn-cookie btn-cookie-deny" id="btnSaveCookiePreferences">Salvează Preferințele</button>
                    <button type="button" class="btn-cookie btn-cookie-accept" id="btnAcceptAllInPrefs">Acceptă Toate</button>
                </div>
            </div>

            <!-- Main Actions -->
            <div class="cookie-banner-actions" id="cookieBannerMainActions">
                <button type="button" class="btn-cookie btn-cookie-accept" id="btnAcceptAllCookies">Acceptă Toate</button>
                <button type="button" class="btn-cookie btn-cookie-deny" id="btnDenyAllCookies">Refuză Toate</button>
                <button type="button" class="btn-cookie btn-cookie-customize" id="btnCustomizeCookies">Personalizează</button>
            </div>
        </div>

        <!-- Floating Button to Re-open Preferences Anytime -->
        <button type="button" class="cookie-floating-trigger" id="cookieFloatingBtn" aria-label="Setări Cookie-uri">
            ${cookieSvg}
            <span class="tooltip">Setări Cookie-uri</span>
        </button>
    `;

    document.body.insertAdjacentHTML('beforeend', cookieBannerHTML);

    const banner = document.getElementById('cookieBanner');
    const overlay = document.getElementById('cookieOverlay');
    const prefsPanel = document.getElementById('cookiePreferencesPanel');
    const analyticsToggle = document.getElementById('cookieAnalyticsToggle');
    const marketingToggle = document.getElementById('cookieMarketingToggle');
    const btnAcceptAll = document.getElementById('btnAcceptAllCookies');
    const btnDenyAll = document.getElementById('btnDenyAllCookies');
    const btnCustomize = document.getElementById('btnCustomizeCookies');
    const btnSavePrefs = document.getElementById('btnSaveCookiePreferences');
    const btnAcceptAllInPrefs = document.getElementById('btnAcceptAllInPrefs');
    const floatingBtn = document.getElementById('cookieFloatingBtn');

    // Helper: update Google Consent Mode v2
    function applyGoogleConsent(analyticsGranted, marketingGranted) {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'analytics_storage': analyticsGranted ? 'granted' : 'denied',
                'ad_storage': marketingGranted ? 'granted' : 'denied',
                'ad_user_data': marketingGranted ? 'granted' : 'denied',
                'ad_personalization': marketingGranted ? 'granted' : 'denied'
            });
        }
    }

    // Read stored preferences
    function getStoredPreferences() {
        try {
            const data = localStorage.getItem(CONSENT_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    // Save preferences
    function savePreferences(analytics, marketing) {
        const prefs = {
            necessary: true,
            analytics: Boolean(analytics),
            marketing: Boolean(marketing),
            timestamp: new Date().toISOString()
        };
        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
        } catch (e) {
            console.warn('Could not save cookie preferences to localStorage', e);
        }
        applyGoogleConsent(prefs.analytics, prefs.marketing);
        hideBanner();
    }

    // Show/Hide Banner
    function showBanner(showPanel = false) {
        const stored = getStoredPreferences();
        if (stored) {
            analyticsToggle.checked = Boolean(stored.analytics);
            marketingToggle.checked = Boolean(stored.marketing);
        } else {
            analyticsToggle.checked = true;
            marketingToggle.checked = false;
        }

        if (showPanel) {
            prefsPanel.classList.add('active');
            btnCustomize.textContent = 'Ascunde opțiuni';
            overlay.classList.add('show');
        } else {
            prefsPanel.classList.remove('active');
            btnCustomize.textContent = 'Personalizează';
            overlay.classList.remove('show');
        }

        banner.classList.add('show');
    }

    function hideBanner() {
        banner.classList.remove('show');
        overlay.classList.remove('show');
        prefsPanel.classList.remove('active');
        btnCustomize.textContent = 'Personalizează';
    }

    // Global method to open preferences
    window.openCookiePreferencesModal = function () {
        showBanner(true);
    };

    // Event Listeners for actions
    btnAcceptAll.addEventListener('click', () => {
        savePreferences(true, true);
    });

    btnAcceptAllInPrefs.addEventListener('click', () => {
        savePreferences(true, true);
    });

    btnDenyAll.addEventListener('click', () => {
        savePreferences(false, false);
    });

    btnCustomize.addEventListener('click', () => {
        const isCurrentlyOpen = prefsPanel.classList.contains('active');
        if (isCurrentlyOpen) {
            prefsPanel.classList.remove('active');
            btnCustomize.textContent = 'Personalizează';
            overlay.classList.remove('show');
        } else {
            prefsPanel.classList.add('active');
            btnCustomize.textContent = 'Ascunde opțiuni';
            overlay.classList.add('show');
        }
    });

    btnSavePrefs.addEventListener('click', () => {
        savePreferences(analyticsToggle.checked, marketingToggle.checked);
    });

    if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            showBanner(true);
        });
    }

    // Listen for footer links or any trigger with class .open-cookie-settings-trigger
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.open-cookie-settings-trigger') || 
                        (e.target.id === 'openCookieSettingsBtn' ? e.target : null);
        if (trigger) {
            e.preventDefault();
            showBanner(true);
        }
    });

    // Close when clicking overlay if preferences already exist
    overlay.addEventListener('click', () => {
        if (getStoredPreferences()) {
            hideBanner();
        }
    });

    // Initialization check
    const currentPrefs = getStoredPreferences();
    if (!currentPrefs) {
        // First visit - display the cookie banner
        setTimeout(() => {
            showBanner(false);
        }, 600);
    } else {
        // Ensure consent is applied in gtag on subsequent page views
        applyGoogleConsent(currentPrefs.analytics, currentPrefs.marketing);
    }
});

