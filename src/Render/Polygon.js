
import RandomColor from "../RandomColor.js";
import RenderPoint from "./Point.js";

class RenderPolygon {
	constructor(polygon) {
		this.polygon = polygon;
		this.color = RandomColor.get(polygon);
	}


	get fill() {
		return this.color + "33";
	}

	render(ctx, scale = 1) {
		ctx.fillStyle = this.color;
		const points = this.polygon.points;
		const firstPoint = points[0];
		if (!firstPoint) return;

		points.forEach((point) => RenderPoint.render(point, ctx, scale, 1));

		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.fill;
		ctx.beginPath();

		ctx.moveTo(points[0].x * scale, points[0].y * scale)
		for (let i = 1, l = points.length; i < l; i++) {
			const point = points[i];
			ctx.lineTo(point.x * scale, point.y * scale);
		}
		ctx.closePath();

		ctx.stroke();
		ctx.fill();

		this.polygon.points.forEach(point => {
			ctx.fillStyle = "lime";
			RenderPoint.render(point, ctx, scale, .5)
		});


		// if (!this.rotates) return;
		ctx.fillStyle = "#000000";
		ctx.font = (3 * scale) + "px Arial";
		for (let i = 0, l = points.length; i < l; i++) {
			const d = this.polygon.rotates[i];
			if (!d) continue;
			const point = points[i];
			const prevPoint = points[i == 0 ? l - 1 : i - 1];

			const x = (prevPoint.x - point.x) / 2;
			const y = (prevPoint.y - point.y) / 2;

			ctx.fillText(d, (prevPoint.x - x) * scale, (prevPoint.y - y) * scale);
			console.log("D", d, prevPoint.x, x, prevPoint.x + x);
		}
	}

	static render(polygon, ctx, scale = 1) {
		new RenderPolygon(polygon).render(ctx, scale);
	}
}

export default RenderPolygon;
