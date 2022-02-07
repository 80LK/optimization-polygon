import Point from "./model/Point.js";
import Polygon from "./model/Polygon.js";
import randomColor from "./utils/randomColor.js";
import RendererGroup from "./view/RendererGroup.js";
import RendererPolygon from "./view/RendererPolygon.js";
import "./utils/Set.ext.js";
class PolygonBuilder {

	private mapRenderer: Map<Polygon, RendererPolygon> = new Map();

	private get polygons() {
		return [...this.mapRenderer.keys()];
	}

	// private polygons: Set<Polygon> = new Set();
	public readonly RendererPolygon = new RendererGroup();

	constructor(private readonly distance: number) { }

	private addPointInPolygon(point: Point, polygon: Polygon) {
		if (polygon.length) {
			const dist = polygon.distToPoint(point);
			if (dist == 0) return false;
			if (dist > this.distance) return true;
		}
		polygon.push(point);
		return false;
	}

	private deletePolygon(polygon: Polygon) {
		const renderer = this.mapRenderer.get(polygon);
		if (renderer) {
			this.RendererPolygon.remove(renderer)
			this.mapRenderer.delete(polygon);
		}
	}
	private addPolygon(polygon: Polygon) {
		const renderer = new RendererPolygon(polygon);
		const color = randomColor();
		renderer.colorPoint = renderer.color = color;
		renderer.background = color + "88";

		this.RendererPolygon.add(renderer);
		this.mapRenderer.set(polygon, renderer);
	}

	public push(points: Point[]) {
		this.method_1(points);
		// this.method_2(points);

		this.mergePolygons();
	}

	private mergePolygons() {
		const polygons = this.polygons;
		for (let i = 0; i < polygons.length; i++) {
			const polygon = polygons[i];
			for (let j = i + 1; j < polygons.length; j++) {
				const check = polygons[j];
				const checkPoints = check.points;
				const point = checkPoints.find(point => polygon.havePoint(point) || polygon.distToPoint(point) <= this.distance)
				if (point) {
					polygon.push(checkPoints);
					this.deletePolygon(check);
				}
			}
		}
	}

	private method_1(points: Point[]) {
		//Добавить новые точки в старые полигоны
		this.polygons.forEach(polygon => {
			points = points.filter(point => this.addPointInPolygon(point, polygon));
			// polygon.graham();
		});

		//Создать новые полигоны, если остались не добавленные точки
		while (points.length) {
			const polygon = new Polygon();

			points = points.filter(point => this.addPointInPolygon(point, polygon));
			// polygon.graham();

			this.addPolygon(polygon)
		}
	}

	private method_2(points: Point[]) {
		points = points.filter(point => {
			const groups = this.polygons.filter(polygon => polygon.distToPoint(point) <= this.distance);
			if (!groups[0]) return true;
			if (groups.length > 1) console.log("State 1", groups.length)
			const checkPolygon = groups[0];
			checkPolygon.push(point);

			if (!groups[1]) return false;
			if (groups.length > 1) console.log("State 3", groups.length)

			const l = groups.length;
			for (let i = 1; i < l; i++) {
				const polygon = groups[i];
				this.deletePolygon(polygon);
				checkPolygon.push(polygon.points);
			}
			return false;
		});

		while (points.length) {
			const polygon = new Polygon();
			polygon.push(points[0]);
			points.shift();

			points = points.filter(point => this.addPointInPolygon(point, polygon));
			this.addPolygon(polygon);
		}
	}
}

export default PolygonBuilder;
