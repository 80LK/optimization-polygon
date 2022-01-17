import Range from "../Range.js";
import Point from "./Point.js";
import Vector from "./Vector.js";

Array.prototype.clone = function () {
	return this.map(e => e);
}

class Polygon {
	constructor(points = []) {
		this.points = [];
		this.rotates = []
		this.push(points);
	}

	get length() {
		return this.points.length;
	}


	push(points) {
		if (Array.isArray(points)) {
			this.points = this.points.concat(points);
		} else {
			this.points.push(points)
		}

		const _points = this.points;
		this.points = [];
		_points.forEach(e => {
			const i = this.points.findIndex(r => r.x == e.x && r.y == e.y);
			if (i == -1) this.points.push(e);
		});

		// this.convexHull();
		// this.graham();
		// this.jarvis();
		// this.QuickHull();

		// this.graham();
		this.test()

		return this;
	}

	test() {
		const l_points = this.points.length;
		if (l_points < 4) return;

		let points = this.points.clone();

		// https://ru.wikipedia.org/wiki/%D0%90%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC_%D0%93%D1%80%D1%8D%D1%85%D0%B5%D0%BC%D0%B0
		for (let i = 1; i < l_points; i++) {
			const p0 = points[0];
			const p = points[i];

			if ((p.y < p0.y) || (p.y == p0.y && p.x < p0.x))
				[points[i], points[0]] = [points[0], points[i]];
		}

		const p0 = points[0];
		console.log(p0, points);

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

		// this.points = [p0].concat(points);
		this.points = [p0, points[0]];


		const m = points.length;

		for (let i = 1; i < m; i++) {
			let j = this.points.length;
			while (this.rotate(this.points[j - 2], this.points[j - 1], points[i]) < 0) {
				this.points.pop();
				j -= 1;
			}
			this.rotates[this.points.push(points[i])] = this.rotate(this.points[j - 2], this.points[j - 1], points[i]);
		}
	}


