class burstButton extends HTMLElement {
  constructor() {
    super();
    this.render();
    // <meta author="alphardex">
    // <meta source="https://codepen.io/alphardex/pen/eYzbdEb">
  }

  render() {
    this.innerHTML = `
<button class="btn btn-heart">Burst Love!</button>


<style type="text/css">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: hsl(240, 56%, 98%);
}

.heart {
  --heart-color: var(--danger-color);
  --heart-width: 16px;

  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: var(--heart-width);
  height: var(--heart-width);
  background: var(--heart-color);
  transform: rotate(-45deg);
  pointer-events: none;
}

.heart::before,
.heart::after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
}
.heart::before {top: -50%;}
.heart::after {right: -50%;}
</style>

<script>
const easeOutQuart = "cubic-bezier(0.165, 0.84, 0.44, 1)";
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
const btnHearts = document.querySelectorAll(".btn-heart");
const createParticle = (x, y) => {
  const width = randomNumberInRange(6, 36);
  const tx = randomNumberInRange(-360, 360);
  const ty = randomNumberInRange(-360, 360);
  const rz = randomNumberInRange(0, 480);
  const delay = randomNumberInRange(0, 240);
  const duration = randomNumberInRange(1000, 5000);
  const particle = document.createElement("div");
  particle.className = "heart";
  document.body.appendChild(particle);
  const anime = particle.animate(
    [
      {
        opacity: 1,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(-45deg)`
      },
      {
        opacity: 0,
        transform: `translate(-50%, -50%) translate(${x + tx}px, ${y + ty}px) rotate(${-45 + rz}deg)`
      }
    ],
    {
      duration,
      delay,
      easing: easeOutQuart
    }
  );
  anime.onfinish = (e) => e.srcElement.effect.target.remove();
};
const createParticles = (x, y, n) => {
  for (let i = 0; i < n; i++) {
    createParticle(x, y);
  }
};
btnHearts.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY + window.scrollY;
    createParticles(x, y, 50);
  });
});
</script>   
    `;
  }
}

customElements.define('burst-button', burstButton);
