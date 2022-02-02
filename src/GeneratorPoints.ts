import Point from "./model/Point.js";
import random from "./utils/random.js";

class GeneratorPoints {
	constructor(private min: Point, private max: Point) { }

	public generate(count: number = 10): Point[] {
		const points: Point[] = [];
		for (; count > 0; count--)
			points.push(new Point(random(this.min.x, this.max.x), random(this.min.y, this.max.y)));
		return points;
	}

	public generatePages(pages: number, count: number): Point[][];
	public generatePages(pages: number[]): Point[][];
	public generatePages(pages: number | number[], count?: number): Point[][] {
		if (Array.isArray(pages)) {
			return pages.map(count => this.generate(count));
		} else {
			const _pages: Point[][] = [];

			for (; pages > 0; pages--)
				_pages.push(this.generate(count));

			return _pages;
		}
	}
}

export default GeneratorPoints;
