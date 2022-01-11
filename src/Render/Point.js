class RenderPoint {
	constructor(point) {
		this.point = point;
	}

	render(ctx, scale = 1, size = 2) {
		ctx.beginPath();
		const r = size * scale;
		ctx.ellipse(this.point.x * scale, this.point.y * scale, r, r, 0, 0, 360);
		ctx.fill();
	}

	static render(point, ctx, scale = 1, size = 2) {
		new RenderPoint(point).render(ctx, scale, size);
	}
}

export default RenderPoint;
