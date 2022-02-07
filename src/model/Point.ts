class Point {
	static get zero() {
		return new Point(0, 0);
	}

	constructor(private _x: number, private _y: number) { }

	public get x() {
		return this._x;
	}
	public get y() {
		return this._y;
	}

	public distToPoint(point: Point): number {
		const x = point.x - this.x;
		const y = point.y - this.y;
		return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
	}

	public clone(): Point {
		return new Point(this.x, this.y);
	}

	public plus(n: number | Point) {
		if (n instanceof Point) {
			this._x += n.x;
			this._y += n.y;
		} else {
			this._x += n;
			this._y += n;
		}
	}
	public minus(n: number | Point) {
		if (n instanceof Point) {
			this._x -= n.x;
			this._y -= n.y;
		} else {
			this._x -= n;
			this._y -= n;
		}
	}
	public multiply(n: number) {
		this._x *= n;
		this._y *= n;
	}
	public divide(n: number) {
		this._x /= n;
		this._y /= n;
	}

	public polarAngle(point: Point) {
		let res = Math.atan2(point.y - this.y, point.x - this.x);
		if (res < 0) res += 2 * Math.PI;
		return res;
	}
}


export default Point;
