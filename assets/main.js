/* 萃刊 EXTRACT — main.js */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var backdrop = document.querySelector('.nav-backdrop');
  function closeNav() {
    if (!links) return;
    links.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openNav() {
    links.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.contains('open') ? closeNav() : openNav();
    });
    if (backdrop) backdrop.addEventListener('click', closeNav);
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  }

  /* ---------- Sticky nav shrink (show mini wordmark) ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 220) nav.classList.add('shrunk');
      else nav.classList.remove('shrunk');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Back to top ---------- */
  var totop = document.querySelector('.totop');
  if (totop) {
    var toggleTop = function () {
      if (window.scrollY > window.innerHeight) totop.classList.add('show');
      else totop.classList.remove('show');
    };
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });
    totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Accordion ---------- */
  document.querySelectorAll('.acc-head').forEach(function (head) {
    var panel = head.nextElementSibling;
    if (head.getAttribute('aria-expanded') === 'true' && panel) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
    head.addEventListener('click', function () {
      var open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.style.maxHeight = open ? null : panel.scrollHeight + 'px';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.acc-head[aria-expanded="true"]').forEach(function (head) {
      var panel = head.nextElementSibling;
      if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });

  /* ---------- Article filters ---------- */
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    var items = document.querySelectorAll('[data-cat]');
    filterBar.querySelectorAll('.filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBar.querySelectorAll('.filter').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var cat = btn.getAttribute('data-filter');
        items.forEach(function (it) {
          var show = cat === 'all' || it.getAttribute('data-cat') === cat;
          it.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------- Subscribe / contact form ---------- */
  var toast = document.querySelector('.toast');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove('show'); }, 3600);
  }
  document.querySelectorAll('form[data-toast]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast(form.getAttribute('data-toast') || '已收到,感謝你的來信。');
      form.reset();
    });
  });
});
