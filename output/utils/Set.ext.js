"use strict";
Set.prototype.filter = function (callback) {
    const items = [];
    this.forEach((item) => {
        callback(item) && items.push(item);
    });
    return items;
};
