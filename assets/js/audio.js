document.addEventListener("DOMContentLoaded", () => {
    const audioObj = new Audio('assets/music/ambient.mp3');
    audioObj.loop = true;
    audioObj.volume = 0;
    let isPlaying = false;
    const maxVolume = 0.4;

    // 1. Build the Global Audio Controller (Minimalist Soundwave)
    const controllerHTML = `
    <button class="global-audio-ctrl" id="globalAudioCtrl" aria-label="Toggle Audio">
        <div class="sound-bars">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </button>`;
    document.body.insertAdjacentHTML('beforeend', controllerHTML);

    const audioCtrl = document.getElementById('globalAudioCtrl');

    // 2. Build the Fullscreen Audio Overlay Prompt (Vogue Editorial Style)
    const overlayHTML = `
    <div id="audioOverlay" class="audio-overlay">
        <div class="audio-prompt-content">
            <h2 class="audio-prompt-title">A Experiência<br>Heritage</h2>
            <p class="audio-prompt-desc">Para uma imersão cinematográfica, recomendamos o uso de som.</p>
            
            <div class="audio-prompt-btns">
                <button id="btnSoundOn" class="btn-roll btn-cta">
                    <span class="roll-wrapper">
                        <span class="roll-text" data-text="ATIVAR SOM">ATIVAR SOM</span>
                    </span>
                </button>
                <button id="btnSoundOff" class="btn-roll btn-subtle">
                    <span class="roll-wrapper">
                        <span class="roll-text" data-text="EXPLORAR EM SILÊNCIO">EXPLORAR EM SILÊNCIO</span>
                    </span>
                </button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    const audioOverlay = document.getElementById('audioOverlay');
    const btnSoundOn = document.getElementById('btnSoundOn');
    const btnSoundOff = document.getElementById('btnSoundOff');

    // 3. Handle Overlay Choices
    function activateSite(withSound) {
        // Unlock site animations
        document.body.classList.remove('is-awaiting-audio');
        document.body.classList.add('is-site-active');
        
        audioOverlay.classList.add('hidden');

        if (withSound) {
            audioObj.play().then(() => {
                isPlaying = true;
                audioCtrl.classList.add('playing');
                
                let vol = 0;
                const fadeInt = setInterval(() => {
                    vol += 0.05;
                    if (vol >= maxVolume) {
                        vol = maxVolume;
                        clearInterval(fadeInt);
                    }
                    audioObj.volume = vol;
                }, 200);
            }).catch(err => console.warn("Audio autoplay blocked", err));
        }
    }

    btnSoundOn.addEventListener('click', () => activateSite(true));
    btnSoundOff.addEventListener('click', () => activateSite(false));

    // 4. Handle Global Controller Clicks
    audioCtrl.addEventListener('click', () => {
        if (isPlaying) {
            let vol = audioObj.volume;
            const fadeOut = setInterval(() => {
                vol -= 0.05;
                if (vol <= 0) {
                    vol = 0;
                    clearInterval(fadeOut);
                    audioObj.pause();
                    isPlaying = false;
                    audioCtrl.classList.remove('playing');
                } else {
                    audioObj.volume = vol;
                }
            }, 100);
        } else {
            audioObj.play();
            isPlaying = true;
            audioCtrl.classList.add('playing');
            
            let vol = audioObj.volume;
            const fadeIn = setInterval(() => {
                vol += 0.05;
                if (vol >= maxVolume) {
                    vol = maxVolume;
                    clearInterval(fadeIn);
                }
                audioObj.volume = vol;
            }, 100);
        }
    });
});
