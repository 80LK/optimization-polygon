import GeneratorPoints from "./GeneratorPoints.js";
import Point from "./model/Point.js";
import Params from "./utils/Params.js";
import RendererPoint from "./view/RendererPoint.js";
import RendererView from "./view/RendererView.js";

class App {
	private params = new Params(location.href);

	private screens: Point[][];
	private renderer: RendererView;
	private root: HTMLElement;
	private $currentPage: Text;

	private readonly width: number;
	private readonly height: number;

	constructor() {
		const scale = this.params.getIntNotNaN("scale", 1);
		this.root = document.createElement("div");

		const canvasDiv = document.createElement("div");
		const canvas = document.createElement("canvas");
		canvas.width = (this.width = this.params.getIntNotNaN("width", 160)) * scale;
		canvas.height = (this.height = this.params.getIntNotNaN("height", 90)) * scale;
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

		const generator = new GeneratorPoints(
			new Point(10, 10),
			new Point(this.width - 10, this.height - 10)
		);

		this.screens = generator.generatePages(10, 10);

		this.onKeydown = this.onKeydown.bind(this);
	}

	public attach(query: string = "body") {
		const root = document.querySelector(query);
		if (!root) throw new ReferenceError();
		root.appendChild(this.root);

		this.setScreen(0);

		window.addEventListener("keydown", this.onKeydown)
	}

	private onKeydown(e: KeyboardEvent) {
		switch (e.code) {
			case "ArrowUp":
			case "Home":
			case "KeyW":
				this.setScreen(0)
				break;

			case "ArrowDown":
			case "End":
			case "KeyS":
				this.setScreen(this.screens.length - 1)
				break;
			case "ArrowRight":
			case "PageUp":
			case "KeyD":
				this.nextScreen()
				break;
			case "ArrowLeft":
			case "PageDown":
			case "KeyA":
				this.prevScreen()
				break;
			default:
				console.log(e.code);
				break;
		}
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
