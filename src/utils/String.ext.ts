interface String {
	padLeft(length: number, padChar: string): string;
}
String.prototype.padLeft = function (length: number, padChar: string = " ") {
	const size = length - this.length;
	let pad = "";
	for (; pad.length < size;) {
		pad += padChar;
	}
	pad = pad.substring(0, size);

	return pad + this;
}
