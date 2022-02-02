import Point from "./model/Point.js";
import Params from "./utils/Params.js";
import RendererPoint from "./view/RendererPoint.js";
import RendererView from "./view/RendererView.js";

class App {
	private params = new Params(location.href);

	public init() {
		const scale = this.params.getIntNotNaN("scale", 1);

		const canvas = document.createElement("canvas");
		canvas.width = this.params.getIntNotNaN("width", 160) * scale;
		canvas.height = this.params.getIntNotNaN("height", 90) * scale;
		document.body.appendChild(canvas);

		const ctx = canvas.getContext("2d")
		if (!ctx) throw new Error();
		const renderer = new RendererView(ctx, "black");
		renderer.scale(scale);

		renderer.addChild(new RendererPoint(new Point(80, 45)));
		renderer.render();

		renderer.removeAllChilds();
		renderer.addChild(new RendererPoint(new Point(90, 45)));
		renderer.render();
	}
}

export default App;
