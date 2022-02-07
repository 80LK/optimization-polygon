function random(min: number, max: number) {
	const l = max - min;
	return Math.floor(Math.random() * l) + min;
}

export default random;
