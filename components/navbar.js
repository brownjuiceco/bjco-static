import './subnav.js';

class NavBar extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.checkUrlHash();

    $(document).ready(function() {
      $('.headline-img').addClass('shadow');
    });
  }

  render() {
    this.innerHTML = `
      <div id="left">
        <a href="https://brownjuice.co">
          <img id="logo" src="images/global/logo-inline.svg" alt="Brown Juice Co" />
        </a>
      </div>

      <sub-nav></sub-nav>

      <div id="right">
        <!-- <i class="fa-regular fa-globe"></i> -->
        <div class="toggle">
          <a data-lang="english" class="active">English</a>
          <a data-lang="japanese">日本語</a>
        </div>
      </div>
    `;
    this.bindEvents();
  }

  checkUrlHash() {
    // Remove the # from the hash and get the value
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Find the matching language option
      const matchingOption = this.querySelector(`[data-lang="${hash}"]`);
      if (matchingOption) {
        // Simulate a click on the matching option
        matchingOption.click();
      }
    }
  }

  bindEvents() {
    const languageOptions = this.querySelectorAll('.toggle a');

    languageOptions.forEach(option => {
      option.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        const newLanguage = target.getAttribute('data-lang');
        this.changeLanguage(target, newLanguage);

        // Update URL hash without triggering a page reload
        history.pushState(null, '', `#${newLanguage}`);
      });
    });

    // Listen for hash changes to handle browser back/forward
    window.addEventListener('hashchange', () => {
      this.checkUrlHash();
    });
  }

  changeLanguage(clickedElement, newLanguage) {
    if (clickedElement.classList.contains('active')) {
      return;
    }

    // Remove active class from all language options
    const languageOptions = this.querySelectorAll('.toggle a');
    languageOptions.forEach(option => option.classList.remove('active'));

    // Add active class to clicked element
    clickedElement.classList.add('active');

    // Emit a custom event for language change
    const event = new CustomEvent('languageChanged', {
      detail: { language: newLanguage },
      bubbles: true
    });
    this.dispatchEvent(event);
  }
}

customElements.define('nav-bar', NavBar);
