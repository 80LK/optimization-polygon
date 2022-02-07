import Point from "./model/Point.js";
import random from "./utils/random.js";
class GeneratorPoints {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    generate(count = 10) {
        const points = [
            new Point(random(5, 11), random(5, 11)),
            new Point(random(15, 21), random(5, 11)),
            new Point(random(5, 11), random(15, 21))
        ];
        for (; count > 0; count--)
            points.push(new Point(random(this.min.x, this.max.x), random(this.min.y, this.max.y)));
        return points;
    }
    generatePages(pages, count) {
        if (Array.isArray(pages)) {
            return pages.map(count => this.generate(count));
        }
        else {
            const _pages = [];
            for (; pages > 0; pages--)
                _pages.push(this.generate(count));
            return _pages;
        }
    }
}
export default GeneratorPoints;
