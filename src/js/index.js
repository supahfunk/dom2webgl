import { component } from "bidello";
import * as helpers from "./bidello/index";
import renderer from "./gl/renderer";
import camera from "./gl/camera";
import scene from "./gl/scene";

// Components
import Image from "./gl/components/image";

// SCSS
import '../scss/styles.scss';

// Site
class Site extends component() {
  init() {
    document.body.appendChild(renderer.domElement);

    [...document.body.querySelectorAll('img')].forEach(i => {
      const image = new Image( i );
      scene.add(image);
    })
  }

  onRaf() {
    renderer.render(scene, camera);
  }

  onLoadEnd() {
    console.log("finished loader!");
  }
}

new Site();
