/* ── Greyveil shared nav & UI — loaded on every page ── */

(function () {

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

})();
