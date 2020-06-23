precision mediump float;
uniform float uSpeed;
varying vec2 vUv;

void main() {
  vec3 pos = position;

  float pr = sin(uSpeed * pos.y * .2) * .3;
  pos.z += pr;
  
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}