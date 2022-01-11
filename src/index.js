import Point from "./Model/Point.js";
import Polygon from "./Model/Polygon.js";
import RenderPolygon from "./Render/Polygon.js";
import Window from "./Render/Window.js";


class App {
	constructor(size, scale = 1) {
		this.window = new Window(size, scale);
		this.groups = [];
		this.lastScreen = -1;
		this.pushPoints = this.pushPoints.bind(this);
	}

	pushPoints(event) {
		if (this.lastScreen >= event.screen) return;

		this.lastScreen = event.screen;

		this.window.currentScreen.forEach((point) => {
			let groups = this.groups.filter((e) => {
				const d = e.distToPoint(point);
				return d <= 10;
			});

			if (!groups.length) {
				groups = [new Polygon()];
				this.groups.push(groups[0]);
			}


			const group = groups[0];
			group.push(point);
			console.log(groups.length)
			if (groups.length > 1) {
				const additiveGroups = groups.slice(1);
				group.push(additiveGroups.reduce((r, i) => r.concat(i.points), []));
				this.groups = this.groups.filter(e => additiveGroups.indexOf(e) == -1);
			}
		});
	}

	start() {
		this.window.addEventListener("setScreen", this.pushPoints);
		this.window.addEventListener("render", (e) => {
			this.groups.forEach(p => RenderPolygon.render(p, e.ctx, e.scale));
		});
		this.window.init();
		return this;
	}
}

new App(new Point(160, 90), 5).start();
