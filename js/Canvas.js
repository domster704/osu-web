// export default class Canvas {
class Canvas {
    constructor(width, height, numberCanvas) {
        this.canvas = document.querySelector(`.canvas${numberCanvas}`);

        Object.assign(this.canvas, { width, height });
        Object.assign(this, { width, height });

        this.context = this.canvas.getContext('2d');   
           
        window.onresize = () => {
            this.onresize();
        }
    }

    onresize() {
        this.canvas.width  = this.width  = window.innerWidth;
        this.canvas.height = this.height = window.innerHeight;
    }

    static create(...args) {
        return new Canvas(...args);
    }
}