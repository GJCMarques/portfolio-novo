document.addEventListener("DOMContentLoaded", () => {
    const audioObj = new Audio('assets/music/ambient.mp3');
    audioObj.loop = true;
    audioObj.volume = 0;
    let isPlaying = false;
    const maxVolume = 0.4;

    // 1. Build the Global Audio Controller
    const controllerHTML = `
    <button class="global-audio-ctrl" id="globalAudioCtrl">
        <span class="audio-text">SOUND: </span><span class="audio-state" id="audioState">OFF</span>
    </button>`;
    document.body.insertAdjacentHTML('beforeend', controllerHTML);

    const audioCtrl = document.getElementById('globalAudioCtrl');
    const audioState = document.getElementById('audioState');

    // 2. Build the Fullscreen Audio Overlay Prompt
    const overlayHTML = `
    <div id="audioOverlay" class="audio-overlay">
        <div class="audio-prompt-content">
            <p>Para uma experiência imersiva, ative o som ambiente.</p>
            <div class="audio-prompt-btns">
                <button id="btnSoundOn" class="btn-audio">ATIVAR SOM</button>
                <button id="btnSoundOff" class="btn-audio ghost">SILENCIOSO</button>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', overlayHTML);
    
    const audioOverlay = document.getElementById('audioOverlay');
    const btnSoundOn = document.getElementById('btnSoundOn');
    const btnSoundOff = document.getElementById('btnSoundOff');

    // 3. Handle Overlay Choices
    function activateSite(withSound) {
        // Remove awaiting state, Add active state
        document.body.classList.remove('is-awaiting-audio');
        document.body.classList.add('is-site-active');
        
        // Hide overlay
        audioOverlay.classList.add('hidden');

        if (withSound) {
            audioObj.play().then(() => {
                isPlaying = true;
                audioState.innerText = "ON";
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
                    audioState.innerText = "OFF";
                    audioCtrl.classList.remove('playing');
                } else {
                    audioObj.volume = vol;
                }
            }, 100);
        } else {
            audioObj.play();
            isPlaying = true;
            audioState.innerText = "ON";
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
