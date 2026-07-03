document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuIcon && navLinks) {
      menuIcon.addEventListener('click', () => {
          navLinks.classList.toggle('active');
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

    // Check if we are on a products page (todoceram or spania)
    if (!document.getElementById('product-search') && !window.location.pathname.includes('spania.html') && !window.location.pathname.includes('todoceram.html')) return;

    const cards = container.querySelectorAll('.product-card');
    const filterData = {};

    cards.forEach(card => {
        const props = card.querySelectorAll('p');
        props.forEach(p => {
            const strong = p.querySelector('strong');
            if (strong) {
                const key = strong.textContent.replace(':', '').trim();
                let value = p.textContent.replace(strong.textContent, '').trim();
                if (value && value !== 'N/A' && value.toLowerCase() !== 'n/a' && value !== '') {
                    if (!filterData[key]) filterData[key] = new Set();
                    filterData[key].add(value);
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
            
            Array.from(filterData[key]).sort().forEach(val => {
                const option = document.createElement('option');
                option.value = val.toLowerCase();
                option.textContent = val;
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
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        cards.forEach(card => {
            let show = true;
            
            if (searchTerm && !card.innerText.toLowerCase().includes(searchTerm)) {
                show = false;
            }

            if (show) {
                const cardProps = {};
                const props = card.querySelectorAll('p');
                props.forEach(p => {
                    const strong = p.querySelector('strong');
                    if (strong) {
                        const key = strong.textContent.replace(':', '').trim();
                        const value = p.textContent.replace(strong.textContent, '').trim().toLowerCase();
                        cardProps[key] = value;
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
