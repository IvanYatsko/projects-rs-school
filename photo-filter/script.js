window.onload = function () {
    const FULLSCREEN = document.querySelector(".fullscreen");
    const CHANGESTYLE = document.querySelector(".filters");
    const BUTTONRESET = document.querySelector('.btn-reset');
    const ARRAYINPUT = document.querySelectorAll('.filters input[type="range"]');
    const CHANGEIMAGE = document.querySelector('.btn-next');
    const MAINIMAGE = document.querySelector('.editor img');
    const BUTTONLOAD = document.querySelector('.btn-load--input');
    const BUTTONSAVE = document.querySelector('.btn-save');

    let numberImage = 0;

    const cleanTypeFile = () => {
        BUTTONLOAD.value = "";
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const changeStyle = (name, value, sizing) => {
        let root = document.querySelector(':root');
        root.style.setProperty(`--${name}`, `${value + sizing}`);
    };

    const changeOutput = (e) => {
        e.parentNode.querySelector("output").value = e.value;
    };

    const resetFilter = (event) => {
        for (let i = 0; i < ARRAYINPUT.length; i++) {
            ARRAYINPUT[i].value = ARRAYINPUT[i].getAttribute('data-default');
            changeOutput(ARRAYINPUT[i]);
            changeStyle(ARRAYINPUT[i].name, ARRAYINPUT[i].value, ARRAYINPUT[i].getAttribute('data-sizing'));
        }
    };

    const rangeInput = (event) => {
        if (!event.target.matches('input[type="range"]')) {
            return;
        }
        changeOutput(event.target);
        changeStyle(event.target.name, event.target.value, event.target.getAttribute('data-sizing'));
    };

    const whatTime = () => {
        const time = new Date();
        const hour = time.getHours();
        if (hour >= 6 && hour < 12) {
            return "morning/";
        } else if (hour >= 12 && hour < 18) {
            return "day/";
        } else if (hour >= 18 && hour <= 23) {
            return "evening/";
        } else {
            return "night/";
        }
    };

    const viewBgImage = (src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            MAINIMAGE.src = src;
        };
    };

    const chooseImage = () => {
        const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
        const images = [];
        for (let i = 0; i < 20; i++) {
            images[i] = (i < 9) ? `0${i + 1}.jpg` : `${i + 1}.jpg`;
        }
        const index = numberImage % images.length;
        const timeNow = whatTime();
        const imageSrc = base + timeNow + images[index];
        viewBgImage(imageSrc);
        numberImage++;
        cleanTypeFile();
    };

    const loadPicture = (e) => {
        const file = BUTTONLOAD.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            MAINIMAGE.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    const setFilter = (height) => {
        let str = "";
        ARRAYINPUT.forEach((elem) => {
            str += `${elem.name === "hue" ? "hue-rotate" : elem.name}(${
            elem.name === "blur" ? elem.value * (height / MAINIMAGE.height) : elem.value
          }${elem.getAttribute("data-sizing")}) `;
        });
        console.log(str);
        return str.trim();
    };

    const drawImage = () => {
        console.log(24);
        const canvas = document.createElement("canvas");
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.src = MAINIMAGE.src;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.filter = setFilter(img.height);
            ctx.strokeRect(50, 50, 50, 50);
            ctx.drawImage(img, 0, 0);
            let link = document.createElement("a");
            link.download = "download.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            link.delete;
        };
    };

    BUTTONRESET.addEventListener("click", resetFilter);
    FULLSCREEN.addEventListener("click", toggleFullScreen);
    CHANGESTYLE.addEventListener("input", rangeInput);
    CHANGEIMAGE.addEventListener("click", chooseImage);
    BUTTONLOAD.addEventListener("change", loadPicture);
    BUTTONSAVE.addEventListener("click", drawImage);
};