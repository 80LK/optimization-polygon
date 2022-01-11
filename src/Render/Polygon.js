class RenderPolygon {
	constructor(polygon) {
		this.polygon = polygon;
	}

	color = "#00ff00";
	get fill() {
		return this.color + "55";
	}

	render(ctx, scale = 1) {
		ctx.fillStyle = this.color;
		this.points.forEach((point) => point.render(ctx, scale, 1));

		ctx.strokeStyle = this.color;
		ctx.fillStyle = this.fill;
		ctx.beginPath();
		ctx.moveTo(0, 90 * scale);
		ctx.lineTo(0, 80 * scale);
		this.points.forEach((point) => {
			ctx.lineTo(point.x * scale, point.y * scale);
		});
		ctx.lineTo(160 * scale, 80 * scale);
		ctx.lineTo(160 * scale, 90 * scale);
		ctx.stroke();
		ctx.fill();
	}

	static render(polygon, ctx, scale = 1) {
		new RenderPolygon(polygon).render(ctx, scale);
	}
}

export default RenderPolygon;
