// Gestion du menu mobile
const initMobileMenu = () => {
  const menuButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuButton || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);

    // Gestion de l'affichage du menu mobile
    if (isExpanded) {
      // Fermer le menu
      mobileMenu.style.maxHeight = '0';
      mobileMenu.style.opacity = '0';
    } else {
      // Ouvrir le menu
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      mobileMenu.style.opacity = '1';
    }
  };

  menuButton.addEventListener('click', toggleMenu);

  // Fermeture du menu au clic sur les liens
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Gestion du redimensionnement
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      // Réinitialiser le menu mobile lors du redimensionnement
      mobileMenu.style.maxHeight = '';
      mobileMenu.style.opacity = '';
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
};

// Header sticky
const initStickyHeader = () => {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = 0;
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll;
    
    header.classList.toggle('bg-gray-900/90', currentScroll > 50);
    header.classList.toggle('backdrop-blur-sm', currentScroll > 50);
    header.classList.toggle('shadow-xl', currentScroll > 50);
    header.classList.toggle('-translate-y-full', scrollDirection && currentScroll > 100);

    lastScroll = currentScroll;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Smooth scroll
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (!target) return;

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const offset = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });
};

// Initialisation Typed.js
const initTyped = () => {
  if (typeof Typed === 'undefined' || !document.querySelector('#typed-text')) return;
  
  new Typed('#typed-text', {
    strings: ["Pentesting", "Forensique", "SOC Analysis", "Sécurité Cloud"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });
};

const initSwiper = () => {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.testimonialSwiper', {
    // Configuration de base
    direction: 'vertical',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    autoHeight: true,

    // Navigation verticale
    navigation: {
      nextEl: '.swiper-button-next-vertical',
      prevEl: '.swiper-button-prev-vertical',
    },

    // Autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    // Accessibilité
    a11y: {
      prevSlideMessage: 'Témoignage précédent',
      nextSlideMessage: 'Témoignage suivant',
      paginationBulletMessage: 'Aller au témoignage {{index}}',
      containerMessage: 'Carrousel de témoignages clients'
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: (index, className) => {
        return `<span class="${className}" role="button" aria-label="Témoignage ${index + 1}"></span>`;
      }
    },

    // Configuration responsive
    breakpoints: {
      640: {
        slidesPerView: 1,
        direction: 'vertical'
      },
      1024: {
        slidesPerView: 1,
        direction: 'vertical'
      }
    },

    // Options supplémentaires
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    grabCursor: true,
    preloadImages: false,
    lazy: true,

    // Callbacks
    on: {
      init() {
        this.el.classList.remove('invisible');
        this.update(); // Mise à jour nécessaire pour le mode vertical
      },
      resize() {
        this.update(); // Recalcul des dimensions au redimensionnement
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('performanceChart');
  let chart;

  // Configuration des données
  const data = {
    labels: ['Audits sécurité', 'Pentesting', 'Réponse incidents', 'Formations', 'Satisfaction client'],
    datasets: [{
      label: 'Performances',
      data: [92, 88, 95, 85, 97],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(79, 70, 229, 0.8)',
        'rgba(129, 140, 248, 0.8)',
        'rgba(165, 180, 252, 0.8)',
        'rgba(199, 210, 254, 0.8)'
      ],
      borderColor: [
        'rgba(99, 102, 241, 1)',
        'rgba(79, 70, 229, 1)',
        'rgba(129, 140, 248, 1)',
        'rgba(165, 180, 252, 1)',
        'rgba(199, 210, 254, 1)'
      ],
      borderWidth: 2,
      borderRadius: 8,
      hoverOffset: 20
    }]
  };

  // Configuration du chart
  const config = {
    type: 'radar',
    data: data,
    options: {
      responsive: true,
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: '#CBD5E1'
          },
          ticks: {
            display: false,
            beginAtZero: true
          }
        }
      }
    }
  };

  // Initialisation avec effet de fondu
  setTimeout(() => {
    chart = new Chart(ctx, config);
  }, 500);

  // Re-init on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if(chart) chart.destroy();
      chart = new Chart(ctx, config);
    }, 200);
  });
});

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initSmoothScroll();
  initTyped();
  initSwiper();
});