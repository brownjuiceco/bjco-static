class SubNav extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <a href="/team.html">Team</a>
      •
      <a href="/process.html">Process</a>
      •
      <a href="/company.html">Company</a>
    `;
  }
}

customElements.define('sub-nav', SubNav);
