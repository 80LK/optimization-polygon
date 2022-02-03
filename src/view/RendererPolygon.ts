import Polygon from "../model/Polygon.js";
import Renderer from "./Renderer.js";
import RendererPoint from "./RendererPoint.js";

class RendererPolygon extends Renderer {
	constructor(private readonly polygon: Polygon) {
		super();
	}
	public color: string = "lime";
	public background: string = "#00FF0088";
	public widthBorder: number = 1;

	public colorPoint: string = "lime";
	public sizePoint: number = 2;


	public render(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		const points = this.polygon.points;
		const l_points = points.length;
		if (l_points > 1)
			points.forEach((point, i) => {
				if (i == 0)
					ctx.moveTo(point.x, point.y);
				else
					ctx.lineTo(point.x, point.y);
				// (i == 0 ? ctx.moveTo : ctx.lineTo)(point.x, point.y)
			});
		ctx.closePath();

		if (l_points > 2) {
			ctx.fillStyle = this.background;
			ctx.fill();
		}
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.widthBorder;
		ctx.stroke();

		points.forEach(point => {
			const renderer = new RendererPoint(point);
			renderer.color = this.colorPoint;
			renderer.size = this.sizePoint;
			renderer.render(ctx);
		})
	}

}

export default RendererPolygon;
