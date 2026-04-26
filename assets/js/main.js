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

  /* ── NAV MENU ────────────────────────────────────────── */
  var navToggle  = document.getElementById('nav-toggle');
  var navMenu    = document.getElementById('nav-menu');
  var navOverlay = document.getElementById('nav-overlay');
  var curvePath  = navMenu ? navMenu.querySelector('.nav-menu-curve-path') : null;

  /* Wider curve — control point at -180 for dramatic bow */
  if (curvePath) curvePath.setAttribute('d', 'M100 0 L200 0 L200 1000 L100 1000 Q-180 500 100 0');

  /* Split menu text into letter spans for stagger hover */
  if (navMenu) {
    navMenu.querySelectorAll('.nav-menu-text').forEach(function (el) {
      var text = el.textContent.trim();
      el.innerHTML = text.split('').map(function (ch, i) {
        return '<span class="nav-menu-letter" style="--i:' + i + '">' +
               (ch === ' ' ? '&nbsp;' : ch) + '</span>';
      }).join('');
    });
  }

  /* Curve morph via rAF */
  var curveRaf = null;
  var curveX   = -180;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateCurve(target) {
    if (curveRaf) cancelAnimationFrame(curveRaf);
    var start = performance.now();
    var from  = curveX;
    (function step(now) {
      var t  = Math.min((now - start) / 800, 1);
      curveX = from + (target - from) * easeInOutCubic(t);
      if (curvePath) {
        curvePath.setAttribute('d',
          'M100 0 L200 0 L200 1000 L100 1000 Q' + curveX.toFixed(2) + ' 500 100 0'
        );
      }
      if (t < 1) curveRaf = requestAnimationFrame(step);
      else curveX = target;
    }(performance.now()));
  }

  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add('is-open');
    navMenu.setAttribute('aria-hidden', 'false');
    if (navOverlay) navOverlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    animateCurve(100);
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('is-open');
    navMenu.setAttribute('aria-hidden', 'true');
    if (navOverlay) navOverlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    animateCurve(-180);
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    navMenu.querySelectorAll('.nav-menu-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) closeMenu();
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

  /* ── SCRAMBLE TEXT EFFECT (SpecialText) ─────────────── */
  var RANDOM_CHARS = "_!X$0-+*#";

  function getRandomChar(prevChar) {
    var char;
    do {
      char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
    } while (char === prevChar);
    return char;
  }

  var Scrambler = function(el) {
    this.el = el;
    this.text = el.dataset.scramble || el.innerText;
    this.interval = null;
  };

  Scrambler.prototype.start = function() {
    if (this.interval) clearInterval(this.interval);
    var self = this;
    var step = 0;
    var maxStepsPhase1 = this.text.length * 2;
    var speed = 25;
    var phase = 'phase1';
    
    this.interval = setInterval(function() {
      var chars = [];
      
      if (phase === 'phase1') {
        var currentLength = Math.min(step + 1, self.text.length);
        for (var i = 0; i < currentLength; i++) {
          chars.push(getRandomChar(i > 0 ? chars[i-1] : null));
        }
        for (var j = currentLength; j < self.text.length; j++) {
          chars.push('\u00A0');
        }
        
        if (step < maxStepsPhase1 - 1) {
          step++;
        } else {
          phase = 'phase2';
          step = 0;
        }
      } else {
        var revealedCount = Math.floor(step / 2);
        for (var k = 0; k < revealedCount && k < self.text.length; k++) {
          chars.push(self.text[k]);
        }
        
        if (revealedCount < self.text.length) {
          if (step % 2 === 0) {
            chars.push("_");
          } else {
            chars.push(getRandomChar());
          }
        }
        
        for (var l = chars.length; l < self.text.length; l++) {
          chars.push(getRandomChar());
        }
        
        if (step < self.text.length * 2 - 1) {
          step++;
        } else {
          clearInterval(self.interval);
          self.interval = null;
          chars = self.text.split('');
        }
      }
      
      self.el.innerText = chars.join('');
    }, speed);
  };

  document.querySelectorAll('[data-scramble]').forEach(function(el) {
    var scrambler = new Scrambler(el);
    var btn = el.closest('.btn');
    if (btn) {
      btn.addEventListener('mouseenter', function() { scrambler.start(); });
    } else {
      el.addEventListener('mouseenter', function() { scrambler.start(); });
    }
  });

}());
