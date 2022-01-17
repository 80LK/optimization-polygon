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

	async pushPoints(event) {
		if (this.lastScreen >= event.screen) return;

		this.lastScreen = event.screen;

		// let points = this.window.currentScreen.map(e => e.clone());
		// console.log(this.window.screens)
		this.groups[0] = new Polygon();
		this.groups[0].push(this.window.screens.reduce((r, e) => r.concat(e), []));

		// this.groups.forEach(polygon => {
		// 	points = points.filter(point => {
		// 		if (polygon.length != 0 && !polygon.havePoint(point)) {
		// 			const d = polygon.distToPoint(point);
		// 			if (d > 10) return true;
		// 		}

		// 		polygon.push(point);
		// 		return false;
		// 	});
		// });

		// while (points.length > 0) {
		// 	const polygon = new Polygon();
		// 	points = points.filter(point => {
		// 		if (polygon.length != 0 && !polygon.havePoint(point)) {
		// 			const d = polygon.distToPoint(point);
		// 			if (d > 10) return true;
		// 		}

		// 		polygon.push(point);
		// 		return false;
		// 	});
		// 	this.groups.push(polygon);
		// }

		// for (let i = 0; i < this.groups.length - 1; i++) {
		// 	const polygon = this.groups[i];
		// 	for (let j = i + 1; j < this.groups.length; j++) {
		// 		const check = this.groups[j];
		// 		if (check.points.findIndex(point => {
		// 			if (polygon.length != 0) {
		// 				if (polygon.havePoint(point)) return true;
		// 				const d = polygon.distToPoint(point);
		// 				if (d <= 10) return true;
		// 			}

		// 			return false;
		// 		}) != -1) {
		// 			polygon.push(check.points);
		// 			this.groups = this.groups.filter(p => p != check);
		// 		}
		// 	}
		// }

		return;

		// this.window.currentScreen.forEach((point) => {
		// 	let groups = this.groups.filter((e) => {
		// 		if (e.havePoint(point)) return true;
		// 		const d = e.distToPoint(point);
		// 		return d <= 10;
		// 	});

		// 	if (!groups.length) {
		// 		groups = [new Polygon()];
		// 		this.groups.push(groups[0]);
		// 	}


		// 	const group = groups[0];
		// 	group.push(point);
		// 	if (groups.length > 1) {
		// 		const additiveGroups = groups.slice(1);
		// 		const __p = additiveGroups.reduce((r, i) => r.concat(i.points), []);
		// 		console.log(__p)
		// 		group.push(__p);
		// 		this.groups = this.groups.filter(e => additiveGroups.indexOf(e) == -1);
		// 	}
		// });
	}

	start(screens = 10) {
		this.window.addEventListener("setScreen", this.pushPoints);
		this.window.addEventListener("render", (e) => {
			this.groups.forEach(p => RenderPolygon.render(p, e.ctx, e.scale));
		});
		this.window.init("body", screens);
		return this;
	}
}

const params = new URL(location.href).searchParams;

const scale = parseInt(params.get("scale")) || 5;

const width = parseInt(params.get("width")) || 160;
const height = parseInt(params.get("height")) || 90;
const screens = parseInt(params.get("frames")) || 10;
const sleep = parseInt(params.get("sleep")) || 0;
const DRTLF = params.get("drtlf") == "true";

const app = new App(new Point(width, height), scale).start(screens);
app.sleep = sleep;
app.disableRenderToLastFrame = DRTLF;
