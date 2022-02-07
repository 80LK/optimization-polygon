import Renderer from "./Renderer.js";
class RendererGroup extends Renderer {
    constructor() {
        super(...arguments);
        this.elements = new Set();
    }
    render(ctx) {
        this.elements.forEach(element => element.render(ctx));
    }
    add(element) {
        this.elements.add(element);
    }
    remove(element) {
        this.elements.delete(element);
    }
    removeAll() {
        this.elements.clear();
    }
}
export default RendererGroup;
