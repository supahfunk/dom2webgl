import { component } from "bidello";

class Scroll extends component() {
  init() {
    this.limit = document.documentElement.scrollHeight - window.innerHeight;
    this.y = window.scrollY;
    this.oldY = window.scrollY;
    this.speed = 0;

    this.onScroll = this.onScroll.bind(this);

    window.addEventListener('scroll', this.onScroll)
  }

  onScroll() {
    this.y = window.scrollY
    this.playrate = this.y / this.limit
  }

  onRaf() {
    this.speed = window.scrollY - this.oldY
    this.oldY = window.scrollY
  }

  onResize() {
    this.limit = document.documentElement.scrollHeight - window.innerHeight;
  }
}

export const scroll = new Scroll();
