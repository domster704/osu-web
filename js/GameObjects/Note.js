import {getRandomNumber} from "../utility.js"

export default class Note {
    noteStatus = '';

    hit300Range = 10;
    hit100Range = 30;
    hit50Range = 40;

    radius = 55;
    radiusDiff = 0;
    radiusOfApproachCircle = this.radius * 3;

    currentKey = '';

    constructor(posX, posY, ar, fps) {
        this.position = {
            x: posX,
            y: posY
        };
        this.fps = fps;
        this.ar = ar / (this.fps / 60);

        this.hitAudio = new Audio();
        this.hitAudio.volume = 0.2;
        this.hitAudio.autoplay = false;
        this.hitAudio.src = 'data/audio/TongueMushroom.wav';
        // this.hitAudio.src = 'data/audio/hit.ogg';

        this.mainImg = new Image();
        this.mainImg.src = 'data/image/note/hitcircle.png';

        this.borderImg = new Image();
        this.borderImg.src = 'data/image/note/hitcircleoverlay.png';

        this.circleSelect = new Image();
        this.circleSelect.src = 'data/image/note/hitcircleselect.png';

        this.number = new Image();
        this.number.src = 'data/image/note/number1.png'

        this.colorNote = Math.round(getRandomNumber(0, 1))

        this.resultImageCount = 44;
        this.resultCount = 0;

        this.keyDownEvent();
    }

    static create(...args) {
        return new Note(...args)
    }

    draw({context}) {
        if (!this.noteStatus) {
            if (this.colorNote) {
                context.drawImage(this.borderImg, this.position.x - this.borderImg.width / 2, this.position.y - this.borderImg.height / 2);
                context.drawImage(this.mainImg, this.position.x - this.mainImg.width / 2, this.position.y - this.mainImg.height / 2);
                context.drawImage(this.number, this.position.x - this.number.width / 2, this.position.y - this.number.height / 2);
            } else {
                context.drawImage(this.mainImg, this.position.x - this.mainImg.width / 2, this.position.y - this.mainImg.height / 2);
                context.drawImage(this.circleSelect, this.position.x - this.circleSelect.width / 2, this.position.y - this.circleSelect.height / 2);
                context.drawImage(this.number, this.position.x - this.number.width / 2, this.position.y - this.number.height / 2);
            }

            this.#animatePart(context)
        }
    }

    keyDownEvent() {
        document.addEventListener('keydown', event => {
            this.currentKey = event.code;
        });
    }

    #animatePart(context) {
        if (this.radiusDiff > this.radiusOfApproachCircle - this.radius) {
            this.noteStatus = 'miss';
            this.ar = 0;
        }

        context.beginPath()
        context.strokeStyle = "rgba(255, 255, 255, 0.5)";
        context.lineWidth = 5;
        context.arc(this.position.x, this.position.y, this.radiusOfApproachCircle - this.radiusDiff, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        this.radiusDiff += this.ar;
    }

    getStatus(mousePos) {
        if ((this.position.x - mousePos.x) ** 2 + (this.position.y - mousePos.y) ** 2 <= this.radius ** 2 && !this.noteStatus) {

            let dRadius = this.radiusDiff
            const remainingPart = this.radiusOfApproachCircle - this.radius; // путь (= окружности радиусом 2 (this.radius * 2)), который может пройти ApproachCircle

            function range(hitRange1, hitRange2) {
                if (hitRange2) return (dRadius > remainingPart - hitRange1 && dRadius < remainingPart - hitRange2);
                else return (dRadius > remainingPart - hitRange1);
            }

            if (["KeyZ", "KeyX"].includes(this.currentKey)) {
                if (range(this.hit300Range, 0)) {
                    this.noteStatus = 'hit300';
                } else if (range(this.hit100Range, this.hit300Range)) {
                    this.noteStatus = 'hit100';
                } else if (range(this.hit50Range, this.hit100Range)) {
                    this.noteStatus = 'hit50';
                }
                this.currentKey = '';

                if (this.noteStatus) {
                    this.hitAudio.play();
                }
            }
        }

        return this.noteStatus;
    }

    resultAnimate({context}, type) {
        if (type !== 'hit300') {
            if (this.resultCount <= this.resultImageCount) {
                let result = new Image();

                let beginPartOfFileName = type;

                if (type === 'miss') {
                    beginPartOfFileName = 'hit0';
                }

                result.src = `data/image/note/${type}/${beginPartOfFileName}-${this.resultCount}.png`;
                context.drawImage(result, this.position.x - result.width / 2, this.position.y - result.height / 2);
            }
            this.resultCount++;

            if (this.resultCount > this.resultImageCount + this.fps / 2) {
                return true;
            }
        } else {
            return true;
        }
    }
}
