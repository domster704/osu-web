export default class Canvas {
    marginX = 100;
    marginY = 75;

    constructor(width, height, numberCanvas, aspectRatio) {
        this.canvas = document.querySelector(`.canvas${numberCanvas}`);

        Object.assign(this.canvas, {width, height});
        Object.assign(this, {width, height});

        this.aspectRatio = aspectRatio;
        this.onresize();
        if (this.aspectRatio) {
            this.canvas.style = `margin-left: ${this.canvas.width - this.canvas.width / this.aspectRatio - this.marginX * 1.5}px;`
        }

        this.context = this.canvas.getContext('2d');

        addEventListener('resize', () => {
            this.onresize();
        });
    }

    static create(...args) {
        return new Canvas(...args);
    }

    onresize() {
        if (this.aspectRatio) {
            this.canvas.width = this.width = window.innerHeight * this.aspectRatio + this.marginX * 2;
            this.canvas.height = this.height = window.innerHeight;
        } else {
            this.canvas.width = this.width = window.innerWidth;
            this.canvas.height = this.height = window.innerHeight;
        }
    }
}