import RendererGroup from "./RendererGroup.js";
class RendererView extends RendererGroup {
    // private readonly ctx: CanvasRenderingContext2D;
    constructor(ctx, background = "transparent") {
        super();
        this.ctx = ctx;
        this.background = background;
        this._scale = 1;
    }
    scale(scale = 1) {
        const dScale = scale / this._scale;
        this.ctx.scale(dScale, dScale);
        this._scale = scale;
    }
    clear(x = 0, y = 0, width = this.ctx.canvas.width, height = this.ctx.canvas.height) {
        const style = this.ctx.fillStyle;
        this.ctx.clearRect(x, y, width, height);
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(x, y, width, height);
        this.ctx.fillStyle = style;
    }
    render() {
        this.clear();
        super.render(this.ctx);
    }
}
export default RendererView;
