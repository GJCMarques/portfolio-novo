/**
 * Main — cursor, nav, scroll reveals (IntersectionObserver), smooth scroll.
 * No GSAP, no Three.js. Pure CSS transitions + rAF.
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var isTouch    = window.matchMedia('(pointer: coarse)').matches;
  var isReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── CUSTOM CURSOR ───────────────────────────────────── */
  var cursor    = document.getElementById('cursor');
  var cursorDot = document.getElementById('cursor-dot');

  if (!isTouch && cursor && cursorDot) {
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    var dx = cx, dy = cy;

    document.addEventListener('mousemove', function (e) {
      dx = e.clientX; dy = e.clientY;
    }, { passive: true });

    (function cursorLoop() {
      requestAnimationFrame(cursorLoop);
      cx += (dx - cx) * 0.12;
      cy += (dy - cy) * 0.12;
      cursor.style.transform    = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      cursorDot.style.transform = 'translate(' + dx + 'px,' + dy + 'px) translate(-50%,-50%)';
    })();

    var hoverSel = 'a, button, [role="button"], label[for], input, select, textarea';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverSel)) cursor.classList.add('cursor--hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverSel)) cursor.classList.remove('cursor--hover');
    });
    document.addEventListener('mousedown', function () { cursor.classList.add('cursor--active'); });
    document.addEventListener('mouseup',   function () { cursor.classList.remove('cursor--active'); });

    document.addEventListener('mouseleave', function () {
      cursor.style.opacity = '0'; cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      cursor.style.opacity = '1'; cursorDot.style.opacity = '1';
    });

    /* Switch cursor style when leaving dark hero into light sections */
    var heroEl = document.getElementById('hero');
    if (heroEl) {
      var heroObserver = new IntersectionObserver(function (entries) {
        var inHero = entries[0].isIntersecting;
        cursor.classList.toggle('cursor--light', !inHero);
        cursorDot.classList.toggle('cursor-dot--light', !inHero);
      }, { threshold: 0.1 });
      heroObserver.observe(heroEl);
    }
  }

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
      '[data-reveal]',
      '.project-card',
      '.skill-cat',
      '.about-visual',
      '.contact-inner',
      '.projects-more'
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
      '[data-reveal], .project-card, .skill-cat, .about-visual, .contact-inner, .projects-more'
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
