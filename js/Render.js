export default class Render {
    static create(...args) {
        return new Render(...args);
    }

    clear(canvas) {
        const { context } = canvas;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    renderObjects({ context }, objects) {
        for (const item of objects) {
            item.draw(context);
        }
    }
}