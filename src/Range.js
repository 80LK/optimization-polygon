class Range {
	constructor(min, max) {
		this.min = min;
		this.max = max;
	}

	get length() {
		return Math.abs(this.max - this.min);
	}
}

export default Range;
