document.addEventListener("DOMContentLoaded", () => {
    const audioObj = new Audio('assets/music/ambient.mp3');
    audioObj.loop = true;
    audioObj.volume = 0;
    let isPlaying = false;
    const maxVolume = 0.4;
    let fadeInterval = null;

    // 1. Build the Global Audio Controller (Single Layer with Dynamic Intensity)
    const controllerHTML = `
    <button class="global-audio-ctrl" id="globalAudioCtrl" aria-label="Toggle Audio">
        <div class="sound-bars">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </button>`;
    document.body.insertAdjacentHTML('beforeend', controllerHTML);

    const audioCtrl = document.getElementById('globalAudioCtrl');

    // 2. Build the Fullscreen Audio Overlay Prompt
    const overlayHTML = `
    <div id="audioOverlay" class="audio-overlay">
        <div class="audio-prompt-content">
            <div class="audio-prompt-title-wrap">
                <h2 class="audio-prompt-title">Experiência<br>Sonora</h2>
            </div>
            <div class="audio-prompt-desc-wrap">
                <p class="audio-prompt-desc">Ambiente sonoro recomendado para uma imersão total.</p>
            </div>
            
            <div class="audio-prompt-btns">
                <div class="btn-wrap">
                    <button id="btnSoundOn" class="btn-roll btn-cta">
                        <span class="roll-wrapper">
                            <span class="roll-text" data-text="ATIVAR SOM">ATIVAR SOM</span>
                        </span>
                    </button>
                </div>
                <div class="btn-wrap">
                    <button id="btnSoundOff" class="btn-roll btn-subtle">
                        <span class="roll-wrapper">
                            <span class="roll-text" data-text="EXPLORAR EM SILÊNCIO">EXPLORAR EM SILÊNCIO</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    const audioOverlay = document.getElementById('audioOverlay');
    const btnSoundOn = document.getElementById('btnSoundOn');
    const btnSoundOff = document.getElementById('btnSoundOff');

    /**
     * Physical Motion Fading (Intensity based)
     */
    function fadeAudio(targetVolume, duration = 1500) {
        if (fadeInterval) clearInterval(fadeInterval);
        
        const startVolume = audioObj.volume;
        const steps = duration / 16; 
        const stepAmount = (targetVolume - startVolume) / steps;
        let currentStep = 0;

        // Ensure animation class is present if fading in
        if (targetVolume > 0) audioCtrl.classList.add('playing');

        fadeInterval = setInterval(() => {
            currentStep++;
            let nextVol = startVolume + (stepAmount * currentStep);
            
            if (stepAmount > 0 && nextVol >= targetVolume) nextVol = targetVolume;
            else if (stepAmount < 0 && nextVol <= targetVolume) nextVol = targetVolume;

            audioObj.volume = Math.max(0, Math.min(1, nextVol));
            
            // Sync Animation Intensity (Amplitude of the swing)
            const intensity = audioObj.volume / maxVolume;
            audioCtrl.style.setProperty('--sound-intensity', intensity.toFixed(3));

            if (nextVol === targetVolume) {
                clearInterval(fadeInterval);
                if (targetVolume === 0) {
                    audioObj.pause();
                    isPlaying = false;
                    audioCtrl.classList.remove('playing');
                }
            }
        }, 16);
    }

    function activateSite(withSound) {
        document.body.classList.remove('is-awaiting-audio');
        document.body.classList.add('is-site-active');
        audioOverlay.classList.add('hidden');

        if (withSound) {
            audioObj.play().then(() => {
                isPlaying = true;
                fadeAudio(maxVolume, 2000);
            }).catch(err => console.warn("Audio autoplay blocked", err));
        }
    }

    btnSoundOn.addEventListener('click', () => activateSite(true));
    btnSoundOff.addEventListener('click', () => activateSite(false));

    audioCtrl.addEventListener('click', () => {
        if (isPlaying) {
            fadeAudio(0, 1200);
        } else {
            audioObj.play();
            isPlaying = true;
            fadeAudio(maxVolume, 1200);
        }
    });
});
