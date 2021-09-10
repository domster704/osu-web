// import { context, context2, context3, canvas, canvas2, canvas3 } from "./Canvas.js";

// export function clear() {
//     /*
//         Очищать только место, где находится нота/ноты,
//         Очищать предыдущие позиции мыщи
//     */
   
//     context2.clearRect(0, 0, canvas2.width, canvas2.height);
//     context.clearRect(0, 0, canvas.width, canvas.height);
// }

// export function getRandomNumber(min, max) {
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}