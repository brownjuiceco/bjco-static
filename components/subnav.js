class SubNav extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.localizeLinks();
  }

  render() {
    this.innerHTML = `
      <a href="team.html">
        <span data-lang="en">Team</span>
        <span data-lang="jp">チーム</span>
        </a>
      •
      <a href="process.html">
        <span data-lang="en">Process</span>
        <span data-lang="jp">作業工程</span>
        </a>
      •
      <a href="contact.html">
        <span data-lang="en">Contact</span>
        <span data-lang="jp">連絡先</span>
        </a>
    `;
  }

  localizeLinks() {
    const newLanguage = window.location.hash.slice(1) || 'en';

    $('[data-lang]').hide();
    $(`[data-lang="${newLanguage}"]`).show();
  }
}

customElements.define('sub-nav', SubNav);
