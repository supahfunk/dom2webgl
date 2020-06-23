import { WebGLRenderer } from "three";
import { component } from "bidello";

class Renderer extends component(WebGLRenderer) {
  constructor() {
    super({
      antialiasing: true,
      alpha: true
    });

    this.setPixelRatio(window.devicePixelRatio);
    this.setClearColor(0xffffff, 0);
  }

  onResize({ width, height }) {
    this.setSize(width, height);
  }
}

export default new Renderer();
