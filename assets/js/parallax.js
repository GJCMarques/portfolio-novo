/**
 * HERO BACKGROUND PARALLAX
 * Subtle mouse-follow depth effect
 */
document.addEventListener('mousemove', (e) => {
    const bgImg = document.querySelector('.hero-stage__bg img');
    if (!bgImg) return;

    // Calculate mouse position as a percentage of screen size
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Limit movement range for a subtle, high-end look
    const moveX = (x - 0.5) * 30; // Max 15px movement
    const moveY = (y - 0.5) * 30;

    // Apply transformation with a very smooth transition (already handled by CSS will-change/transition if needed)
    // Here we use JS for direct control
    bgImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
