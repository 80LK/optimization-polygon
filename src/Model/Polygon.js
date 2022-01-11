import Point from "./Point.js";

class Polygon {
	constructor(points = []) {
		this.points = points;
	}


	push(points) {
		this.points = this.points.concat(points)
		this.points = this.points.sort((a, b) => {
			if (a.x < b.x) return -1;
			if (a.x > b.x) return 1;
			return 0;
		})
		this.points = this.points.reduce((r, e, i, a) => {
			if (!r.length) r.length = a.length - 1;

			if (r.point.x == e.x) {
				if (r.point.y > e.y)
					r.point = e;
			} else {
				if (r.point.x != 0)
					r.points.push(r.point);
				r.point = e;
			}

			if (r.length == i)
				r.points.push(e);

			return r;
		}, { point: new Point(0, Infinity), points: [] }).points;

		return this;
	}
}

export default Polygon;
