import {getRandomNumber, hexToRGB} from "../utility.js";

export default class GameObject {
    constructor(posX, posY, fps, mapParams) {
        this.objectStatus = '';

        // CS
        this.radius = 75 - 4.5 * mapParams.cs;
        this.radiusDiff = 0;
        this.radiusDiffV = 0;
        this.radiusOfApproachCircle = this.radius * 3;

        this.fontStyle = 'Osu';

        this.position = {
            x: posX,
            y: posY
        };
        this.fps = fps;

        // AR
        this.ar = (this.radiusOfApproachCircle - this.radius) / ((1200 - 750 * (mapParams.ar - 5) / 5) / (1000 / this.fps));
        this.arV = this.ar;

        // OD
        this.hit300Range = [(160 - 12 * mapParams.od) / (1000 / this.fps) * this.ar, 0];
        this.hit100Range = [(280 - 16 * mapParams.od) / (1000 / this.fps) * this.ar, this.hit300Range[0]];
        this.hit50Range  = [(400 - 20 * mapParams.od) / (1000 / this.fps) * this.ar, this.hit100Range[0]];

        // console.log(this.hit300Range, this.hit100Range, this.hit50Range)

        this.hitAudio = new Audio();
        this.hitAudio.volume = 0.5;
        this.hitAudio.autoplay = false;
        this.hitAudio.src = 'data/audio/tongueMushroom.wav';

        this.colorObject = Math.round(getRandomNumber(0, 1))

        if (Math.round(getRandomNumber(0, 1))) {
            this.colorObject = hexToRGB('#4C2C2C', 'str', 0.8);
        } else {
            this.colorObject = hexToRGB('#757574', 'str', 0.8);
        }

        this.resultImageCount = 44;
        this.resultCount = 0;
    }

    range(hitRange1, hitRange2) {
        let dRadius = this.radiusDiff
        const remainingPart = this.radiusOfApproachCircle - this.radius;

        if (hitRange2) return (dRadius > remainingPart - hitRange1 && dRadius < remainingPart - hitRange2);
        else return (dRadius > remainingPart - hitRange1);
    }

    draw(app, combo, callback) {
        const {context} = app.canvas3;

        app.on('mapPlaying', () => {
            this.getStatus(app.cursor.mousePos, app);

            callback ? callback(context) : null;

            if (!this.objectStatus) {
                context.fillStyle = this.colorObject
                context.beginPath();
                context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                context.fill();

                if (!combo) {
                    context.beginPath();
                    context.font = `bold ${this.radius}px ${this.fontStyle}`
                    context.fillStyle = 'white';
                    context.fillText('1', this.position.x - this.radius / 3.5,this.position.y + this.radius / 4);
                }

                context.strokeStyle = '#FFF';
                context.lineWidth = 7;
                context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                context.stroke();

                this.#animatePartOfApproachCircle(context);
            } else {
                if (this.resultAnimate(app, this.objectStatus)) {
                    return 'closeFunc';
                }
            }
        })
    }

    #animatePartOfApproachCircle(context) {
        if (this.radiusDiff > this.radiusOfApproachCircle - this.radius) {
            this.ar = 0;
        }

        if (this.radiusDiffV > this.radiusOfApproachCircle - this.radius - this.hit300Range[1]) {
            this.objectStatus = 'miss';
        }

        context.beginPath()
        context.strokeStyle = "rgba(255, 255, 255, 0.75)";
        context.lineWidth = 5;
        context.arc(this.position.x, this.position.y, this.radiusOfApproachCircle - this.radiusDiff, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        this.radiusDiff += this.ar;
        this.radiusDiffV += this.arV;
    }

    /**
     * @abstract
     */
    getStatus() {

    }

    resultAnimate(app, type) {
        const {context} = app.canvas3;
        if (type !== 'hit300') {
            if (this.resultCount <= app.resultImageCount) {
                let result;
                if (type === 'miss') {
                    result = app.missImages[this.resultCount];
                } else if (type === 'hit50') {
                    result = app.hit50Images[this.resultCount];
                } else if (type === 'hit100') {
                    result = app.hit100Images[this.resultCount];
                }
                context.drawImage(result, this.position.x - result.width / 2, this.position.y - result.height / 2);
            }
            this.resultCount++;

            if (this.resultCount > app.resultImageCount + (1000 / this.fps) * 2) {
                return true;
            }
        } else {
            return true;
        }
    }
}