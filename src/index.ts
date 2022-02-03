import App from "./App.js";
import SetPageEvent from "./SetPageEvent.js";

function setText(query: string, value: any) {
	const el = document.querySelector(query);
	if (el)
		el.textContent = value.toString();
}

function main() {
	const app = new App();


	const list = document.querySelector("#list-points");
	if (list) {
		app.addEventListener("setpage", (event) => {
			list.innerHTML = app.currentScreen.map(point => `(${point.x};${point.y})`).join("<br/>");
		});
	}

	app.attach("#canvas");

	setText("#info #width", app.width);
	setText("#info #height", app.height);
	setText("#info #scale", app.scale);
	setText("#info #cwidth", app.width * app.scale);
	setText("#info #cheight", app.height * app.scale);
	setText("#info #pages", app.pages);
	setText("#info #points", app.points);

	const main = document.body.querySelector("main");
	if (main) {
		main.style.setProperty("--width-canvas", (app.width * app.scale) + "px");
	}
}
main();
