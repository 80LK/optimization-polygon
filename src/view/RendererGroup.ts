import Renderer from "./Renderer.js";

class RendererGroup<T extends Renderer = Renderer> extends Renderer {
	private elements: Set<T> = new Set();

	public render(ctx: CanvasRenderingContext2D): void {
		this.elements.forEach(element => element.render(ctx));
	}

	public add(element: T) {
		this.elements.add(element);
	}
	public remove(element: T) {
		this.elements.delete(element);
	}
	public removeAll() {
		this.elements.clear();
	}
}

export default RendererGroup;
