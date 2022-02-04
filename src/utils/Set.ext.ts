interface Set<T> {
	filter(callback: (item: T) => boolean): T[];
}
Set.prototype.filter = function <T>(callback: (item: T) => boolean): T[] {
	const items: T[] = [];
	this.forEach((item) => {
		callback(item) && items.push(item);
	})
	return items;
}
