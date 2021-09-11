import Application from "./Application.js";
import Note from "./GameObjects/Note.js";
import {getRandomNumber, hexToRGB} from "./utility.js"

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
    ar: 3,
};

let noteList = [];
for (let i = 0; i < 5; i++) {
    noteList.push({
        note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
        status: ''
    });
}

const backgroundImage = new Image();
backgroundImage.src = "data/image/background/back.jpg";

app.on('update', () => {
    app.canvas2.context.beginPath();
    app.canvas2.context.drawImage(backgroundImage, 0, 0);
    app.canvas2.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    app.canvas2.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
});



function reStatNote(hitCircle) {
    hitCircle.note.draw(app.canvas);

    hitCircle.status = hitCircle.note.getStatus(app.cursor.mousePos);

    if (hitCircle.status) {
        if (hitCircle.note.resultAnimate(app.canvas, hitCircle.status)) {
            return {
                note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
                status: ''
            }
        }
    }

    // switch (hitCircle.status) {
    //     case 'hit300' || 'hit100' || 'hit50':
    //         if (hitCircle.note.resultAnimate(app.canvas, hitCircle.status)) {
    //             hitCount++;
    //             return {
    //                 note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
    //                 status: ''
    //             }
    //         }

        // case 'hit100':
        //     if (hitCircle.note.hit100Animate(app.canvas)) {
        //         hitCount++;
        //         return {
        //             note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
        //             status: ''
        //         }
        //     }
        //     break;
        // case 'hit50':
        //     if (hitCircle.note.hit50Animate(app.canvas)) {
        //         hitCount++;
        //         return {
        //             note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
        //             status: ''
        //         }
        //     }
        //     break;
    //     case 'miss':
    //         if (hitCircle.note.missAnimate(app.canvas)) {
    //             return {
    //                 note: Note.create(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps),
    //                 status: ''
    //             }
    //         }
    //         break;
    // }
}

app.on('update', () => {
    for (let i in noteList) {
        if (reStatNote(noteList[i])) noteList[i] = reStatNote(noteList[i]);
    }

    const {context} = app.canvas;

    // context.font = "30px Arial";
    // context.fillStyle = "white";
    // context.fillText(`Hits: ${hitCount}`, 100, 40)
    // context.fillText(`Miss: ${countMiss}`, 100, 80)
});
