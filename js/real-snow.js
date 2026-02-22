class RealSnowflake {
  constructor() {
    this.size = Math.random() * 15 + 5;
    this.opacity = Math.random() * 0.7 + 0.3;
    this.speed = Math.random() * 3 + 2;
    this.rotateSpeed = Math.random() * 2 - 1;
    this.swingAmplitude = Math.random() * 10 + 5;
    this.swingSpeed = Math.random() * 0.05 + 0.02;
    this.wind = Math.random() * 0.5 - 0.25;

    this.x = Math.random() * window.innerWidth;
    this.y = -this.size;
    this.rotate = Math.random() * 360;
    this.swingOffset = 0;

    this.el = document.createElement('div');
    this.el.style.cssText = `
      position: fixed;
      width: ${this.size}px;
      height: ${this.size}px;
      background: #fff;
      border-radius: 50%;
      opacity: ${this.opacity};
      pointer-events: none;
      user-select: none;
      z-index: 1;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
      filter: blur(${this.size < 10 ? 0.5 : 1}px);
    `;
    document.body.appendChild(this.el);
  }

  update() {
    this.y += this.speed;
    this.swingOffset += this.swingSpeed;
    this.x += Math.sin(this.swingOffset) * this.swingAmplitude + this.wind;
    this.rotate += this.rotateSpeed;

    this.el.style.left = `${this.x}px`;
    this.el.style.top = `${this.y}px`;
    this.el.style.transform = `rotate(${this.rotate}deg)`;

    if (this.y > window.innerHeight + this.size) {
      this.el.remove();
      return false;
    }
    return true;
  }
}

let snowflakes = [];
const maxSnowflakes = 80;

function spawnSnowflake() {
  if (snowflakes.length < maxSnowflakes) {
    snowflakes.push(new RealSnowflake());
  }
}

function animateSnow() {
  snowflakes = snowflakes.filter(snow => snow.update());
  if (Math.random() < 0.6) spawnSnowflake();
  requestAnimationFrame(animateSnow);
}

window.addEventListener('load', () => {
  if (!/Mobile|Android|iOS/.test(navigator.userAgent)) {
    animateSnow();
  }
});

window.addEventListener('resize', () => {
  snowflakes.forEach(snow => {
    if (snow.x > window.innerWidth) snow.x = window.innerWidth - snow.size;
  });
});
