class ArrowA extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <a class="fas-a trailing-arrow" href="${this.getAttribute("url")}">${this.getAttribute("text")}</a>
    `;
  }
}

customElements.define('a-arrow', ArrowA);
