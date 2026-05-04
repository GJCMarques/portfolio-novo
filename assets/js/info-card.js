/**
 * HERITAGE GUIDE - EDITORIAL VERSION
 * Handles the light-themed info card with media and persistent toggle.
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
    let isOpen = false;

    // Toggle Interaction
    infoToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
            infoGuide.classList.add('is-open');
        } else {
            infoGuide.classList.remove('is-open');
        }
    });

    // Close Button inside Card
    infoClose.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = false;
        infoGuide.classList.remove('is-open');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (isOpen && !infoGuide.contains(e.target)) {
            isOpen = false;
            infoGuide.classList.remove('is-open');
        }
    });

    // Navigation Logic
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === currentSlide);
        });
        
        // Update Step Text
        if (infoStep) {
            infoStep.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
        
        // Disable buttons at bounds
        if (infoPrev) infoPrev.disabled = currentSlide === 0;
        if (infoNext) infoNext.disabled = currentSlide === totalSlides - 1;
    }

    if (infoNext) {
        infoNext.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlides();
            }
        });
    }

    if (infoPrev) {
        infoPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlides();
            }
        });
    }

    // Initial State
    updateSlides();
});
