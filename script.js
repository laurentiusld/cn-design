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


