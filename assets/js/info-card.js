/**
 * HERITAGE GUIDE - INFO CARD LOGIC
 * Manages the interactive info card in the Hero section.
 */
document.addEventListener('DOMContentLoaded', () => {
    const infoGuide = document.getElementById('infoGuide');
    const infoToggle = document.getElementById('infoToggle');
    const infoClose = document.getElementById('infoClose');
    const infoNext = document.getElementById('infoNext');
    const infoPrev = document.getElementById('infoPrev');
    const infoStep = document.querySelector('.info-card__step');
    const slides = document.querySelectorAll('.info-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Toggle Open
    infoToggle.addEventListener('click', () => {
        infoGuide.classList.add('is-open');
    });

    // Toggle Close
    infoClose.addEventListener('click', () => {
        infoGuide.classList.remove('is-open');
    });

    // Navigation
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === currentSlide);
        });
        
        // Update Step Text
        infoStep.textContent = `${currentSlide + 1} / ${totalSlides}`;
        
        // Disable buttons at bounds
        infoPrev.disabled = currentSlide === 0;
        infoNext.disabled = currentSlide === totalSlides - 1;
    }

    infoNext.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    });

    infoPrev.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

    // Initial State
    updateSlides();
});
