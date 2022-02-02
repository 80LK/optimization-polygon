function random(min: number, max: number) {
	const l = max - min;
	return Math.round(Math.random() * l) + min;
}

export default random;
