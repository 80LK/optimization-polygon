export default class SetPageEvent extends Event {
	constructor(public readonly index?: number) {
		super("setpage");
	}
}
