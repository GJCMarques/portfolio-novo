/**
 * CINEMATIC PRELOADER ORCHESTRATION
 * Sequence timing:
 *  0.0s  — SVG stroke draws
 *  1.5s  — SVG fill springs in
 *  2.1s  — Photo grid reveals staggered
 *  3.3s  — Name + meta rise up
 *  5.2s  — EXIT sequence starts
 */
(function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const logoStroke = document.getElementById('plLogoStroke');
    const logoFill   = document.getElementById('plLogoFill');
    const plImgs     = document.getElementById('plImgs');
    const plName     = preloader.querySelector('.preloader__name');
    const plMeta     = preloader.querySelector('.preloader__meta');

    // ── Phase 1: Draw SVG stroke ─────────────────────────
    setTimeout(() => {
        if (logoStroke) logoStroke.classList.add('draw');
    }, 80);

    // ── Phase 2: Fill logo (spring in) ───────────────────
    setTimeout(() => {
        if (logoFill) logoFill.classList.add('reveal');
    }, 1500);

    // ── Phase 3: Reveal photos ────────────────────────────
    setTimeout(() => {
        if (plImgs) plImgs.classList.add('revealed');
    }, 2100);

    // ── Phase 4: Rise name + meta ─────────────────────────
    setTimeout(() => {
        if (plName) plName.classList.add('show');
        if (plMeta) plMeta.classList.add('show');
    }, 3300);

    // ── Phase 5: EXIT ─────────────────────────────────────
    setTimeout(() => {
        const ease = 'cubic-bezier(0.76, 0, 0.24, 1)';

        // 5a. Logo fades out
        const logoWrap = preloader.querySelector('.preloader__logo-wrap');
        if (logoWrap) {
            logoWrap.style.transition = `opacity 0.5s ease, transform 0.7s ${ease}`;
            logoWrap.style.opacity    = '0';
            logoWrap.style.transform  = 'scale(0.88)';
        }

        // 5b. Text fades + drops
        if (plName) {
            plName.style.transition = `opacity 0.45s ease, transform 0.6s ${ease}`;
            plName.style.opacity    = '0';
            plName.style.transform  = 'translateY(30px)';
        }
        if (plMeta) {
            plMeta.style.transition = `opacity 0.35s ease 0.05s, transform 0.5s ${ease} 0.05s`;
            plMeta.style.opacity    = '0';
            plMeta.style.transform  = 'translateY(20px)';
        }

        // 5c. Photos collapse + scale — column by column
        const imgs   = plImgs ? Array.from(plImgs.querySelectorAll('.preloader__img')) : [];
        const waves  = [[0], [2], [1, 3]]; 
        waves.forEach((group, wi) => {
            group.forEach(idx => {
                if (!imgs[idx]) return;
                setTimeout(() => {
                    imgs[idx].style.transition = `clip-path 0.9s ${ease}, transform 1.1s ${ease}, filter 0.8s ease`;
                    imgs[idx].style.clipPath   = 'inset(100% 0 0 0)'; // collapse down
                    imgs[idx].style.transform  = 'scale(0.92) translateY(20px)';
                    imgs[idx].style.filter     = 'blur(10px)';
                }, wi * 150);
            });
        });

        // 5d. Linen curtain sweeps in — delayed to let images start their exit
        const curtain = document.createElement('div');
        Object.assign(curtain.style, {
            position:   'fixed', inset: '0', zIndex: '10000',
            background: '#f5f0e8',
            transform:  'translateX(-100%)',
            transition: `transform 1.1s cubic-bezier(0.85, 0, 0.15, 1)`,
        });
        document.body.appendChild(curtain);

        setTimeout(() => {
            curtain.style.transform = 'translateX(0)';
        }, 800); 

        // 5e. Once curtain is fully in, remove preloader + slide curtain out
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('is-awaiting-audio');
            curtain.style.transition = `transform 0.9s cubic-bezier(0.85, 0, 0.15, 1)`;
            curtain.style.transform  = 'translateX(100%)';
        }, 1900);

        // 5f. Remove curtain from DOM
        setTimeout(() => {
            curtain.remove();
        }, 3000);

    }, 5200);
})();
