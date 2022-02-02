import Line from "./Line.js";
import Point from "./Point.js";

class Polygon {
	private _points: Point[] = [];
	public get points() {
		return [...this._points];
	}
	public constructor(points: Point[] = []) {
		this.push(points);
	}

	public get length() {
		return this._points.length;
	}

	public push(points: Point | Point[]) {
		if (Array.isArray(points)) {
			this._points = this._points.concat(points);
		} else {
			this._points.push(points)
		}
	}

	public havePoint(point: Point): boolean {
		let flag = false;

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

				const line = new Line(peerPoint, currentPoint);
				const _dist = line.distToPoint(point);
				if (dist > _dist) dist = _dist;
			}
			return dist;
		}
	}
}

export default Polygon;
