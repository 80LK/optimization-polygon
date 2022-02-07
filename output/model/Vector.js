import Point from "./Point.js";
class Vector {
    constructor(x_start, y_end) {
        if (typeof x_start === "number" && typeof y_end === "number") {
            this.x = x_start;
            this.y = y_end;
        }
        else if (x_start instanceof Point && y_end instanceof Point) {
            this.x = x_start.x - y_end.x;
            this.y = x_start.y - y_end.y;
        }
        else {
            throw new ReferenceError();
        }
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
}
export default Vector;
