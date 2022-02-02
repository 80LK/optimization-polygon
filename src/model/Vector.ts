import Point from "./Point.js";

class Vector {
	constructor(start: Point, end: Point);
	constructor(x: number, y: number);
	constructor(x_start: number | Point, y_end: number | Point) {
		if (typeof x_start === "number" && typeof y_end === "number") {
			this.x = x_start;
			this.y = y_end;
		} else if (x_start instanceof Point && y_end instanceof Point) {
			this.x = x_start.x - y_end.x;
			this.y = x_start.y - y_end.y;
		} else {
			throw new ReferenceError();
		}
	}

	public readonly x: number;
	public readonly y: number;

	public dot(vector: Vector): number {
		return this.x * vector.x + this.y * vector.y;
	}
}

export default Vector;
