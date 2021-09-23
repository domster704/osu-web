import Note from "../GameObjects/Note.js";
import OsuArchiveHandler from "./OsuArchiveHandler.js";

export default class Map extends OsuArchiveHandler{
    startTime = null;
    isEnd = null;
    music = null;

    constructor() {
        super();
        this.mapParams = {
            hp: 3.5,
            cs: 3.8,
            od: 8.0,
            ar: 9.0,
        };

        this.listNotes = [];
    }

    readDataFromFiles(data, app) {
        // Read characteristic of map
        const mapData = data.split('\r\n');

        let mapCharacteristic = mapData.slice(mapData.indexOf('[Difficulty]') + 1, mapData.indexOf('[Difficulty]') + 7).map((num) => {
            return parseFloat(num.split(':')[1]);
        });

        for (let i in Object.keys(this.mapParams)) {
            this.mapParams[Object.keys(this.mapParams)[i]] = mapCharacteristic[i];
        }

        // Read timing appearance and positions of note, slider and spinner (objects)
        let objects = mapData.slice(mapData.indexOf('[HitObjects]') + 1);
        for (let i of objects) {
            let noteData = i.split(',').slice(0, 3)

            let someRatioX = (app.canvas3.width - app.canvas3.marginX * 2) / 512;
            let someRatioY = (app.canvas3.height - app.canvas3.marginY * 2) / 384;

            console.log(this.mapParams, i)
            this.addObjectToList(Note.create(noteData[0] * someRatioX + app.canvas3.marginX, noteData[1] * someRatioY + app.canvas3.marginY, 120, this.mapParams),
                                 noteData[2])
        }
    }

    countCombo() {
        /*
        1 - + 1 к комбо за ноту,
        2 - + 1 к комбо за слайдер,
        5 - обнуление комбы и + 1  к комбо за ноту,
        6 - обнуление комбы и + 1  к комбо за слайдер,
        12 - + 1 комбо за спиннер,
         */
    }

    addObjectToList(note, time) {
        this.listNotes.push({
            note: note,
            time: time,
        })
    }

    playMap(app) {
        if (!this.startTime) {
            this.startTime = performance.now();

            let music = document.getElementById('music');
            music.src = this.music;
            music.volume = 0.2;
            music.play();
        }
        for (let i in this.listNotes) {
            let time = performance.now() - this.startTime;
            if (time >= this.listNotes[i].time) {
                this.listNotes[i].note.draw(app);
                delete this.listNotes[i];
            }
        }
    }
}