import Renderer from "./Renderer.js";

class RendererView {
	private childs: Set<Renderer> = new Set();
	// private readonly ctx: CanvasRenderingContext2D;
	public constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly background: string = "transparent"
	) { }

	public addChild(element: Renderer) {
		this.childs.add(element);
	}
	public removeChild(element: Renderer) {
		this.childs.delete(element);
	}
	public removeAllChilds() {
		this.childs.clear();
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

	public render() {
		this.clear();
		this.childs.forEach(child => child.render(this.ctx));
	}
}

export default RendererView;
