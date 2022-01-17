function sleep(time = 1000) {
	const p = new Promise((r, c) => {
		setTimeout(r, time);
	})
	return p;
}

export default sleep;
