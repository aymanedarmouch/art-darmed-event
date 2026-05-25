/* =============================================
   DAR MED ART EVENT — Premium Interactions
   Scroll Reveals + GSAP Hero Animations
   ============================================= */

// ====== Loader ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initPage();
    }, 900);
  } else {
    initPage();
  }
});
if (document.getElementById('loader')) {
  document.body.style.overflow = 'hidden';
}

// ====== Navigation ======
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

function highlightNav() {
  const scrollY = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav);

// ====== Scroll Reveal via IntersectionObserver ======
// All elements with data-reveal will fade in when they enter the viewport
function setupReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay * 1000);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => observer.observe(el));
}

// ====== Init page ======
function initPage() {
  // Setup CSS-based reveals
  setupReveals();

  // GSAP-specific animations (only hero + parallax)
  if (typeof gsap !== 'undefined') {
    initGSAP();
  }
}

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  const heroTitle = document.getElementById('heroTitle');
  const heroBg = document.getElementById('heroBg');

  // Hero entrance
  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(heroTitle, { y: 80, opacity: 0, duration: 1.2 })
      .from('#heroLabel', { y: 30, opacity: 0, duration: 0.8 }, '-=0.9')
      .from('#heroText', { y: 40, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-stat', { y: 40, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.3')
      .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  // Parallax hero
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }

  // Counter animation
  document.querySelectorAll('.hero-stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    gsap.to(el, {
      textContent: target,
      duration: 2.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(parseFloat(el.textContent)).toLocaleString() + '+';
      }
    });
  });

  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
    });
  });

  // Experience card tilt
  document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6, rotateX: -y * 6,
        duration: 0.3, ease: 'power2.out',
        transformPerspective: 800,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });

  // Room card tilt
  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6, rotateX: -y * 6,
        duration: 0.3, ease: 'power2.out',
        transformPerspective: 800,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });

  // ====== Anti-Gravity Parallax Effect ======
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed) || 0.1;
    gsap.to(el, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed * 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

// ====== Smooth Scroll ======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
