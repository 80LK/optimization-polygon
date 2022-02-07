import App from "./App.js";

function setText(query: string, value: any) {
	const el = document.querySelector(query);
	if (el)
		el.textContent = value.toString();
}

function main() {
	const app = new App();


	const list = document.querySelector("#list-points");
	if (list) {
		const lX = app.width.toString().length,
			lY = app.height.toString().length;
		app.addEventListener("setpage", (event) => {
			list.innerHTML = app.currentScreen.map(
				point => {
					const x = point.x.toString().padLeft(lX);
					const y = point.y.toString().padLeft(lY);
					return `(${x}; ${y})`;
				}).join("<br/>");
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
	setText("#info #dist", app.dist);
	console.log(app);
}
main();
