/**
 * Hero V-bars — pure rAF + Math.sin, no third-party libs.
 *
 * Reference gradient adapted to design-system palette:
 *   original : #020617 → #1e3a8a → #ffffff → #3b82f6 → transparent
 *   adapted  : #030303 → #5c1a07 → #fff7ed → #ea580c → transparent
 *
 * Heights follow a V curve (shorter at center, taller at edges)
 * driven by two layered sine waves. Mouse nudges the closest bars slowly.
 */
(function () {
  'use strict';

  var container = document.getElementById('hero-bars');
  if (!container) return;

  /* ── CONFIG ─────────────────────────────────────────── */
  var N            = 28;     /* bar count                   */
  var BASE_MIN     = 0.30;   /* scaleY at center            */
  var BASE_MAX     = 0.88;   /* scaleY at edges             */
  var W1_AMP       = 0.09;   /* slow breathing              */
  var W1_SPEED     = 5e-4;
  var W1_PHASE     = 0.30;
  var W2_AMP       = 0.04;   /* fast shimmer                */
  var W2_SPEED     = 1.1e-3;
  var W2_PHASE     = 0.52;
  var M_RADIUS     = 0.20;   /* mouse influence radius      */
  var M_BOOST      = 0.12;
  var M_LERP       = 0.02;   /* low = slow + weighted feel  */

  /* Light-mode gradient: transparent base → ember glow → crimson fade → out */
  var GRADIENT = [
    'transparent 0%',
    'rgba(234,88,12,0.08) 15%',
    'rgba(234,88,12,0.55) 38%',
    'rgba(225,29,72,0.30) 62%',
    'transparent 94%'
  ].join(', ');

  /* ── BUILD BARS ──────────────────────────────────────── */
  var bars = [];

  for (var i = 0; i < N; i++) {
    var el = document.createElement('div');
    el.className = 'hero-bar';
    el.style.background = 'linear-gradient(to top, ' + GRADIENT + ')';
    container.appendChild(el);
    bars.push(el);
  }

  var half = (N - 1) / 2;

  /* ── MOUSE ───────────────────────────────────────────── */
  var mTarget = 0.5, mSmooth = 0.5;

  window.addEventListener('mousemove', function (e) {
    mTarget = e.clientX / window.innerWidth;
  }, { passive: true });

  /* ── LOOP ────────────────────────────────────────────── */
  function tick(ts) {
    requestAnimationFrame(tick);

    mSmooth += (mTarget - mSmooth) * M_LERP;

    for (var j = 0; j < N; j++) {
      var norm  = j / (N - 1);
      var dist  = Math.abs(j - half) / half;  /* 0 center → 1 edges */

      /* V-shape */
      var base  = BASE_MIN + dist * (BASE_MAX - BASE_MIN);

      /* Waves */
      var w1    = Math.sin(ts * W1_SPEED + j * W1_PHASE) * W1_AMP;
      var w2    = Math.sin(ts * W2_SPEED + j * W2_PHASE) * W2_AMP;

      /* Mouse boost — smooth bell curve falloff */
      var md    = Math.abs(norm - mSmooth);
      var boost = md < M_RADIUS
        ? Math.pow((M_RADIUS - md) / M_RADIUS, 2) * M_BOOST
        : 0;

      var scale = base + w1 + w2 + boost;
      scale = scale < 0.08 ? 0.08 : scale > 0.97 ? 0.97 : scale;

      /* Opacity — edges more vivid, center ghostly */
      var op = 0.35 + dist * 0.50 + Math.sin(ts * 7e-4 + j * 0.38) * 0.07;
      op = op < 0.15 ? 0.15 : op > 0.95 ? 0.95 : op;

      bars[j].style.transform = 'scaleY(' + scale.toFixed(4) + ')';
      bars[j].style.opacity   = op.toFixed(4);
    }
  }

  requestAnimationFrame(tick);

}());
