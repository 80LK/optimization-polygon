import Polygon from "../model/Polygon.js";
import Renderer from "./Renderer.js";

class RendererPolygon extends Renderer {
	constructor(private readonly polygon: Polygon) {
		super();
	}
	public color: string = "lime";
	public background: string = "#00FF0088";
	public widthBorder: number = 1;

	public render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		this.polygon.points.forEach((point, i) => {
			if (i == 0)
				ctx.moveTo(point.x, point.y);
			else
				ctx.lineTo(point.x, point.y);
			// (i == 0 ? ctx.moveTo : ctx.lineTo)(point.x, point.y)
		});
		ctx.closePath();

		ctx.fillStyle = this.background;
		ctx.fill();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.widthBorder;
		ctx.stroke();
	}

}

export default RendererPolygon;
