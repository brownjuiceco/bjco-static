class aArrow extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <a class="fas-a trailing-arrow ${this.getAttribute("data-classes")}" href="${this.getAttribute("data-url")}">
        <span data-lang="en">${this.getAttribute("data-text-en")}</span>
        <span data-lang="jp">${this.getAttribute("data-text-jp")}</span>
      </a>
    `;
  }
}

customElements.define('a-arrow', aArrow);