	rotate(a, b, c) {
		// return a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y);
		return (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
		// return (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
	}
	sort(a, b) {
		const c = 1;
		const d = -c;
		if (a.x < b.x) {
			return c;
		} else if (a.x > b.x) {
			return d;
		} else if (a.y < b.y) {
			return c;
		} else if (a.y > b.y) {
			return d;
		}
		return 0;
	}

	convexHull() {
		const l_points = this.points.length;
		if (l_points < 4) return this.outerPoints = this.points;


		const __f = this.points[0].x;
		console.log("convexHull", __f, l_points)

		const points = this.points.sort(this.sort);
		console.log(points);

		const fPoint = points[0];
		const lPoint = points[l_points - 1];
		const up = [], down = [];
		up.push(fPoint);
		down.push(fPoint);

		for (let i = 1; i < l_points; i++) {
			const point = points[i];
			if (i == l_points - 1 || this.rotate(fPoint, point, lPoint) < 0) {
				let l_up = up.length;
				while (l_up >= 2 && !(this.rotate(up[l_up - 2], up[l_up - 1], point) < 0)) {
					up.pop();
					l_up--;
				}

				up.push(point);
			}
			if (i == l_points - 1 || this.rotate(fPoint, point, lPoint) > 0) {
				let l_down = down.length;
				while (l_down >= 2 && !(this.rotate(down[l_down - 2], down[l_down - 1], point) > 0)) {
					down.pop();
					l_down--;
				}

				up.push(point);
			}
		}

		this.outerPoints = [];
		for (let i = 0, l = up.length; i < l; ++i)
			this.outerPoints.push(up[i]);

		for (let i = down.length - 2; i > 0; --i)
			this.outerPoints.push(down[i]);

		console.group("end convexHull", __f);
		console.log(this.outerPoints.length)
		console.log(this.outerPoints)
		console.log(up)
		console.log(down)
		console.groupEnd();
	}

	graham() {
		const l_points = this.points.length;
		if (l_points < 4) return;
		const points = this.points.map(e => e);

		// https://www.pvsm.ru/algoritmy/8755
		for (let i = 1; i < l_points; i++)
			if (points[i].x < points[0].x)
				[points[i], points[0]] = [points[0], points[i]];


		for (let i = 2; i < l_points; i++) {
			let j = i;

			while (j > 1 && this.rotate(points[0], points[j - 1], points[j]) < 0) {
				[points[j], points[j - 1]] = [points[j - 1], points[j]];
				j -= 1;
			}
		}

		// this.points = points;
		this.points = [points[0], points[1]];
		for (let i = 2; i < l_points; i++) {
			while (this.rotate(this.points[this.points.length - 2], this.points[this.points.length - 1], points[i]) < 0)
				this.points.pop();
			this.points.push(points[i]);
		}
	}

	jarvis() {
		const l_points = this.points.length;
		if (l_points < 4) return;
		let points = this.points.map(e => e);

		for (let i = 1; i < l_points; i++)
			if (points[i].x < points[0].x)
				[points[i], points[0]] = [points[0], points[i]]

		this.points = [points[0]];
		points.shift();
		points.push(this.points[0]);

		while (true) {
			let right = 0;
			const l = points.length;
			const _l = this.points.length;

			for (let i = 1; i < l; i++)
				if (this.rotate(this.points[_l - 1], points[right], points[i]) < 0)
					break;

			if (points[right] == this.points[0]) break;
			else {
				this.points.push(points[right]);
				points = points.filter(point => point != points[right])
			}
		}
	}


	QuickHull() {

	}

	havePoint(point) {
		const count = this.points.length;
		if (count == 1)
			return this.points[0].distToPoint(point) == 0;

		if (count == 2) {
			const d = this.points[0].distToPoint(this.points[1]);
			const d1 = point.distToPoint(this.points[0]);
			const d2 = point.distToPoint(this.points[1]);

			return d1 + d2 == d;
		}

		let result = false;
		let j = count - 1;
		for (let i = 0; i < count; i++) {
			if ((this.points[i].y < point.y && this.points[j].y >= point.y || this.points[j].y < point.y && this.points[i].y >= point.y) &&
				(this.points[i].x + (point.y - this.points[i].y) / (this.points[j].y - this.points[i].y) * (this.points[j].x - this.points[i].x) < point.x))
				result = !result;
			j = i;
		}
		return result;

		let q_patt = [[0, 1], [3, 2]];

		let pred = this.points[count - 1].clone;
		pred.x -= point.x;
		pred.y -= point.y;

		let pred_q = q_patt[pred.y < 0 ? 1 : 0][pred.x < 0 ? 1 : 0];

		let w = 0;

		for (let i = 0; i < count; i++) {
			const cur_p = this.points[i].clone();

			cur_p.x -= point.x;
			cur_p.y -= point.y;

			let q = q_patt[cur_p.y < 0 ? 1 : 0][cur_p.x < 0 ? 1 : 0];
			switch (q - pred_q) {
				case -3: ++w; break;
				case 3: --w; break;
				case -2: if (pred.x * cur_p.y >= pred.y * cur_p.x) ++w; break;
				case 2: if (!(pred.x * cur_p.y >= pred.y * cur_p.x)) --w; break;
			}
			pred = cur_p;
			pred_q = q;
		}

		return w != 0;
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

				const v = new Vector(peerPoint, currentPoint);
				const _dist = v.distToPoint(point);
				if (dist > _dist) dist = _dist;
			}
			return dist;

			// let dist = Infinity;
			// const l = this.points.length;

			// for (let i = 0; i < l; i++) {
			// 	const peerPoint = this.points[(i == 0 ? l : i) - 1];
			// 	const currentPoint = this.points[i];

			// 	/** https://ru.stackoverflow.com/questions/721414 */
			// 	const dBAx = currentPoint.x - peerPoint.x;
			// 	const dBAy = currentPoint.y - peerPoint.y;

			// 	const t = (() => {
			// 		const t = ((point.x - peerPoint.x) * dBAx + (point.y - peerPoint.y) * dBAy) / (Math.pow(dBAx, 2) + Math.pow(dBAy, 2));
			// 		if (t < 0) return 0;
			// 		if (t > 1) return 1;
			// 		return t;
			// 	})();

			// 	const distToPoint = Math.sqrt(
			// 		Math.pow(peerPoint.x - point.x + dBAx * t, 2) +
			// 		Math.pow(peerPoint.y - point.y + dBAy * t, 2)
			// 	);

			// 	if (dist > distToPoint) dist = distToPoint;
			// }
			// return dist;
		}
	}
}

export default Polygon;
