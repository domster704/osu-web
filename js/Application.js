import Canvas from "./Canvas.js";
import Render from "./Render.js";
import EventEmitter from "./EventEmitter.js";
import Cursor from "./Cursor.js";

export default class Application extends EventEmitter {
    render = null;
    cursor = null;

    container = [];
    fps = 60;

    constructor(props) {
        super();

        this.canvas = Canvas.create(props.width, props.height, 1);
        this.canvas2 = Canvas.create(props.width, props.height, 2);
        
        this.render = Render.create();
        this.cursor = Cursor.create(this.canvas);

        this.time = [];
        this.tick();
    }

    tick() {       
        this.render.clear(this.canvas);
        this.render.renderObjects(this.canvas, this.container);
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