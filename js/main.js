import Application from "./Application.js";
import Note from "./GameObjects/Note.js";
import Slider from "./GameObjects/Slider.js";
import Map from "./BeatMap/Map.js";
import {getRandomNumber} from "./utility.js"

// // Создать кнопку, при нажатии на которую будет воспроизводиться звук
// const mainAudio = new Audio();
// mainAudio.volume = 0.01;
// mainAudio.autoplay = true;
// mainAudio.muted = true;
// mainAudio.src = 'data/audio/mainAudio.mp3';
// mainAudio.play();

let hitCount = 0;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
});

const config = {
    ar: 1,
};

// let noteList = [];
// for (let i = 0; i < 4; i++) {
//     noteList.push({
//         note: Note.create(getRandomNumber(app.canvas.width - app.canvas.width / app.aspectRatio, app.canvas.width / app.aspectRatio), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
//         status: ''
//     });
// }

// for (let i of noteList) {
//     i.note.draw(app);
// }

const backgroundImage = new Image();
backgroundImage.src = "data/image/background/back.jpg";

app.on('update', () => {
    app.canvas2.context.beginPath();
    app.canvas2.context.drawImage(backgroundImage, 0, 0);
    app.canvas2.context.fillStyle = 'rgba(0, 0, 0, 0.85)';
    app.canvas2.context.fillRect(0, 0, app.canvas.width, app.canvas.height);

    app.canvas3.context.beginPath();
    app.canvas3.context.fillStyle = 'white';
    app.canvas3.context.moveTo(0, 0);
    app.canvas3.context.lineTo(0, app.canvas3.height);
    app.canvas3.context.stroke();

    app.canvas3.context.beginPath();
    app.canvas3.context.fillStyle = 'white';
    app.canvas3.context.moveTo(app.canvas3.width, 0);
    app.canvas3.context.lineTo(app.canvas3.width, app.canvas3.height);
    app.canvas3.context.stroke();
});

function reStatNote(hitCircle) {
    hitCircle.note.draw(app);
    hitCircle.status = hitCircle.note.getStatus(app.cursor.mousePos, app);

    if (hitCircle.status) {
        if (hitCircle.note.resultAnimate(app.canvas, hitCircle.status)) {
            return {
                note: Note.create(getRandomNumber(app.canvas.width - app.canvas.width / app.aspectRatio, app.canvas.width / app.aspectRatio), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
                status: '',
            }
        }
    }
}

let slider = Slider.create(500, 400, 600, 200,  app.fps, {
    hp: 3.5,
    cs: 3.8,
    od: 8.0,
    ar: 9.0,
});
let firstPos = null;
let secondPos = null;
let sum = 0;

export const map = new Map();

const input = document.getElementById('inputFile');
input.onchange = (input) => {
    const file = input.srcElement.files[0];

    let reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function () {
        map.readDataFromFiles(reader.result, app)
    }
}

const inputMusic = document.getElementById('inputMusic');
inputMusic.onchange = (input) => {
    console.log(input)
    map.music = URL.createObjectURL(input.target.files[0]);
}

let flag = 0;
let but = document.getElementById('musicBut');
but.onclick = () => {
    flag = 1
    map.isEnd = false;
    map.playMap(app);
}

app.on('update', () => {
    if (flag) {
        map.playMap(app);
    }

    // for (let i in noteList) {
    //     if (reStatNote(noteList[i])) noteList[i] = reStatNote(noteList[i]);
    // }

    if (app.cursor.mouseKeyDown === 1) {
        firstPos = app.cursor.mousePos;
        sum = 1;
    }else if (app.cursor.mouseKeyDown === 4) {
        secondPos = app.cursor.mousePos;
        sum === 1 ? sum = 2: sum = 1;
    }

    if (sum === 2) {
        slider = Slider.create(500, 400, 600, 200,  app.fps, {
            hp: 3.5,
            cs: 3.8,
            od: 8.0,
            ar: 9.0,
        });
        sum = 0;
    }

    if (slider) {
        slider.drawSlider(app);
    }

    // const {context} = app.canvas;
    // context.font = "30px Arial";
    // context.fillStyle = "white";
    // context.fillText(`Hits: ${hitCount}`, 100, 40)
    // context.fillText(`Miss: ${countMiss}`, 100, 80)
});
