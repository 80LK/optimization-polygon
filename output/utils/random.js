function random(min, max) {
    const l = max - min;
    return Math.floor(Math.random() * l) + min;
}
export default random;
