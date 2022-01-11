import random from "../random.js";
import Range from "../Range.js";

class Point {
	x = 0;
	y = 0;

	constructor(x = 0, y = x) {
		this.x = x;
		this.y = y;
	}

	static generatorPoints(rangeX, deltaX = new Range(-3, 3), deltaY = new Range(0, 10)) {
		return () => this.generatePoints(rangeX, deltaX, deltaY);
	}

	static generatePoints(rangeX, deltaX = new Range(-3, 3), deltaY = new Range(0, 10)) {
		const arr = [];
		for (let i = rangeX.min + Math.round(random(deltaX)); i < rangeX.max; i += Math.round(random(new Range(4, 14)))) {
			const y = Math.round(random(deltaY));
			arr.push(new Point(i, y));
		}

		return arr;
	}

	distToPoint(point) {
		const x = this.x - point.x;
		const y = this.y - point.y;
		return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
	}
}

export default Point;
