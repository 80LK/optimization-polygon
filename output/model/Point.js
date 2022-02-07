class Point {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    static get zero() {
        return new Point(0, 0);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    distToPoint(point) {
        const x = point.x - this.x;
        const y = point.y - this.y;
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
    clone() {
        return new Point(this.x, this.y);
    }
    plus(n) {
        if (n instanceof Point) {
            this._x += n.x;
            this._y += n.y;
        }
        else {
            this._x += n;
            this._y += n;
        }
    }
    minus(n) {
        if (n instanceof Point) {
            this._x -= n.x;
            this._y -= n.y;
        }
        else {
            this._x -= n;
            this._y -= n;
        }
    }
    multiply(n) {
        this._x *= n;
        this._y *= n;
    }
    divide(n) {
        this._x /= n;
        this._y /= n;
    }
    polarAngle(point) {
        let res = Math.atan2(point.y - this.y, point.x - this.x);
        if (res < 0)
            res += 2 * Math.PI;
        return res;
    }
}
export default Point;
