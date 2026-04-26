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
