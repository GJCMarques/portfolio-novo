/**
 * Main — cursor, nav, scroll reveals (IntersectionObserver), smooth scroll.
 * No GSAP, no Three.js. Pure CSS transitions + rAF.
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var isTouch    = window.matchMedia('(pointer: coarse)').matches;
  var isReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── NAV SCROLL STATE ────────────────────────────────── */
  var navEl = document.getElementById('nav');

  if (navEl) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 32) navEl.classList.add('is-scrolled');
      else navEl.classList.remove('is-scrolled');
    }, { passive: true });
  }

  /* ── MOBILE NAV ──────────────────────────────────────── */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── SCROLL REVEALS — IntersectionObserver ───────────── */
  if (!isReduced) {
    var revealSel = [
      '[data-reveal]'
    ].join(', ');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el    = entry.target;
        var delay = parseFloat(el.dataset.delay || 0);

        if (delay) {
          el.style.transitionDelay = delay + 'ms';
        }

        el.classList.add('is-visible');

        /* Clean up delay after transition so it doesn't interfere later */
        el.addEventListener('transitionend', function cleanup() {
          el.style.transitionDelay = '';
          el.removeEventListener('transitionend', cleanup);
        });

        revealObserver.unobserve(el);
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(revealSel).forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    /* Reduced motion — make everything visible immediately */
    document.querySelectorAll(
      '[data-reveal]'
    ).forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── SMOOTH SCROLL ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = navEl ? navEl.offsetHeight : 0;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

}());
