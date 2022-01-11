import Point from "./Point.js";

class Polygon {
	constructor(points = []) {
		this.points = points;
	}


	push(points) {
		if (Array.isArray(points)) {
			this.points = this.points.concat(points);
		} else {
			this.points.push(points)
		}

		return this;
	}

	distToPoint(point) {
		if (this.points.length == 0) {
			throw new RangeError("No points in polygon");
		} else if (this.points.length == 1) {
			return this.points[0].distToPoint(point);
		} else {
			let dist = Infinity;
			const l = this.points.length;

			for (let i = 0; i < l; i++) {
				const peerPoint = this.points[(i == 0 ? l : i) - 1];
				const currentPoint = this.points[i];

				/** https://ru.stackoverflow.com/questions/721414 */
				const dBAx = currentPoint.x - peerPoint.x;
				const dBAy = currentPoint.y - peerPoint.y;

				const t = (() => {
					const t = ((point.x - peerPoint.x) * dBAx + (point.y - peerPoint.y) * dBAy) / (Math.pow(dBAx, 2) + Math.pow(dBAy, 2));
					if (t < 0) return 0;
					if (t > 1) return 1;
					return t;
				})();

				const distToPoint = Math.sqrt(
					Math.pow(peerPoint.x - point.x + dBAx * t, 2) +
					Math.pow(peerPoint.y - point.y + dBAy * t, 2)
				);

				if (dist > distToPoint) dist = distToPoint;
			}
			return dist;
		}
	}
}

export default Polygon;
