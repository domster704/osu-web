import Canvas from "./Canvas.js";
import Render from "./Render.js";
import EventEmitter from "./EventEmitter.js";
import Cursor from "./Cursor.js";

export default class Application extends EventEmitter {
    render = null;
    cursor = null;
    fps = 60;

    aspectRatio = 4 / 3;

    constructor(props) {
        super();

        class KeyControl {
            isPress = false;

            constructor() {
                this.keyList = ['KeyX', 'KeyZ', 'KeyD', 'KeyF', 'KeyL', 'KeyI', 'KeyU', 'KeyK'];
                this.keys = {};
                addEventListener('keydown', e => {
                    this.changeKeyState(e);
                });
                addEventListener('keyup', e => {
                    this.changeKeyState(e);
                });
            }

            changeKeyState(e) {
                if (!this.keyList.includes(e.code)) return;

                if (this.isPress) {
                    this.keys[e.code] = false;
                } else {
                    this.keys[e.code] = e.type === 'keydown';
                }

                if (e.type === 'keydown')
                    this.isPress = true;
                else if (e.type === 'keyup')
                    this.isPress = false;
            }
        }

        this.keyControl = new KeyControl();

        this.canvas = Canvas.create(props.width, props.height, 1);
        this.canvas2 = Canvas.create(props.width, props.height, 2);
        this.canvas3 = Canvas.create(props.width, props.height - props.height, 3, 4 / 3);

        this.render = Render.create();
        this.cursor = Cursor.create(this);

        this.time = [];
        this.loadDataForMap();
        this.tick();
    }

    loadDataForMap() {
        this.resultImageCount = 44;

        this.hitAudio = new Audio();
        this.hitAudio.volume = 0.5;
        this.hitAudio.autoplay = false;
        this.hitAudio.src = 'data/audio/tongueMushroom.wav';

        this.missImages = []
        this.hit50Images = []
        this.hit100Images = []

        let result;
        for (let i = 0; i <= this.resultImageCount; i++) {
            result = new Image();
            result.src = `data/image/note/miss/hit0-${i}.png`;
            this.missImages.push(result);

            result = new Image();
            result.src = `data/image/note/hit50/hit50-${i}.png`;
            this.hit50Images.push(result);

            result = new Image();
            result.src = `data/image/note/hit100/hit100-${i}.png`;
            this.hit100Images.push(result);
        }
    }

    tick() {
        this.render.clear(this.canvas);
        this.render.clear(this.canvas2);
        this.render.clear(this.canvas3);

        (() => {
            const now = performance.now();
            while (this.time.length > 0 && this.time[0] < now - 1000) {
                this.time.shift();
            }
            this.time.push(now);
            this.fps = this.time.length < 60 ? 60 : this.time.length;
        })();

        this.emit('update');
        this.emit('mapPlaying');
        this.cursor.draw();

        requestAnimationFrame(() => this.tick());
    }
}