import Renderer from "./Renderer.js";
class RendererPoint extends Renderer {
    constructor(point) {
        super();
        this.point = point;
        this.color = "red";
        this.size = 1;
    }
    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.point.x, this.point.y, this.size, this.size, 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}
export default RendererPoint;
