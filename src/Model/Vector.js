class Vector {
	constructor(firstPoint, secondPoint) {
		this.first = firstPoint;
		this.second = secondPoint;
	}

	get x() {
		return this.second.x - this.first.x
	}
	get y() {
		return this.second.y - this.first.y;
	}

	static dot(A, B) {
		return A.x * B.x + A.y * B.y;
	}

	distToPoint(point) {
		/** https://ru.stackoverflow.com/questions/721414 */

		// this = (P0, P1)
		// w0 = (P, P0)
		// w1 = (P, P1)
		const w0 = new Vector(point, this.first);
		const w1 = new Vector(point, this.second);
		if (Vector.dot(w0, this) <= 0) {
			return point.distToPoint(this.first);
		} else if (Vector.dot(w1, this) >= 0) {
			return point.distToPoint(this.second);
		} else {
			return ((this.first.y - this.second.y) * point.x + (this.first.x - this.second.x) * point.y + (this.first.x * this.second.y - this.second.x * this.first.y)) / this.first.distToPoint(this.second);
		}
	}
}

export default Vector;
