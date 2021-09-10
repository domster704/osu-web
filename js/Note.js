// import { getRandomNumber } from "./utility.js"

// export default class Note {
class Note {
    isHit = false;
    isMiss = false;

    radius = 55; // px
    radiusDiff = 0;
    radiusOfNarrowCircle = this.radius * 3;

    allImage = [];

    constructor(posX, posY, ar, fps) {
        this.position = {
            x: posX,
            y: posY
        };
        this.fps = fps;

        this.hitAudio = new Audio();
        this.hitAudio.volume = 0.2;
        this.hitAudio.src = '../data/audio/hit.ogg';

        // this.ar = this.fps / 60 < 0 ? ar / (this.fps / 60) : ar;
        this.ar = ar / (this.fps / 60);
       
        this.mainImg = new Image();
        this.mainImg.src = '../data/image/note/hitcircle.png';

        this.borderImg = new Image();
        this.borderImg.src = '../data/image/note/hitcircleoverlay.png';

        this.circleSelect = new Image();
        this.circleSelect.src = '../data/image/note/hitcircleselect.png';

        this.number = new Image();
        this.number.src = '../data/image/note/number1.png'

        this.colorNote = Math.round(getRandomNumber(0, 1))

        this.resultImageCount = 44;
        this.resultCount = 0;
    }

    draw({ context }) {
        // context.globalAlpha = this.imageAlpha;
        if (!this.isMiss && !this.isHit) {
            if (this.colorNote) {
                context.drawImage(this.borderImg, this.position.x - this.borderImg.width / 2, this.position.y - this.borderImg.height / 2);
                context.drawImage(this.mainImg, this.position.x - this.mainImg.width / 2, this.position.y - this.mainImg.height / 2);
                context.drawImage(this.number, this.position.x - this.number.width / 2, this.position.y - this.number.height / 2);
            } else {
                context.drawImage(this.mainImg, this.position.x - this.mainImg.width / 2, this.position.y - this.mainImg.height / 2);
                context.drawImage(this.circleSelect,  this.position.x - this.circleSelect.width / 2, this.position.y - this.circleSelect.height / 2);
                context.drawImage(this.number, this.position.x - this.number.width / 2, this.position.y - this.number.height / 2);
            }
    
            // if (this.isMiss && context.globalAlpha < 1) {
            //     context.drawImage(this.miss, this.position.x - this.miss.width / 2, this.position.y - this.miss.height / 2)
            // }
            // context.restore();
            this.#animatePart(context) 
        }
               
    }

    #animatePart(context) {
        if (this.radiusDiff > this.radiusOfNarrowCircle - this.radius) {
            this.isMiss = true;
            this.ar = 0;
        }

        context.beginPath()
        context.strokeStyle = "rgba(255, 255, 255, 0.5)";
        context.lineWidth = 5;
        context.arc(this.position.x, this.position.y, this.radiusOfNarrowCircle - this.radiusDiff, 0, 2 * Math.PI); // центральное кольцо
        context.closePath();
        context.stroke();

        this.radiusDiff += this.ar;
    }

    getStatus(mousePos) {
        if ((this.position.x - mousePos.x) ** 2 + (this.position.y - mousePos.y) ** 2 <= this.radius ** 2) {
            document.onkeydown = (event) => {
                if (["KeyZ", "KeyX"].includes(event.code)) {
                    if (this.radiusDiff > this.radiusOfNarrowCircle - this.radius - 30) {                        
                        this.isHit = true;
                    } else {
                        // this.isMiss = true;
                    }
                }
            }
        }

        if (this.isHit) {
            this.hitAudio.play();
            // this.hitAnimate();
            return 'hit';
        } else if (this.isMiss) {
            return 'miss';
        }
    }

    missAnimate({ context }) {
        if (this.imageAlpha - this.decreasedImageAlphaValue >= 0) {
            this.imageAlpha -= this.decreasedImageAlphaValue;
        }

        if (this.resultCount <= this.resultImageCount) {
            let miss = new Image();
            miss.src = `../data/image/note/miss/hit0-${this.resultCount}.png`;
            // miss.onload = () => {
                
            // }
            context.drawImage(miss, this.position.x - miss.width / 2, this.position.y - miss.height / 2);
                  
        }

        this.resultCount++;

        if (this.resultCount > this.resultImageCount + this.fps / 2) {
            return true;
        }

    }

    hitAnimate(type) {
        if (type) {
            if (this.imageAlpha - this.decreasedImageAlphaValue >= 0) {
                this.imageAlpha -= this.decreasedImageAlphaValue;
            } else {
                return true;
            }
            
        }
    }
}
