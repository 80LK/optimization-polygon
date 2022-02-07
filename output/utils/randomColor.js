import random from "./random.js";
const colors = [
    // "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8000",
    "#FFFFFF"
];
export default function randomColor() {
    const i = random(0, colors.length);
    return colors[i];
}
console.log(randomColor);
