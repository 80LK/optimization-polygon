import Point from "./model/Point.js";
import Polygon from "./model/Polygon.js";
import RendererGroup from "./view/RendererGroup.js";
import RendererPolygon from "./view/RendererPolygon.js";

class PolygonBuilder {
	private polygons: Polygon[] = [];
	public readonly RendererPolygon = new RendererGroup();

	constructor(private readonly distance: number) { }

	public push(points: Point[]) {

	}
}

export default PolygonBuilder;
