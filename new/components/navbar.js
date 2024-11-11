class navBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #logo {max-height:1rem;}
        #middle > * {display:inline-block;}
        #middle i {margin:0 3vw;}
        #right {
          display:inline-flex;
          align-content:middle;
        }
        .toggle {
          background:white;
          border:1px solid black;
          border-radius:6px;
          display:inline-flex;
          align-content:middle;
        }
        .toggle .active {
          background:black;
          border-radius:4px;
          color:white;
        }
      </style>
      <div id="left">
        <a href="https://brownjuice.co">
          <img id="logo" src="images/logo.png" alt="Brown Juice Co" />
        </a>
      </div>

      <div id="middle">
        <a href="/team.html">Team</a>
          <i class="fa-solid fa-circle"></i>
        <a href="/process.html">Process</a>
          <i class="fa-solid fa-circle"></i>
        <a href="/company.html">Company</a>
      </div>
      
      <div id="right">
        <i class="fa-regular fa-globe"></i>
        <div class="toggle">
          <a name="english" class="active">English</a>
          <a name="japanese">日本語</a>
        </div>
      </div>
    `;

    const contactList = this.shadowRoot.querySelector('toggle');
    contactList.addEventListener('language-changed', (event) => {
      this.changeLanguage(event.detail.name);
    });

  }

  changeLanguage(newLanguage) {
    // change language
    // ...
    // ...
    this.render();
  }
}

customElements.define('nav-bar', navBar);
