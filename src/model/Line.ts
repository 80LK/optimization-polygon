import Point from "./Point.js";
import Vector from "./Vector.js";

class Line {
	constructor(public readonly start: Point, public readonly end: Point) { }

	get length() {
		return this.start.distToPoint(this.end);
	}

	get vector() {
		return new Vector(this.start, this.end);
	}

	public distToPoint(point: Point) {
		const thisV = this.vector;
		// http://algolist.ru/maths/geom/distance/pointline.php
		const w = new Vector(this.start, point);
		const c1 = thisV.dot(w);
		if (c1 <= 0) return point.distToPoint(this.start);
		const c2 = thisV.dot(thisV);
		if (c2 <= c1) return point.distToPoint(this.end);
		const b = c1 / c2;

		const Pb = new Point(this.start.x + b * thisV.x, this.start.y + b * thisV.y);
		return point.distToPoint(Pb);
	}
}

export default Line;
