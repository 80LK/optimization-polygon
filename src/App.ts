import Point from "./model/Point.js";
import Params from "./utils/Params.js";
import RendererPoint from "./view/RendererPoint.js";
import RendererView from "./view/RendererView.js";

class App {
	private params = new Params(location.href);

	private screens = [[new Point(10, 10)], [new Point(50, 50), new Point(60, 40)]];
	private renderer: RendererView;
	private root: HTMLElement;
	private $currentPage: Text;

	constructor() {
		const scale = this.params.getIntNotNaN("scale", 1);
		this.root = document.createElement("div");

		const canvasDiv = document.createElement("div");
		const canvas = document.createElement("canvas");
		canvas.width = this.params.getIntNotNaN("width", 160) * scale;
		canvas.height = this.params.getIntNotNaN("height", 90) * scale;
		canvasDiv.appendChild(canvas)
		this.root.appendChild(canvasDiv);

		const ctx = canvas.getContext("2d")
		if (!ctx) throw new Error();
		this.renderer = new RendererView(ctx, "black");
		this.renderer.scale(scale);

		const btnsPanel = document.createElement("div");
		{
			const prevBtn = document.createElement("button");
			prevBtn.textContent = "Prev page";
			prevBtn.onclick = () => this.prevScreen();
			btnsPanel.appendChild(prevBtn);
		}
		{
			this.$currentPage = new Text(" 0/0 ");
			btnsPanel.appendChild(this.$currentPage);
		}
		{
			const nextBtn = document.createElement("button");
			nextBtn.textContent = "Next page";
			nextBtn.onclick = () => this.nextScreen();
			btnsPanel.appendChild(nextBtn);
		}
		this.root.appendChild(btnsPanel);
	}

	public attach(query: string = "body") {
		const root = document.querySelector(query);
		if (!root) throw new ReferenceError();
		root.appendChild(this.root);

		this.setScreen(0);
	}

	private currentScreen = 0;
	private setScreen(screen: number) {
		if (screen < 0) throw new RangeError();
		if (screen >= this.screens.length) throw new RangeError();

		this.currentScreen = screen;
		this.$currentPage.textContent = ` ${screen + 1}/${this.screens.length} `;
		this.renderer.removeAllChilds();
		this.screens[screen].forEach(point => this.renderer.addChild(new RendererPoint(point)));
		this.renderer.render();
	}
	private nextScreen() {
		try { this.setScreen(this.currentScreen + 1); } catch (e) { }
	}

	private prevScreen() {
		try { this.setScreen(this.currentScreen - 1); } catch (e) { }
	}

}

export default App;
