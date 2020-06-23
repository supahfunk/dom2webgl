import { Scene } from "three";
import { component } from "bidello";
import camera from "./camera";

class Stage extends component(Scene) {
  init() {
    this.add(camera);
  }
}

export default new Stage();
