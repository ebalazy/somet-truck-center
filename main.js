// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');

function updateScrollState() {
  const scrollY = window.scrollY;

  // Header background
  if (scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top button
  if (scrollY > 3200) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateScrollState);
window.addEventListener('load', updateScrollState);
updateScrollState();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ MOBILE NAV ============
const mobileToggle = document.getElementById('mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

mobileToggle.addEventListener('click', () => {
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener('click', closeMobileNav);

function closeMobileNav() {
  mobileNav.classList.remove('active');
  document.body.style.overflow = '';
}

function scrollToHashTarget() {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  const offset = 80;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'auto' });
}

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ============ SMOOTH SCROLL FOR NAV LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============ ACTIVE NAV LINK ============
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const marker = (header?.offsetHeight || 80) + 96;
  let activeLink = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link && rect.top <= marker && rect.bottom > marker) {
      activeLink = link;
    }
  });

  if (activeLink) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    activeLink.classList.add('active');
  }
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);
window.addEventListener('hashchange', () => {
  [0, 120, 420].forEach(delay => {
    window.setTimeout(() => {
      scrollToHashTarget();
      updateScrollState();
      updateActiveNav();
    }, delay);
  });
});
window.addEventListener('load', () => {
  [0, 120, 420, 900].forEach(delay => {
    window.setTimeout(() => {
      scrollToHashTarget();
      updateScrollState();
      updateActiveNav();
    }, delay);
  });
});
updateActiveNav();
