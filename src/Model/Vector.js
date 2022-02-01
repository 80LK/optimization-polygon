import Point from "./Point.js";

class Vector {
	constructor(firstPoint, secondPoint) {
		this.first = firstPoint;
		this.second = secondPoint;
	}

	get x() {
		return this.second.x - this.first.x;
	}
	get y() {
		return this.second.y - this.first.y;
	}

	static dot(A, B) {
		return A.x * B.x + A.y * B.y;
	}

	distToPoint(point) {
		// http://algolist.ru/maths/geom/distance/pointline.php
		const w = new Vector(this.first, point);
		const c1 = Vector.dot(w, this);
		if (c1 <= 0) return point.distToPoint(this.first);
		const c2 = Vector.dot(this, this);
		if (c2 <= c1) return point.distToPoint(this.second);
		const b = c1 / c2;

		const Pb = new Point(this.first.x + b * this.x, this.first.y + b * this.y);
		return point.distToPoint(Pb);
	}
}

export default Vector;
