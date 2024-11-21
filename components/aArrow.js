class aArrow extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <a class="fas-a trailing-arrow ${this.getAttribute("data-classes")}" href="${this.getAttribute("data-url")}">${this.getAttribute("data-text")}</a>
    `;
  }
}

customElements.define('a-arrow', aArrow);
