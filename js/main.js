// import Application from "./Application.js";
// import Note from "./Note.js";
// import { getRandomNumber } from "./utility.js"

// // Создать кнопку, при нажатии на которую будет воспроизводиться звук
// const mainAudio = new Audio();
// mainAudio.volume = 0.01;
// mainAudio.autoplay = true;
// mainAudio.muted = true;
// mainAudio.src = '../data/audio/mainAudio.mp3';
// mainAudio.play();

// context.font = "30px Arial";
// context.fillStyle = "white";
// context.fillText(`Hits: ${countHits}`, 100, 40)
// context.fillText(`Miss: ${countMiss}`, 100, 80)
// cursor.draw();

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
});

const config = {
    ar: 3,
};

let note = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
let note2 = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
let note3 = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);

const backgroundImage = new Image();
backgroundImage.src = "../data/image/background/back.jpg";

app.on('update', () => {
    app.canvas2.context.beginPath();
    app.canvas2.context.drawImage(backgroundImage, 0, 0);
    app.canvas2.context.fillStyle = 'rgba(0, 0, 0, 0.75)';
    app.canvas2.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
});


function reStatNote(note) {
    if (note) {
        note.draw(app.canvas);
        switch (note.getStatus(app.cursor.mousePos)) {
            case 'hit':
                // 
                if (note.hitAnimate(100)) {
                    return new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
                }
                // countHits++;
                break;
            case 'miss':
                // note = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
                // countMiss++;
                if (note.missAnimate(app.canvas) == true) {
                    return new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
                }
                break;
        }
    }
}


app.on('update', () => {
    if (reStatNote(note)) {
        note = reStatNote(note);
    }
    if (reStatNote(note2)) {
        note2 = reStatNote(note2);
    }
    if (reStatNote(note3)) {
        note3 = reStatNote(note3);
    }
    // if (note2) {
    //     note2.draw(app.canvas);
    //     switch (note2.getStatus(app.cursor.mousePos)) {
    //         case 'hit':
    //             if (note2.hitAnimate(100)) {
    //                 note2 = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
    //             }
    //             // countHits++;
    //             break;
    //         case 'miss':
    //             // note = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
    //             // countMiss++;
    //             if (note2.missAnimate(app.canvas) == true) {
    //                 note2 = new Note(getRandomNumber(200, app.canvas.width - 200), getRandomNumber(100, app.canvas.height - 100), config.ar, app.fps);
    //             }
    //             break;
    //     }
    // }
    
});




