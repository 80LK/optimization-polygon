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

	public _distToPoint(point: Point) {
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

	public distToPoint(point: Point) {
		//http://pers.narod.ru/algorithms/pas_dist_from_point_to_line.html
		const r1 = point.distToPoint(this.start);
		const r2 = point.distToPoint(this.end);
		const r12 = this.start.distToPoint(this.end);
		const z = Point.zero;
		if (r1 >= z.distToPoint(new Point(r2, r12))) {
			return r2;
		} else if (r2 >= z.distToPoint(new Point(r1, r12))) {
			return r1;
		} else {
			let a = this.end.y - this.start.y,
				b = this.start.x - this.end.x,
				c = -this.start.x * (this.end.y - this.start.y) + this.start.y * (this.end.x - this.start.x);

			const t = z.distToPoint(new Point(a, b));

			if (c > 0) {
				a = -a; b = -b; c = -c;
			}
			return Math.abs(a * point.x + b * point.y + c) / t;
		}
	}
}

export default Line;
