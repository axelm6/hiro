/* Hiro landing - theme toggle (persisted), mobile nav, scroll reveal.
   Theme is applied pre-paint by an inline snippet in <head> to avoid flash;
   this file wires the toggle button and the rest. */
(function () {
  var root = document.documentElement;

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('hiro-theme', t); } catch (e) {}
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('.theme-toggle');
    if (t) {
      var cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
      return;
    }
    var burger = e.target.closest('.nav__burger');
    if (burger) {
      var menu = document.querySelector('.nav__mobile');
      if (menu) {
        var open = menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    }
  });

  // sync aria-label on load
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  // scroll reveal
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && els.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }
})();
