import Range from "./Range.js";

function random(range = new Range(0, 1)) {
	return (Math.random() * range.length) + range.min;
}

export default random;
