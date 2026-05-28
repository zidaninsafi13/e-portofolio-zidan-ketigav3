// ========================
// E-Portfolio 2 — Script
// Warm Ember Editorial
// ========================

// --- AOS Init ---
if (window.AOS) {
  AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (!prefersReducedMotion && cursorDot && cursorRing) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('button, a, .refleksi-card, .timeline-content, .info-tile').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// --- Navbar Scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// --- Mobile Menu ---
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });
}

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const selector = this.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;
    e.preventDefault();
    // Close mobile menu if open
    if (navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
      }
    }
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - 100,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
});

// --- Back to Top + Progress Ring ---
const backToTopBtn = document.getElementById('backToTop');
const progressCircle = document.querySelector('.progress-ring__circle');
if (backToTopBtn && progressCircle) {
  const radius = progressCircle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  const setProgress = (percent) => {
    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
  };

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('active', window.scrollY > 400);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0);
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

// --- Ambient mouse glow ---
if (!prefersReducedMotion) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(217,119,6,0.06), transparent 70%);
    pointer-events: none; z-index: -1; transform: translate(-50%, -50%);
    transition: left 0.8s ease-out, top 0.8s ease-out;
  `;
  document.body.appendChild(glow);
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
