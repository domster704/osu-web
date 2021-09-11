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
                this.keyList = ['KeyX', 'KeyZ', 'KeyD', 'KeyF'];
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

        this.render = Render.create();
        this.cursor = Cursor.create(this.canvas);

        this.time = [];
        this.tick();
    }

    tick() {
        this.render.clear(this.canvas);
        (() => {
            const now = performance.now();
            while (this.time.length > 0 && this.time[0] < now - 1000) {
                this.time.shift();
            }
            this.time.push(now);
            this.fps = this.time.length < 60 ? 60 : this.time.length;
        })();

        this.emit('update');
        this.cursor.draw();

        requestAnimationFrame(() => this.tick());
    }

}