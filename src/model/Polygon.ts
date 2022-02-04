import Line from "./Line.js";
import Point from "./Point.js";
import Vector from "./Vector.js";

class Polygon {
	private _points: Point[] = [];
	public get points() {
		return [...this._points];
	}
	public constructor(points?: Point[]) {
		if (points)
			this.push(points);
	}

	public get length() {
		return this._points.length;
	}

	public push(points: Point | Point[]) {
		if (Array.isArray(points)) {
			this._points = this._points.concat(points);
		} else if (points) {
			this._points.push(points)
		} else {
			throw new ReferenceError("Point is null");
		}
		this.graham()
	}

	public havePoint(point: Point): boolean {
		const l = this._points.length;
		if (l == 3) {
			const a = (this._points[0].x - point.x) * (this._points[1].y - this._points[0].y) - (this._points[1].x - this._points[0].x) * (this._points[0].y - point.y);
			const b = (this._points[1].x - point.x) * (this._points[2].y - this._points[1].y) - (this._points[2].x - this._points[1].x) * (this._points[1].y - point.y);
			const c = (this._points[2].x - point.x) * (this._points[0].y - this._points[2].y) - (this._points[0].x - this._points[2].x) * (this._points[2].y - point.y);

			return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)
		}
		// https://ru.stackoverflow.com/questions/464787
		let flag = false;
		let j = l - 1;
		for (let i = 0; i < l; i++) {
			if (
				(this._points[i].y < point.y && this._points[j].y >= point.y || this._points[j].y < point.y && this._points[i].y >= point.y) ||
				(this._points[i].x + (point.y - this._points[i].y) / (this._points[j].y - this._points[i].y) * (this._points[j].x - this._points[i].x) < point.x)
			)
				flag = !flag;
			j = i;
		}
		return flag;
	}

	public distToPoint(point: Point): number {
		const l = this._points.length;
		if (l == 0) {
			throw new RangeError("No points in polygon");
		} else if (l == 1) {
			return this._points[0].distToPoint(point);
		} else {
			if (l >= 3 && this.havePoint(point))
				return 0;

			let dist = Infinity;
			for (let i = 0; i < l; i++) {
				const peerPoint = this._points[(i == 0 ? l : i) - 1];
				const currentPoint = this._points[i];
				try {
					const line = new Line(peerPoint, currentPoint);
					const _dist = line.distToPoint(point);
					if (dist > _dist) dist = _dist;
				} catch (e) {
					console.log(peerPoint, currentPoint, (i == 0 ? l : i) - 1, this._points)
					throw e;
				}
			}
			return dist;
		}
	}

	private rotate(a: Point, b: Point, c: Point) {
		return (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
	}
	public graham() {
		let points = this.points;

		const l_points = points.length;
		if (l_points < 4) return;

		// https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%93%D1%80%D1%8D%D1%85%D0%B5%D0%BC%D0%B0
		for (let i = 1; i < l_points; i++) {
			const p0 = points[0];
			const p = points[i];

			if ((p.y < p0.y) || (p.y == p0.y && p.x < p0.x))
				[points[i], points[0]] = [points[0], points[i]];
		}

		const p0 = points[0];

		points.shift();
		points.sort((a, b) => {
			const aA = p0.polarAngle(a),
				aB = p0.polarAngle(b),
				less = -1, large = 1;

			if (aA < aB) return less;
			if (aA > aB) return large;

			const dA = p0.distToPoint(a),
				dB = p0.distToPoint(a);

			if (dA < dB) return less;
			if (dA > dB) return large;

			return 0;
		});

		const l = points.length;

		this._points = [p0, points[0]];

		for (let i = 1; i < l; i++) {
			let j = this._points.length;
			while (this.rotate(this._points[j - 2], this._points[j - 1], points[i]) < 0) {
				this._points.pop();
				j -= 1;
			}
			this._points.push(points[i])
		}
	}
}

export default Polygon;
