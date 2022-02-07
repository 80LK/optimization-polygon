export default class SetPageEvent extends Event {
    constructor(index) {
        super("setpage");
        this.index = index;
    }
}
