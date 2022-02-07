class Params {
    constructor(params) {
        if (typeof params === "string") {
            this.params = new URL(params).searchParams;
        }
        else if (params instanceof URL) {
            this.params = params.searchParams;
        }
        else if (params instanceof URLSearchParams) {
            this.params = params;
        }
        else {
            throw new ReferenceError();
        }
    }
    get(key, defaultValue = "") {
        const value = this.params.get(key);
        if (!value)
            return defaultValue;
        return value;
    }
    getInt(key, defaultValue = 0) {
        const value = this.get(key);
        if (!value)
            return defaultValue;
        return parseInt(value);
    }
    getIntNotNaN(key, defaultValue = 0) {
        return this.getInt(key, defaultValue) || defaultValue;
    }
    getFloat(key, defaultValue = 0) {
        const value = this.get(key);
        if (!value)
            return defaultValue;
        return parseFloat(value);
    }
    getFloatNotNaN(key, defaultValue = 0) {
        return this.getFloat(key, defaultValue) || defaultValue;
    }
}
export default Params;
