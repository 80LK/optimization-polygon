class Range {
	constructor(min, max) {
		this.min = min;
		this.max = max;
	}

	get length() {
		return Math.abs(this.max - this.min) + 1;
	}
}

export default Range;
