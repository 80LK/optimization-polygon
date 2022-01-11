import random from "./random.js";
import Range from "./Range.js";

const RandomColor = {
	_colors: new Map(),

	get(target) {
		const color = this._colors.get(target);
		if (color) return color;

		const colors = [
			// "#ff0000",
			"#00ff00",
			"#0000ff",
			"#ffff00",
			"#ff00ff",
			"#00ffff",
			"#ff8000",
		];
		const i = Math.floor(random(new Range(0, colors.length)));
		this._colors.set(target, colors[i])
		return colors[i];
	}
};

export default RandomColor;
