import Point from "../model/Point.js";
import Renderer from "./Renderer.js";

class RendererPoint extends Renderer {
	public color: string = "red";
	public size: number = 5;

	public constructor(private point: Point) {
		super();
	}

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.ellipse(this.point.x, this.point.y, this.size, this.size, 0, 0, 360);
		ctx.fill();
	}
}

export default RendererPoint;
