"use strict";
String.prototype.padLeft = function (length, padChar = " ") {
    const size = length - this.length;
    let pad = "";
    for (; pad.length < size;) {
        pad += padChar;
    }
    pad = pad.substring(0, size);
    return pad + this;
};
