/**
 * MENU MODULE
 * Handles navigation overlay, clock, language selector, and image previews.
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.getElementById('menuTrigger');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuText = document.getElementById('menuTextInner');
    const menuPreviewImg = document.getElementById('menuPreviewImg');
    const navLinks = document.querySelectorAll('.nav-link');
    const defaultImg = 'assets/img/menu_preview_portfolio.png';

    // ── Relógio (Porto) ──────────────────────────────────────
    function updateClock() {
        const clockEl = document.getElementById('menuClock');
        const dateEl = document.getElementById('menuDate');
        if (clockEl || dateEl) {
            const now = new Date();
            if (clockEl) {
                const opts = { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                clockEl.textContent = new Intl.DateTimeFormat('pt-PT', opts).format(now);
            }
            if (dateEl) {
                const dOpts = { timeZone: 'Europe/Lisbon', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                dateEl.textContent = new Intl.DateTimeFormat('pt-PT', dOpts).format(now);
            }
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ── Seletor de Língua ────────────────────────────────────
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ── Portal de Imagem ─────────────────────────────────────
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const imgPath = link.getAttribute('data-img');
            if (menuPreviewImg && imgPath) menuPreviewImg.src = imgPath;
        });
        link.addEventListener('mouseleave', () => {
            if (menuPreviewImg) menuPreviewImg.src = defaultImg;
        });
    });

    // ── Toggle Direto ────────────────────────────────────────
    if (menuTrigger && menuOverlay) {
        menuTrigger.addEventListener('click', () => {
            const isOpen = menuOverlay.classList.contains('is-open');

            if (isOpen) {
                // FECHAR
                menuOverlay.classList.remove('is-open');
                menuOverlay.classList.add('is-closing');
                menuTrigger.classList.remove('is-active');
                document.body.style.overflow = '';

                setTimeout(() => {
                    menuOverlay.classList.remove('is-closing');
                }, 1400); 
            } else {
                // ABRIR
                if (menuPreviewImg) menuPreviewImg.src = defaultImg;
                menuOverlay.classList.remove('is-closing');
                menuOverlay.classList.add('is-open');
                menuTrigger.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
});
