// ============ HEADER SCROLL EFFECT ============
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Header background
  if (scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top button
  if (scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

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
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});
