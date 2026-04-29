/**
 * Main — cursor, nav, scroll reveals (IntersectionObserver), smooth scroll.
 * No GSAP, no Three.js. Pure CSS transitions + rAF.
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var isTouch    = window.matchMedia('(pointer: coarse)').matches;
  var isReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── PRELOADER LOGIC (ELITE MONOLITH) ───────────────── */
  function initLoader() {
    var loader = document.getElementById('loader');
    var percentEl = document.getElementById('loader-percent');
    if (!loader || !percentEl) return;
    
    document.body.classList.add('is-loading');
    
    var duration = 3500; // Exactly 3.5 seconds
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = timestamp - start;
      var percentage = Math.min((progress / duration) * 100, 100);
      
      // Update DOM with zero-padded number
      percentEl.innerText = Math.round(percentage).toString().padStart(3, '0');
      
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        // Final Reveal immediately at 3500ms
        loader.classList.add('is-loaded');
        document.body.classList.remove('is-loading');

        // Activate Hero animations
        var heroCanvas = document.getElementById('hero-canvas');
        if (heroCanvas) heroCanvas.classList.add('active');
        
        var heroProfile = document.querySelector('.hero-profile-card');
        if (heroProfile) heroProfile.classList.add('active');
      }
    }
    
    requestAnimationFrame(step);
  }

  initLoader();

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

  /* ── MAGIC DIAMOND INDICATOR ───────────── */
  var menuNavElem = document.getElementById('nav-menu-nav');
  var indicator = document.getElementById('nav-menu-indicator');
  var menuLinks = document.querySelectorAll('.nav-menu-link');
  var activeLink = document.querySelector('.nav-menu-link.is-active');

  function updateIndicator(target, isReturn) {
    if (!target || !indicator || !menuNavElem) return;
    var targetRect = target.getBoundingClientRect();
    var navRect = menuNavElem.getBoundingClientRect();
    
    var index = Array.from(menuLinks).indexOf(target);
    if(index === -1) index = 0;

    var rotations = [0, 0, 0, 0, 0];
    var borderRadii = ['0%', '50%', '0%', '0%', '0%'];
    var scales = ['scale(1.4)', 'scale(1.4)', 'scale(1.4)', 'scale(1.4)', 'scale(1.2)'];
    var clips = [
      'polygon(50% 0%, 100% 50%, 50% 100%, 50% 100%, 0% 50%)',
      'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
      'polygon(50% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%)',
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)'
    ];

    var offsetTop = targetRect.top - navRect.top + (targetRect.height / 2) - 7;
    
    indicator.style.setProperty('--indicator-y', offsetTop + 'px');
    indicator.style.setProperty('--indicator-rot', rotations[index] + 'deg');
    indicator.style.setProperty('--indicator-br', borderRadii[index]);
    indicator.style.setProperty('--indicator-scale', scales[index]);
    indicator.style.setProperty('--indicator-clip', clips[index]);
    indicator.style.setProperty('--indicator-dur', isReturn ? '950ms' : '550ms');
  }

  if (menuNavElem && indicator && activeLink) {
    updateIndicator(activeLink, false);
    
    if (navToggle) {
      navToggle.addEventListener('click', function() {
        setTimeout(function() { updateIndicator(activeLink, true); }, 50);
      });
    }

    var leaveTimeout;
    var previewItems = document.querySelectorAll('.nav-preview-item');
    var previewContainer = document.getElementById('nav-menu-preview');

    if (previewItems[0]) {
      previewItems[0].classList.add('is-active');
    }

    menuNavElem.addEventListener('mousemove', function(e) {
      clearTimeout(leaveTimeout);
      var mouseY = e.clientY;
      var mouseX = e.clientX;
      
      var firstRect = menuLinks[0].getBoundingClientRect();
      var lastRect = menuLinks[menuLinks.length - 1].getBoundingClientRect();
      
      if (mouseY < firstRect.top - 30 || mouseY > lastRect.bottom + 30) {
        updateIndicator(activeLink, true);
        previewItems.forEach((item, i) => {
          item.classList.toggle('is-active', i === 0);
        });
        return;
      }

      var closestLink = null;
      var minDistance = Infinity;
      var closestIndex = -1;

      menuLinks.forEach(function(link, i) {
        var rect = link.getBoundingClientRect();
        var centerY = rect.top + rect.height / 2;
        var distance = Math.abs(mouseY - centerY);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestLink = link;
          closestIndex = i;
        }
      });

      if (closestLink) {
        updateIndicator(closestLink, false);
        previewItems.forEach((item, i) => {
          item.classList.toggle('is-active', i === closestIndex + 1);
        });
        if (previewContainer) {
          var moveX = (mouseX / window.innerWidth - 0.5) * 30;
          var moveY = (mouseY / window.innerHeight - 0.5) * 30;
          previewContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      }
    });

    menuNavElem.addEventListener('mouseleave', function() {
      leaveTimeout = setTimeout(function() {
        updateIndicator(activeLink, true);
        previewItems.forEach((item, i) => {
          item.classList.toggle('is-active', i === 0);
        });
      }, 300);
    });
  }

  /* ── SCROLL REVEALS — IntersectionObserver ───────────── */
  if (!isReduced) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el    = entry.target;
        var delay = parseFloat(el.dataset.delay || 0);
        if (delay) el.style.transitionDelay = delay + 'ms';
        el.classList.add('is-visible');
        el.addEventListener('transitionend', function cleanup() {
          el.style.transitionDelay = '';
          el.removeEventListener('transitionend', cleanup);
        });
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
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

  /* ── TEXT ROLL INITIALIZATION ────────────────────────── */
  function initTextRoll() {
    var rollElems = document.querySelectorAll('.text-roll');
    rollElems.forEach(function (el) {
      var text = el.textContent.trim();
      el.innerHTML = '';
      text.split('').forEach(function (char, i) {
        var span = document.createElement('span');
        span.className = 'text-roll-letter';
        span.style.setProperty('--index', i);
        var top = document.createElement('span');
        top.className = 'text-roll-top';
        top.innerHTML = char === ' ' ? '&nbsp;' : char;
        var bottom = document.createElement('span');
        bottom.className = 'text-roll-bottom';
        bottom.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.appendChild(top);
        span.appendChild(bottom);
        el.appendChild(span);
      });
    });
  }
  initTextRoll();

  /* ── NATURE HERO SLIDER ──────────────────────────────── */
  function initNatureSlider() {
    var images = document.querySelectorAll('.nature-img');
    if (images.length === 0) return;
    var currentIndex = 0;
    setInterval(function() {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, 5000);
  }
  initNatureSlider();


}());

