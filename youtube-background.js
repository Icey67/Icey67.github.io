// === YouTube Background Music System ===
(function() {
    // Only activate on blog posts with music sections
    if (!document.querySelector('.music-section')) return;

    // --- State ---
    let player, currentSection = null, isMuted = false, fadeInterval = null, currentYtId = null;
    const musicFooter = document.getElementById('music-footer');
    const sections = Array.from(document.querySelectorAll('.music-section'));
    let userVolume = parseInt(sessionStorage.getItem('musicVolume')) || 100; // Default volume

    // --- UI ---
    function renderFooter(tip) {
        if (!musicFooter) return;
        musicFooter.innerHTML = '';
        // Music tip
        const tipDiv = document.createElement('div');
        tipDiv.className = 'music-tip';
        tipDiv.textContent = tip || '';
        tipDiv.style.color = 'white';
        // Mute button
        const muteBtn = document.createElement('button');
        muteBtn.textContent = isMuted ? 'Unmute' : 'Mute';
        muteBtn.style = 'padding: 0; margin: 0 5px 0 20px;';
        muteBtn.onclick = function() {
            isMuted = !isMuted;
            localStorage.setItem('musicMuted', isMuted ? '1' : '0');
            setMute(isMuted);
            renderFooter(tip);
        };
        musicFooter.appendChild(tipDiv);
        musicFooter.appendChild(muteBtn);
        // Volume slider
        const volInput = document.createElement('input');
        volInput.type = 'range';
        volInput.min = 0;
        volInput.max = 100;
        volInput.value = userVolume;
        volInput.oninput = function() {
            userVolume = parseInt(this.value);
            sessionStorage.setItem('musicVolume', userVolume);
            volLabel.textContent = userVolume + '%';
            if (!isMuted && player) {
                player.setVolume(userVolume);
            }
        };
        const volLabel = document.createElement('span');
        volLabel.textContent = userVolume + '%';
        volLabel.style = 'margin-left: 8px; margin-right: 10px;';
        musicFooter.appendChild(document.createTextNode('🔈'))
        musicFooter.appendChild(volInput);
        musicFooter.appendChild(volLabel);
    }

    // --- YouTube API Loader ---
    function loadYouTubeAPI(cb) {
        if (window.YT && window.YT.Player) return cb();
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        window.onYouTubeIframeAPIReady = cb;
        document.body.appendChild(tag);
    }

    // --- Player Setup ---
    function createPlayer() {
        const div = document.createElement('div');
        div.id = 'yt-music-player';
        div.style.display = 'none';
        document.body.appendChild(div);
        player = new YT.Player('yt-music-player', {
            height: '0',
            width: '0',
            videoId: '',
            playerVars: {
                autoplay: 0,
                controls: 0,
                loop: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                fs: 0,
                disablekb: 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady() {
        // Set initial mute state
        isMuted = localStorage.getItem('musicMuted') === '1';
        setMute(isMuted);
        // Start with the first section
        updateMusicSection();
        window.addEventListener('scroll', updateMusicSection);
    }

    function onPlayerStateChange(e) {
        // Loop video if ended
        if (e.data === YT.PlayerState.ENDED) {
            player.seekTo(0);
            player.playVideo();
        }
    }

    // --- Music Section Logic ---
    function getActiveSection() {
        // Find the last music-section above the middle of the viewport
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        let active = null;
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            const absTop = rect.top + scrollY;
            if (absTop < scrollY + vh / 1.25) {
                active = section;
            }
        }
        return active;
    }

    function updateMusicSection() {
        const section = getActiveSection();
        if (!section) {
            // No section in view, fade out
            fadeOutAndPause();
            renderFooter('');
            currentSection = null;
            currentYtId = null;
            return;
        } else if (section.getAttribute('data-mute') === "true") {
            // Section is muted, fade out
            fadeOutAndPause();
            renderFooter('');
            currentSection = null;
            currentYtId = null;
            return;
        }
        if (section === currentSection) return;
        const ytid = section.getAttribute('data-ytid');
        const tip = section.getAttribute('data-tip') || '';
        if (!ytid) return;
        // If new section, fade out, load new, fade in
        fadeToNewTrack(ytid, tip);
        currentSection = section;
        currentYtId = ytid;
    }

    function fadeToNewTrack(ytid, tip) {
        if (!player) return;
        // If same video, just fade in
        if (player.getVideoData().video_id === ytid) {
            fadeIn();
            renderFooter(tip);
            return;
        }
        fadeOut(() => {
            player.loadVideoById(ytid);
            player.setVolume(isMuted ? 0 : userVolume);
            player.playVideo();
            fadeIn();
            renderFooter(tip);
        });
    }

    function fadeIn() {
        if (!player) return;
        clearInterval(fadeInterval);
        let v = 0;
        player.setVolume(isMuted ? 0 : v);
        player.playVideo();
        fadeInterval = setInterval(() => {
            if (isMuted) {
                player.setVolume(0);
                clearInterval(fadeInterval);
                return;
            }
            v += 10;
            if (v >= userVolume) {
                v = userVolume;
                clearInterval(fadeInterval);
            }
            player.setVolume(v);
        }, 50);
    }

    function fadeOut(cb) {
        if (!player) { if (cb) cb(); return; }
        clearInterval(fadeInterval);
        let v = player.getVolume();
        fadeInterval = setInterval(() => {
            v -= 10;
            if (v <= 0) {
                v = 0;
                player.setVolume(0);
                clearInterval(fadeInterval);
                if (cb) cb();
            } else {
                player.setVolume(v);
            }
        }, 50);
    }

    function fadeOutAndPause() {
        fadeOut(() => {
            if (player) player.pauseVideo();
        });
    }

    function setMute(mute) {
        if (!player) return;
        if (mute) {
            player.pauseVideo();
        } else {
            player.playVideo();
            player.setVolume(userVolume);
        }
    }

    // --- Init ---
    loadYouTubeAPI(createPlayer);
})();
// === End YouTube Background Music System ===