import { component } from "bidello";
import { map, lerp } from "math-toolbox";
import { PlaneBufferGeometry, TextureLoader, Mesh, ShaderMaterial, LinearFilter } from "three";
import dom3D from '../dom3D';
import fragment from './fragment'
import vertex from './vertex'
import { scroll, viewport } from '../../../bidello'

const geometry = new PlaneBufferGeometry(1, 1, 40, 40);
const material = new ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
});

const loader = new TextureLoader()

export default class extends dom3D {
  init() {
    this.inertia = .2;

    super.init();
    
    this.geometry = geometry;
    this.material = material.clone();
    this.speed = 0;

    this.material.uniforms = {
      uTime: { value: 0 },
      uTexture: { value: 0 },
      uSpeed: { value: 0 }
    };

    this.src = this.element.src
    this.texture = loader.load(this.src, (texture) => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
      this.material.uniforms.uTexture.value = texture;
      this.element.style.opacity = 0
      // this.element.style.marginLeft = '100px'
    })
    
    this.mesh = new Mesh(this.geometry, this.material);
    this.add(this.mesh);
  }

  onRaf({ delta }) {
    super.onRaf()
    
    if (this.bounds.top + this.bounds.height > scroll.easeY && this.bounds.top < scroll.easeY + viewport.height) {
      this.speed = lerp(this.speed, scroll.speed, this.inertia);
      this.material.uniforms.uTime.value += delta * this.inertia;
      this.material.uniforms.uSpeed.value = this.speed;
    }

    this.rotation.z = scroll.speed * 0.001
    this.mesh.scale.y = 1 + scroll.speed * 0.001
  }

}