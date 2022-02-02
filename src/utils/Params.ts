class Params {
	private params: URLSearchParams;

	constructor(params: string | URL | URLSearchParams) {
		if (typeof params === "string") {
			this.params = new URL(params).searchParams;
		} else if (params instanceof URL) {
			this.params = params.searchParams;
		} else if (params instanceof URLSearchParams) {
			this.params = params;
		} else {
			throw new ReferenceError();
		}
	}

	get(key: string, defaultValue: string = ""): string {
		const value = this.params.get(key);
		if (!value) return defaultValue;
		return value;
	}

	getInt(key: string, defaultValue: number = 0): number {
		const value = this.get(key);
		if (!value) return defaultValue;
		return parseInt(value);
	}
	getIntNotNaN(key: string, defaultValue: number = 0): number {
		return this.getInt(key, defaultValue) || defaultValue;
	}

	getFloat(key: string, defaultValue: number = 0): number {
		const value = this.get(key);
		if (!value) return defaultValue;
		return parseFloat(value);
	}
	getFloatNotNaN(key: string, defaultValue: number = 0): number {
		return this.getFloat(key, defaultValue) || defaultValue;
	}
}

export default Params;
