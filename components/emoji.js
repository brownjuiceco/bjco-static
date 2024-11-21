class emoji extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <img src="images/emoji/${this.getAttribute('data-emoji')}.png" class="${this.getAttribute('data-classes')}" alt="" />
    `;
  }
}

customElements.define('emoji-img', emoji);
