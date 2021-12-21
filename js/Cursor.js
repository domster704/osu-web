import {hexToRGB} from "./utility.js";

export default class Cursor {
    trail = [];
    TRAIL_LENGTH = 15;
    canvas = null;
    CURSOR_SIZE = 10;

    cursor = {
        x: 0,
        y: 0,
        size: this.CURSOR_SIZE,
        color: "",
        trailRootColor: hexToRGB('#FF4E50'),
        trailEndColor: hexToRGB('#F9D423')
    };

    mouseKeyDown = null;
    isPress = false;

    constructor(app) {
        this.mousePos = {
            x: 0,
            y: 0,
        };

        this.mousePosForMap = app.canvas3.canvas.width - app.canvas3.canvas.width / app.canvas3.aspectRatio - app.canvas3.marginX * 1.5;
        this.context = app.canvas.context;
        const allWindowCanvas = app.canvas.canvas;
        const mapCanvas = app.canvas3.canvas;


        allWindowCanvas.addEventListener("mousemove", (event) => {
            function getMousePosInCanvas() {
                let rect = allWindowCanvas.getBoundingClientRect();

                return {
                    x:
                        ((event.clientX - rect.left) / (rect.right - rect.left)) *
                        allWindowCanvas.width,
                    y:
                        ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
                        allWindowCanvas.height,
                };
            }

            this.mousePos = getMousePosInCanvas();
        });

        mapCanvas.addEventListener("mousemove", (event) => {
            function getMousePosInCanvas() {
                let rect = mapCanvas.getBoundingClientRect();

                return {
                    x:
                        ((event.clientX - rect.left) / (rect.right - rect.left)) *
                        mapCanvas.width,
                    y:
                        ((event.clientY - rect.top) / (rect.bottom - rect.top)) *
                        mapCanvas.height,
                };
            }

            this.mousePosForMap = getMousePosInCanvas();
        });

        let k = true;
        allWindowCanvas.addEventListener('mousedown', event => {
            if (this.isPress) {
                this.mouseKeyDown = null;
            } else if (k) {
                k = false;
                this.mouseKeyDown = event.which;
            }
            this.isPress = true;
        });

        allWindowCanvas.addEventListener('mouseup', event => {
            this.isPress = false;
            k = true;
            this.mouseKeyDown = null;
        });
    }

    static create(...args) {
        return new Cursor(...args);
    }

    // TODO: сделать cursorTrail без разрыва
    draw() {
        if (this.trail.length >= this.TRAIL_LENGTH) this.trail.shift();

        this.trail.push({
            x: this.mousePos.x,
            y: this.mousePos.y,
        });

        for (let i = 0; i < this.trail.length; i++) {

            let color = "";
            for (let j = 0; j < 3; j++) {
                color += (Math.floor(this.cursor.trailRootColor[j] - ((this.cursor.trailRootColor[j] - this.cursor.trailEndColor[j]) / this.trail.length * i))).toString() + ','
            }

            this.context.beginPath();
            this.context.fillStyle = `rgb(${color.slice(0, color.length - 1)})`;

            // if (i !== this.trail.length - 1) {
            //     let distance = Math.sqrt((this.trail[i].x + this.trail[i + 1].x) ** 2 + (this.trail[i].x + this.trail[i + 1].y) ** 2);
            //
            //     let pos1 = this.trail[i];
            //     let pos2 = this.trail[i + 1];
            //
            //     let xLength = pos1.x - pos2.x;
            //     let yLength = pos1.y - pos2.y;
            //
            //     for (let k = 0; k < distance; k++) {
            //         this.context.beginPath();
            //
            //         // let dx;
            //         // if (this.trail[i].x > this.trail[i + 1].x) dx = 1;
            //         // else                                       dx = -1;
            //         //
            //         // let dy;
            //         // if (this.trail[i].y > this.trail[i + 1].y) dy = 1;
            //         // else                                       dy = -1;
            //
            //         this.context.arc(
            //             pos1.x + xLength / distance * k - this.CURSOR_SIZE / 2,
            //             pos1.y + yLength / distance * k - this.CURSOR_SIZE / 2,
            //             this.cursor.size * ((i + 1) / this.trail.length),
            //             0,
            //             2 * Math.PI
            //         );
            //
            //         // this.context.arc(
            //         //     this.trail[i].x - this.CURSOR_SIZE / 2 + (this.trail[i].x - this.trail[i + 1].x - this.CURSOR_SIZE / 2) * ((1 + k) / distance), //
            //         //     this.trail[i].y - this.CURSOR_SIZE / 2 + (this.trail[i].y - this.trail[i + 1].y - this.CURSOR_SIZE / 2) * ((1 + k) / distance),
            //         //     this.cursor.size * ((i + 1) / this.trail.length),//
            //         //     0,
            //         //     2 * Math.PI,
            //         // );
            //         this.context.fill();
            //     }
            // }

            this.context.arc(
                this.trail[i].x - this.CURSOR_SIZE / 2,
                this.trail[i].y - this.CURSOR_SIZE / 2,
                this.cursor.size * ((i + 1) / this.trail.length),
                0,
                2 * Math.PI,
            );

            this.context.closePath();
            this.context.fill();
        }
    }
}
