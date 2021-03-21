window.onload = function() {
    const PIANO = document.querySelector('.piano');
    const PIANOKEY = document.querySelectorAll('.piano-key');

    const startPlay = (event) => {
        event.target.classList.add('piano-key-active');
    }

    const stopPlay = (event) => {
        event.target.classList.remove('piano-key-active');
    }

    const clickPiano = (event) => {
        if (event.target.classList.contains('piano-key')) {
            event.target.classList.add('piano-key-active');
            PIANOKEY.forEach((item) => {
                item.addEventListener('mouseover', startPlay);
                item.addEventListener('mouseout', stopPlay);
            })
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
                item.classList.add('piano-key-active')
            }
        })
    }
    const unclickKeyboard = (event) => {
        PIANOKEY.forEach((item) => {
            item.classList.remove('piano-key-active');
        })
    }

    PIANO.addEventListener('mousedown', clickPiano, false);
    window.addEventListener('mouseup', unclickPiano);

    window.addEventListener('keydown', clickKeyboard);
    window.addEventListener('keyup', unclickKeyboard);


}