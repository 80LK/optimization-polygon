import Point from "./Model/Point.js";
import Window from "./Render/Window.js";


class App {
	constructor(size, scale = 1) {
		this.window = new Window(size, scale);
	}

	start() {
		this.window.addEventListener("setScreen", console.log);
		this.window.init();
	}
}

new App(new Point(160, 90), 2).start();
