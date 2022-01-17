import Point from "../Model/Point.js";
import RenderPoint from "./Point.js";
import Range from "../Range.js";
import sleep from "../sleep.js";

class SetScreenEvent extends Event {
	constructor(screen) {
		super("setScreen");
		this.screen = screen;
	}
}
class RenderEvent extends Event {
	constructor(ctx, scale) {
		super("render");
		this.ctx = ctx;
		this.scale = scale;
	}
}

class Window extends EventTarget {
	constructor(size = new Point(160, 90), scale = 1) {
		super();
		this.scale = scale;
		this.size = size;
		this.sleeping = 0;
		this.disableRenderToLastFrame = false;
		this.nextScreen = this.nextScreen.bind(this);
		this.prevScreen = this.prevScreen.bind(this);
		this.toLastScreen = this.toLastScreen.bind(this);
		this.toFirstScreen = this.toFirstScreen.bind(this);
	}

	init(selector = "body", screens = 10) {
		this.createDOM(selector);
		this.initScreens(screens);

		this.setScreen(0);
	}

	createDOM(selector = "body") {
		this.$root = document.querySelector(selector);
		if (!this.$root) throw new RangeError(`Not found element by selector "${selector}"`);

		this.$canvas = document.createElement("canvas");
		this.$canvas.width = this.size.x * this.scale;
		this.$canvas.height = this.size.y * this.scale;

		this.ctx = this.$canvas.getContext("2d");

		this.$curFrame = new Text("0");
		// this.$curFrame.textContent
		this.$frames = new Text("0");

		this.$firstBtn = document.createElement("button");
		this.$firstBtn.innerText = "Первый кадр";
		this.$firstBtn.addEventListener("click", this.toFirstScreen);


		this.$lastBtn = document.createElement("button");
		this.$lastBtn.innerText = "Последний кадр";
		this.$lastBtn.addEventListener("click", this.toLastScreen);

		this.$nextBtn = document.createElement("button");
		this.$nextBtn.innerText = "Следующий кадр";
		this.$nextBtn.addEventListener("click", this.nextScreen);

		this.$prevBtn = document.createElement("button");
		this.$prevBtn.innerText = "Предыдущий кадр";
		this.$prevBtn.addEventListener("click", this.prevScreen);

		this.$listCurrentPonts = document.createElement("div");
		this.$totalCurrentPoints = new Text("0");


		this.$root.style.setProperty("--height_canvas", this.$canvas.height + "px");
		this.$root.classList.add("app");

		this.$root.appendChild(this.$canvas);

		this.$root.appendChild((() => {
			const el = document.createElement("div");
			el.appendChild((() => {
				const el = document.createElement("div");
				el.appendChild(new Text("Кол-во точек: "))
				el.appendChild(this.$totalCurrentPoints);
				return el;
			})());
			el.appendChild(this.$listCurrentPonts);
			return el;
		})())

		this.$root.appendChild((() => {
			const panel = document.createElement("div");
			panel.appendChild(new Text("Кадр "));
			panel.appendChild(this.$curFrame);
			panel.appendChild(new Text("/"));
			panel.appendChild(this.$frames);

			panel.appendChild(document.createElement("br"));

			panel.appendChild(this.$firstBtn);
			panel.appendChild(new Text(" "));
			panel.appendChild(this.$prevBtn);
			panel.appendChild(new Text(" "));
			panel.appendChild(this.$nextBtn);
			panel.appendChild(new Text(" "));
			panel.appendChild(this.$lastBtn);
			return panel;
		})());

		window.addEventListener("keydown", e => {
			switch (e.code) {
				case "ArrowUp":
					this.toFirstScreen()
					break;

				case "ArrowDown":
					this.toLastScreen()
					break;
				case "ArrowRight":
					this.nextScreen()
					break;
				case "ArrowLeft":
					this.prevScreen()
					break;
			}
		})
	}

	initScreens(screens = 10) {
		const genPoints = Point.generatorPoints(new Range(10, this.size.x - 10), new Range(-3, 3), new Range(50, 80));

		this.screens = [];

		for (let i = 0; i < screens; i++)
			this.screens.push(genPoints());

		this.currentScreenIndex = 0;
		this.totalScreen = screens;

		this.$frames.textContent = screens;
	}

	nextScreen() {
		this.setScreen(this.currentScreenIndex + 1);
	}
	prevScreen() {
		this.runNext = false;
		this.setScreen(this.currentScreenIndex - 1);
	}

	setScreen(screen) {
		if (screen < 0 || screen > this.screens.length - 1) return;

		this.currentScreenIndex = screen;

		this.$curFrame.textContent = this.currentScreenIndex + 1;

		this.$totalCurrentPoints.textContent = this.currentScreen.length;
		this.$listCurrentPonts.innerHTML = this.currentScreen
			.map((e) => `(${e.x}, ${e.y})`)
			.join("</br>");

		this.dispatchEvent(new SetScreenEvent(screen))
		this.render();
	}

	toFirstScreen() {
		this.runNext = false;
		this.setScreen(0);
	}
	async toLastScreen() {

		this.disableRender = this.disableRenderToLastFrame;
		this.runNext = true;
		for (let i = this.currentScreenIndex; i < this.totalScreen && this.runNext; i++) {
			this.nextScreen();
			await sleep(this.sleeping);
		}

		this.disableRender = false;
		this.render();
	}

	get currentScreen() {
		return this.screens[this.currentScreenIndex];
	}

	render() {
		if (this.disableRender == true) return;
		this.ctx.fillStyle = "#555555ff";
		this.ctx.fillRect(0, 0, this.size.x * this.scale, this.size.y * this.scale);

		this.ctx.fillStyle = "#ff0000ff";
		this.currentScreen.forEach(point => RenderPoint.render(point, this.ctx, this.scale, 2));

		this.dispatchEvent(new RenderEvent(this.ctx, this.scale))
	}
}

export default Window;
export { SetScreenEvent, RenderEvent }
