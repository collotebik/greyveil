/* ── Greyveil shared nav & UI — loaded on every page ── */

(function () {

  // ── PAGE TRANSITIONS ──
  // Fade out before navigating away
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    // Only internal non-anchor, non-external links
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        link.target === '_blank') return;
    e.preventDefault();
    document.body.style.transition = 'opacity 0.25s ease';
    document.body.style.opacity    = '0';
    setTimeout(() => { window.location.href = href; }, 260);
  });

  // ── ACTIVE NAV STATE ──
  // Match current path to nav links and mark active
  (function () {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a[href]').forEach(a => {
      const href = a.getAttribute('href').replace(/\/$/, '') || '/';
      // exact match, or path starts with href (for sub-pages)
      if (href !== '#' && (path === href || (href !== '/' && path.startsWith(href)))) {
        a.classList.add('nav-active');
        // if inside dropdown, also mark the toggle
        const dropdown = a.closest('.nav-dropdown');
        if (dropdown) dropdown.querySelector('.dropdown-toggle')?.classList.add('nav-active');
      }
    });
  })();

  // ── MOBILE HAMBURGER ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    const navEl = hamburger.closest('nav');
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      navEl.classList.toggle('nav-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        navEl.classList.remove('nav-open');
      });
    });
  }

  // ── KNOWLEDGE DROPDOWN ──
  document.querySelectorAll('.nav-dropdown').forEach(drop => {
    const toggle = drop.querySelector('.dropdown-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== drop) d.classList.remove('open');
      });
      drop.classList.toggle('open');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    }
  });

  // ── COOKIE BAR ──
  const cookieBar = document.getElementById('cookie-bar');
  const cookieBtn = document.getElementById('cookie-accept');
  if (cookieBar && !localStorage.getItem('gv_cookie_ok')) {
    setTimeout(() => cookieBar.classList.add('show'), 1200);
  }
  if (cookieBtn) {
    cookieBtn.addEventListener('click', () => {
      cookieBar.classList.remove('show');
      localStorage.setItem('gv_cookie_ok', '1');
    });
  }

  // ── BACK TO TOP ──
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // ── DARK / LIGHT TOGGLE ──
  (function () {
    const root = document.documentElement;
    const btn  = document.getElementById('theme-toggle');
    const DARK_ICON  = '☀';
    const LIGHT_ICON = '☽';
    let isDark = localStorage.getItem('gv_theme') !== 'light';
    function apply(dark) {
      isDark = dark;
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      if (btn) btn.innerHTML = dark ? DARK_ICON : LIGHT_ICON;
      localStorage.setItem('gv_theme', dark ? 'dark' : 'light');
    }
    apply(isDark);
    if (btn) btn.addEventListener('click', () => apply(!isDark));
  })();

  // ── NAV SCROLL STATE ──
  (function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ── SCROLL REVEAL ──
  (function () {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  })();


})();
