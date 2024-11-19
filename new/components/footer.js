class footer extends HTMLElement {
  constructor() {
    super();
    this.render();
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
          <a href="">ScheduleUX</a>
          <a href="">PM Dictionary</a>
          <a href="">Agency Book</a>
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
            <input type="email" name="email">
            <a id="footer-email">
              <img src="images/global/paper-plane.png" alt="send message"/>
            </a>
            <p>Questions, comments, new projects, or anything else that&#8217;s on your mind.</p>
          </form>
          <picture class="bg">
            <source srcset="images/global/footer-blob-dark.svg" media="(prefers-color-scheme:dark)">
            <img src="images/global/footer-blob-light.svg" alt=""/>
          </picture>
        </div>
      </div>

      <div id="last-line">
        <p>&copy;2024 –– All rights reserved</p>
      </div>
    </div>
  </footer>
    `;
    console.log('test')
    this.setActive();
    this.bindEvents();
  }

  bindEvents() {
    const form = $('#footer #contact form');
    const input = form.find('[name="email"]');
    const send = form.find('#footer-email')

    // check input quality and add class 'valid' when ready
    // when the user clicks 'send', check input then send
  }

  setActive() {
    const url = window.location.href;
    const links = $('#sitemap a[href]').toArray();

    for (let i; i < links.length; i++) {
      let href = $(links[i]).attr('href');
      if (url.includes(href)) {
        $(links[i]).addClass('you-are-here');
      }
    }
  }

}

customElements.define('global-footer', footer);
