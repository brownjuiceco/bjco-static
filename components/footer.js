class footer extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.bindEvents();
    this.setActive();
  }

  render() {
    this.innerHTML = `
  <footer id="footer" class="contain">
    <div>
      <h4>Brown Juice Co</h4>

      <div class="flex-row" id="sitemap">
        <div class="flex-col">
          <h5>Site Map</h5>
          <a href="index.html">Home <i class="fa-solid fa-mug-marshmallows"></i></a>
          <a href="team.html">Team <i class="fa-solid fa-people-group"></i></a>
          <a href="process.html">Process <i class="fa-solid fa-watch"></i></a>
          <a href="life.html">About Us <i class="fa-solid fa-hand-wave"></i></a>
        </div>

        <div class="flex-col">
          <h5>Products</h5>
          <a>ScheduleUX <i class="fa-regular fa-stopwatch"></i></a>
          <a>PM Dictionary <i class="fa-regular fa-stopwatch"></i></a>
          <a>Agency Book <i class="fa-regular fa-stopwatch"></i></a>
        </div>

        <div class="flex-col">
          <h5>Official</h5>
          <a href="contact.html">Contact <i class="fa-solid fa-envelope"></i></a>
          <a href="guarantee.html">Guarantee <i class="fa-solid fa-hand-fingers-crossed"></i></a>
          <!-- <a href="jobs.html">Jobs <i class="fa-solid fa-external-link"></i></a> -->
          <a href="privacy.html">Privacy <i class="fa-solid fa-user-secret"></i></a>
          <a href="terms.html">Terms <i class="fa-solid fa-scroll"></i></a>
        </div>

        <div class="flex-col" id="contact">
          <h5>Get in touch!</h5>
          <form>
            <input type="email" name="email" placeholder="email@address.com">
            <a id="footer-email">
              <img src="images/global/paper-airplane.png" alt="send message"/>
            </a>
            <p>Questions, comments, new projects, or anything else that&#8217;s on your mind.</p>
          </form>
          <picture class="bg">
            <source srcset="images/global/footer-typewriter-dark.png" media="(prefers-color-scheme:dark)">
            <img src="images/global/footer-typewriter-light.png" alt=""/>
          </picture>
        </div>
      </div>

      <div id="last-line">
        <p>&copy;2024 –– All rights reserved</p>
      </div>
    </div>
  </footer>
    `;
  }

  bindEvents() {
    const form = $('#footer #contact form');
    const input = form.find('[name="email"]');
    const send = form.find('#footer-email')

    // check input quality and add class 'valid' when ready
    // when the user clicks 'send', check input then send
  }

  setActive() {
    const path = window.location.pathname;
    const links = $('#sitemap a[href]').toArray();

    if (path === '/') { path = 'index.html'; }

    for (var i = 0; i < links.length; i++) {
      let href = $(links[i]).attr('href');

      if (path.includes('contact.html')) {
        $('#footer #contact').hide();
      }

      if (path.includes(href)) {
        $(links[i]).addClass('you-are-here');
        i = links.length;
      }

    }
  }

}

customElements.define('global-footer', footer);
