precision mediump float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uSpeed;
  
void main() {
  vec2 uv = vUv;
  vec3 texture;
  texture = texture2D(uTexture, uv).rgb;
  texture.r = texture2D(uTexture, uv + vec2(0., uSpeed * 0.0004)).r;
  texture.g = texture2D(uTexture, uv - vec2(0., uSpeed * 0.0001)).g;

  gl_FragColor = vec4(texture, 1.);
}