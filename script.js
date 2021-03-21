window.onload = function() {
    const PIANO = document.querySelector('.piano');
    const PIANOKEY = document.querySelectorAll('.piano-key');
    const CHANGE = document.querySelectorAll('.btn-container .btn');
    const BUTTONTOGGLE = document.querySelector('.fullscreen');

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }

    const changeButton = () => {
        CHANGE.forEach((item) => {
            if (item.classList.contains('btn-active') && item.getAttribute('data-button') == 'notes') {
                PIANOKEY.forEach((item) => {
                    item.classList.remove('piano-key-letter');
                    item.classList.add('piano-key-note');
                })
            } else if (item.classList.contains('btn-active') && item.getAttribute('data-button') == 'letters') {
                PIANOKEY.forEach((item) => {
                    item.classList.remove('piano-key-note');
                    item.classList.add('piano-key-letter');
                });
            }
        });
    }

    const clickButton = (event) => {
        CHANGE.forEach((elem) => {
            elem.classList.remove('btn-active');
        });
        event.target.classList.add('btn-active');
        changeButton();
    }

    const playSound = (note) => {
        let src = `./assets/audio/${note}.mp3`;
        const audio = new Audio();
        audio.src = src;
        audio.currentTime = 0;
        audio.play();
    }

    const startPlay = (event) => {
        event.target.classList.add('piano-key-active');
        playSound(event.target.getAttribute('data-note'));
    }

    const stopPlay = (event) => {
        event.target.classList.remove('piano-key-active');
    }

    const clickPiano = (event) => {
        if (event.target.classList.contains('piano-key')) {
            event.target.classList.add('piano-key-active');
            playSound(event.target.getAttribute('data-note'));
            PIANOKEY.forEach((item) => {
                item.addEventListener('mouseover', startPlay);
                item.addEventListener('mouseout', stopPlay);
            });
        }
    }

    const unclickPiano = (event) => {
        PIANOKEY.forEach((item) => {
            item.classList.remove('piano-key-active');
            item.removeEventListener('mouseover', startPlay);
            item.removeEventListener('mouseout', stopPlay);
        })
    }

    const clickKeyboard = (event) => {
        PIANOKEY.forEach((item) => {
            if (item.getAttribute('data-letter') == event.code.slice(3)) {
                item.classList.add('piano-key-active');
                playSound(item.getAttribute('data-note'));
            }
        })
    }
    const unclickKeyboard = (event) => {
        PIANOKEY.forEach((item) => {
            item.classList.remove('piano-key-active');
        })
    }

    changeButton();
    CHANGE.forEach((item) => {
        item.addEventListener('click', clickButton);
    })
    BUTTONTOGGLE.addEventListener('click', toggleFullScreen);
    PIANO.addEventListener('mousedown', clickPiano, false);
    window.addEventListener('mouseup', unclickPiano);

    window.addEventListener('keydown', clickKeyboard);
    window.addEventListener('keyup', unclickKeyboard);


}