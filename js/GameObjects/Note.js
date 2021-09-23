import GameObject from "./GameObject.js";

export default class Note extends GameObject{

    constructor(posX, posY, fps, mapParams) {
        super(posX, posY, fps, mapParams);
        console.log(this.radius)
    }

    static create(...args) {
        return new Note(...args)
    }

    getStatus(mousePos, app) {
        let mousePosX = (mousePos.x - app.cursor.mousePosForMap);
        let mousePosY = mousePos.y;
        if ((this.position.x - mousePosX) ** 2 + (this.position.y - mousePosY) ** 2 <= this.radius ** 2 && !this.objectStatus) {

            if (Object.values(app.keyControl.keys).includes(true)) {
                if (this.range(this.hit300Range[0], this.hit300Range[1])) {
                    this.objectStatus = 'hit300';
                } else if (this.range(this.hit100Range[0], this.hit100Range[1])) {
                    this.objectStatus = 'hit100';
                } else if (this.range(this.hit50Range[0], this.hit50Range[1])) {
                    this.objectStatus = 'hit50';
                }

                if (this.objectStatus) {
                    app.hitAudio.play();
                }
            }
        }

        return this.objectStatus;
    }
}
