import GameObject from "./GameObject.js";

export default class Slider extends GameObject {
    // radius = 55;

    static create(...args) {
        return new Slider(...args)
    }

    constructor(x1, y1, x2, y2, fps, mapParams) {
        super(x1, y1,  fps, mapParams);
        this.position2 = {
            x: x2,
            y: y2,
        }
        let pos1 = this.position;
        let pos2 = this.position2;
        this.trigonometricExpression = 1;

        if (pos2.x >= pos1.x) {
            if (pos2.y >= pos1.y) {
                this.trigonometricExpression = (pos1.x - pos2.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
            } else {
                this.trigonometricExpression = (pos2.x - pos1.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
            }
        } else if (pos2.x <= pos1.x) {
            if (pos2.y >= pos1.y) {
                this.trigonometricExpression = (pos1.x - pos2.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
            } else {
                this.trigonometricExpression = (pos2.x - pos1.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
            }
        }

        this.funcX = Math.cos(this.trigonometricExpression);
        this.funcY = Math.sin(this.trigonometricExpression);
    }

    drawSlider(app, combo) {
        this.draw(app, combo, (context) => {
            if (!this.objectStatus) {
                // let pos1 = this.position;
                // let pos2 = this.position2;
                // let trigonometricExpression = 1;
                //
                // let funcX, funcY;
                // let key = false;
                //
                // if (pos2.x <= pos1.x && pos2.y < pos1.y) {
                //     key ? console.log(1) : null;
                //     trigonometricExpression = (pos2.x - pos1.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
                // } else if (pos2.x >= pos1.x) {
                //     key ? console.log(2) : null;
                //     if (pos2.y > pos1.y) {
                //         trigonometricExpression = (pos1.x - pos2.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
                //     } else {
                //         trigonometricExpression = (pos2.x - pos1.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
                //     }
                // } else if (pos2.x <= pos1.x && pos2.y >= pos1.y) {
                //     key ? console.log(3) : null;
                //     trigonometricExpression = (pos1.x - pos2.x) / Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
                // }
                //
                // funcX = Math.cos(trigonometricExpression);
                // funcY = Math.sin(trigonometricExpression);

                // context.beginPath();
                // context.fillStyle = this.colorObject;
                // context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                // context.fill();
                // context.stroke();

                let posX1 = this.position.x;
                let posY1 = this.position.y;
                let posX2 = this.position2.x;
                let posY2 = this.position2.y;

                context.beginPath();
                context.strokeStyle = 'white';
                context.lineCap = 'round';
                context.bezierCurveTo(posX1, posY1,(posX1 + posX2) / 2, (posY1 + posY2) / 2, posX2, posY2,);

                // context.beginPath();
                // context.strokeStyle = 'white';
                // context.lineCap = 'round';
                // context.moveTo(this.position.x + this.radius * this.funcX, this.position.y + this.radius * this.funcY);
                // context.lineTo(this.position2.x + this.radius * this.funcX, this.position2.y + this.radius * this.funcY);
                // context.stroke();

                context.beginPath();
                context.moveTo(this.position.x - this.radius * this.funcX, this.position.y - this.radius * this.funcY);
                context.lineTo(this.position2.x - this.radius * this.funcX, this.position2.y - this.radius * this.funcY);
                context.stroke();

                context.beginPath();
                context.fillStyle = this.colorObject;
                context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
                context.fill();
                context.stroke();

                context.beginPath();
                context.fillStyle = this.colorObject;
                context.arc(this.position2.x, this.position2.y, this.radius, 0, 2 * Math.PI);
                context.fill();
                context.stroke();
            }
        });
    }

    // #animatePart(context) {
    //     if (this.radiusDiff > this.radiusOfApproachCircle - this.radius) {
    //         this.ar = 0;
    //     }
    //     if (this.radiusDiff > this.radiusOfApproachCircle - this.radius - 5) {
    //         this.noteStatus = 'miss';
    //     }
    //
    //     context.beginPath()
    //     context.strokeStyle = "rgba(255, 255, 255, 0.5)";
    //     context.lineWidth = 5;
    //     context.arc(this.position.x, this.position.y, this.radiusOfApproachCircle - this.radiusDiff, 0, 2 * Math.PI);
    //     context.closePath();
    //     context.stroke();
    //
    //     this.radiusDiff += this.ar;
    // }

    getStatus(mousePos, app) {
        if ((this.position.x - mousePos.x) ** 2 + (this.position.y - mousePos.y) ** 2 <= this.radius ** 2 && !this.noteStatus) {

            let dRadius = this.radiusDiff
            const remainingPart = this.radiusOfApproachCircle - this.radius; // путь (= окружности радиусом 2 (this.radius * 2)), который может пройти ApproachCircle

            function range(hitRange1, hitRange2) {
                if (hitRange2) return (dRadius > remainingPart - hitRange1 && dRadius < remainingPart - hitRange2);
                else return (dRadius > remainingPart - hitRange1);
            }

            if (Object.values(app.keyControl.keys).includes(true)) {
                if (range(this.hit300Range[0], this.hit300Range[1])) {
                    this.noteStatus = 'hit300';
                } else if (range(this.hit100Range[0], this.hit100Range[1])) {
                    this.noteStatus = 'hit100';
                } else if (range(this.hit50Range[0], this.hit50Range[1])) {
                    this.noteStatus = 'hit50';
                }

                if (this.noteStatus) {
                    this.hitAudio.play();
                }
            }
        }
        return this.noteStatus;
    }
}