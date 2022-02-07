import GeneratorPoints from "./GeneratorPoints.js";
import Point from "./model/Point.js";
import Params from "./utils/Params.js";
import RendererPoint from "./view/RendererPoint.js";
import RendererView from "./view/RendererView.js";
import "./utils/String.ext.js";
import SetPageEvent from "./SetPageEvent.js";
import RendererGroup from "./view/RendererGroup.js";
import PolygonBuilder from "./PolygonBuilder.js";

class App extends EventTarget {
	private params = new Params(location.href);

	private screens: Point[][];
	private renderer: RendererView;
	private root: HTMLElement;
	private $currentPage: HTMLSpanElement;

	private rendererPoints = new RendererGroup();
	private polygonBuilder: PolygonBuilder;
	private buildedScreen = -1;
	private buildScreen(screen: number) {
		if (this.buildedScreen >= screen) return;

		for (let i = this.buildedScreen + 1; i <= screen; i++) {
			this.polygonBuilder.push(this.getScreen(i));
		}
		this.buildedScreen = screen;
	}

	public readonly width: number;
	public readonly height: number;
	public readonly scale: number;
	public readonly pages: number;
	public readonly points: number;
	public readonly dist: number;

	constructor() {
		super();
		this.scale = this.params.getIntNotNaN("scale", 3);
		this.pages = this.params.getIntNotNaN("pages", 10);
		this.points = this.params.getIntNotNaN("points", 10);
		this.width = this.params.getIntNotNaN("width", 160);
		this.height = this.params.getIntNotNaN("height", 90);
		this.dist = this.params.getIntNotNaN("dist", 10);

		this.polygonBuilder = new PolygonBuilder(this.dist);

		this.root = document.createElement("div");
		this.root.style.textAlign = "center";

		const canvasDiv = document.createElement("div");
		const canvas = document.createElement("canvas");
		canvas.width = this.width * this.scale;
		canvas.height = this.height * this.scale;
		canvasDiv.appendChild(canvas)
		this.root.appendChild(canvasDiv);

		const ctx = canvas.getContext("2d")
		if (!ctx) throw new Error();
		this.renderer = new RendererView(ctx, "black");
		this.renderer.scale(this.scale);
		this.renderer.add(this.polygonBuilder.RendererPolygon);
		this.renderer.add(this.rendererPoints);

		{ //Btns
			const btnsPanel = document.createElement("div");

			{
				const $btn = document.createElement("button");
				$btn.textContent = "|<<";
				$btn.style.fontFamily = "monospace";
				$btn.onclick = () => this.setScreen(0);
				btnsPanel.appendChild($btn);
			}
			btnsPanel.appendChild(new Text(" "));
			{
				const prevBtn = document.createElement("button");
				prevBtn.textContent = "<—";
				prevBtn.style.fontFamily = "monospace";
				prevBtn.onclick = () => this.prevScreen();
				btnsPanel.appendChild(prevBtn);
			}
			btnsPanel.appendChild(new Text(" "));
			{
				this.$currentPage = document.createElement("span");
				this.$currentPage.innerText = "0/0";
				this.$currentPage.style.fontFamily = "monospace";
				btnsPanel.appendChild(this.$currentPage);
			}
			btnsPanel.appendChild(new Text(" "));
			{
				const nextBtn = document.createElement("button");
				nextBtn.textContent = "—>";
				nextBtn.style.fontFamily = "monospace";
				nextBtn.onclick = () => this.nextScreen();
				btnsPanel.appendChild(nextBtn);
			}
			btnsPanel.appendChild(new Text(" "));
			{
				const $btn = document.createElement("button");
				$btn.textContent = ">>|";
				$btn.style.fontFamily = "monospace";
				$btn.onclick = () => this.setScreen(this.screens.length - 1);
				btnsPanel.appendChild($btn);
			}
			this.root.appendChild(btnsPanel);
		}

		const generator = new GeneratorPoints(
			new Point(10, this.height - 30),
			new Point(this.width - 10, this.height - 10)
		);

		this.screens = generator.generatePages(
			this.pages,
			this.points
		);
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

	private _currentScreen = 0;
	public get currrentScreenIndex() {
		return this._currentScreen;
	}
	public get currentScreen() {
		return this.screens[this._currentScreen];
	}

	public getScreen(index: number) {
		if (index < 0) throw new RangeError();
		if (index >= this.screens.length) throw new RangeError();
		return this.screens[index];
	}
	private setScreen(screen: number) {
		if (screen < 0) throw new RangeError();
		if (screen >= this.screens.length) throw new RangeError();
		this.buildScreen(screen);

		this._currentScreen = screen;
		this.$currentPage.innerText = `${(screen + 1).toString().padLeft(this.screens.length.toString().length, "0")}/${this.screens.length}`;
		this.dispatchEvent(new SetPageEvent(screen))


		this.rendererPoints.removeAll();
		this.screens[screen].forEach(point => this.rendererPoints.add(new RendererPoint(point)));
		this.renderer.render();
	}
	private nextScreen() {
		try { this.setScreen(this._currentScreen + 1); } catch (e) { }
	}
	private prevScreen() {
		try { this.setScreen(this._currentScreen - 1); } catch (e) { }
	}
}
interface App extends EventTarget {
	addEventListener(type: "setpage", callback: (event: SetPageEvent) => void): void;
	// addEventListener(type: "setpage", callback: (event: SetPageEvent) => void): void;
}

export default App;
