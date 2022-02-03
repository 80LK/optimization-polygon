import Renderer from "./Renderer.js";
import RendererGroup from "./RendererGroup.js";

class RendererView extends RendererGroup {
	// private readonly ctx: CanvasRenderingContext2D;
	public constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly background: string = "transparent"
	) {
		super();
	}

	private _scale: number = 1;
	public scale(scale: number = 1) {
		const dScale = scale / this._scale;
		this.ctx.scale(dScale, dScale);
		this._scale = scale;
	}

	public clear(x: number = 0, y: number = 0, width: number = this.ctx.canvas.width, height: number = this.ctx.canvas.height) {
		const style = this.ctx.fillStyle;

		this.ctx.clearRect(x, y, width, height);
		this.ctx.fillStyle = this.background;
		this.ctx.fillRect(x, y, width, height);
		this.ctx.fillStyle = style;
	}

	public render(): void {
		this.clear();
		super.render(this.ctx)
	}
}

export default RendererView;
