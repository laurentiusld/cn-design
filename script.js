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
