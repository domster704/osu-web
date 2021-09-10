import Application from "./Application.js";
import Note from "./Note.js";
import { getRandomNumber } from "./utility.js"
// import { clear, getRandomNumber } from "./utility.js"
// import { context, context2, context3, canvas, canvas2, canvas3 } from "./Canvas.js";

// const AR = 2.4;

// let countHits = 0;
// let countMiss = 0;

// let time = [];
// let fps = 60;

// let note = new Note(getRandomNumber(200, canvas.width - 200), getRandomNumber(100, canvas.height - 100), 1000, AR, fps);

// // Создать кнопку, при нажатии на которую будет воспроизводиться звук
// const mainAudio = new Audio();
// mainAudio.volume = 0.01;
// mainAudio.autoplay = true;
// mainAudio.muted = true;
// mainAudio.src = '../data/audio/mainAudio.mp3';
// mainAudio.play();

// let back = new Image();
// back.src = "../data/image/background/back.jpg";

// context2.drawImage(back, canvas2.width / 2 - back.width / 2, canvas2.height / 2 - back.height / 2);
// // context2.drawImage(back, 0, 0);

// function animation() {
//     requestAnimationFrame(animation);
//     clear();
//     context2.drawImage(back, canvas2.width / 2 - back.width / 2, canvas2.height / 2 - back.height / 2);
//     context2.fillStyle = 'rgba(17, 17, 17, 0.75)';
//     context2.fillRect(0, 0, canvas2.width, canvas2.height);

//     (function getFPS() {
//         const now = performance.now();
//         while (time.length > 0 && time[0] < now - 1000) {
//             time.shift();
//         }

//         time.push(now);
//         fps = time.length;
//     })();

//     if (note) {
//         context.beginPath();
//         note.draw();

//         // После мисса или хита надо увеличить жизненный цикл ноты, для отображения попадания или промаха
//         switch (note.getStatus(cursor.mousePos)) {
//             case 'hit':
//                 note = new Note(getRandomNumber(200, canvas.width - 200), getRandomNumber(100, canvas.height - 100), 1000, AR, fps);
//                 countHits++;
//                 break;
//             case 'miss':
//                 note = new Note(getRandomNumber(200, canvas.width - 200), getRandomNumber(100, canvas.height - 100), 1000, AR, fps);
//                 countMiss++;
//                 break;
//         }
//     }

//     context.font = "30px Arial";
//     context.fillStyle = "white";
//     context.fillText(`Hits: ${countHits}`, 100, 40)
//     context.fillText(`Miss: ${countMiss}`, 100, 80)
//     cursor.draw();
// }

// const cursor = new Cursor(animation);

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




