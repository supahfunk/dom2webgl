import { component } from "bidello";
import { lerp } from "math-toolbox";

class Scroll extends component() {
  init() {
    this.$scroll = document.getElementsByClassName('site')[0]
    this.$height = document.getElementsByClassName('h')[0]

    this.calculateHeight = this.calculateHeight.bind(this)

    this.limit = 0;
    this.y = 0;
    this.oldY = 0;
    this.easeY = 0;
    this.speed = 0;

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll)

    // Scroll to 0
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0,0);
    })
  }

  calculateHeight() {
    this.$height.style.height = `${this.$scroll.offsetHeight}px`

    this.limit = document.documentElement.scrollHeight - window.innerHeight;
    this.y = window.scrollY;
    this.oldY = window.scrollY;
    this.speed = 0;
  }

  onScroll() {
    this.y = window.scrollY
    this.playrate = this.y / this.limit
  }

  onRaf() {
    this.easeY = lerp(this.easeY, this.y, .1)
    this.$scroll.style.transform = `translateY(-${this.easeY}px`

    this.speed = lerp(this.speed, this.easeY - this.oldY, .1)
    this.oldY = this.easeY
  }

  onResize() {
    this.calculateHeight()
    this.limit = document.documentElement.scrollHeight - window.innerHeight;
  }
}

export const scroll = new Scroll();
