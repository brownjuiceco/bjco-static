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
          <h5 data-lang="en">Site Map</h5>
          <h5 data-lang="jp">サイトマップ</h5>
          <a href="index.html">
            <span data-lang="en">Home</span>
            <span data-lang="jp">トップページ</span>
            <i class="fa-solid fa-mug-marshmallows"></i>
            </a>
          <a href="team.html">
            <span data-lang="en">Team</span>
            <span data-lang="jp">チーム</span>
            <i class="fa-solid fa-people-group"></i>
            </a>
          <a href="process.html">
            <span data-lang="en">Process</span>
            <span data-lang="jp">作業工程</span>
            <i class="fa-solid fa-watch"></i>
            </a>
          <a href="life.html">
            <span data-lang="en">About Us</span>
            <span data-lang="jp">BJCOについて</span>
            <i class="fa-solid fa-hand-wave"></i>
            </a>
        </div>

        <div class="flex-col">
          <h5 data-lang="en">Products</h5>
          <h5 data-lang="jp">製品</h5>
          <a>ScheduleUX <i class="fa-regular fa-stopwatch"></i></a>
          <a>PM Dictionary <i class="fa-regular fa-stopwatch"></i></a>
          <a>Agency Book <i class="fa-regular fa-stopwatch"></i></a>
        </div>

        <div class="flex-col">
          <h5 data-lang="en">Official</h5>
          <h5 data-lang="jp">公式情報</h5>
          <a href="contact.html">
            <span data-lang="en">Contact</span>
            <span data-lang="jp">連絡先</span>
            <i class="fa-solid fa-envelope"></i>
            </a>
          <a href="guarantee.html">
            <span data-lang="en">Guarantee</span>
            <span data-lang="jp">当社の保証</span>
            <i class="fa-solid fa-hand-fingers-crossed"></i>
            </a>
          <!-- <a href="jobs.html">
            <span data-lang="en">Jobs</span>
            <span data-lang="jp">仕事</span>
            <i class="fa-solid fa-external-link"></i></a
            > -->
          <a href="privacy.html">
            <span data-lang="en">Privacy</span>
            <span data-lang="jp">プライバシー</span>
            <i class="fa-solid fa-user-secret"></i>
            </a>
          <a href="terms.html">
            <span data-lang="en">Terms</span>
            <span data-lang="jp">利用規約</span>
            <i class="fa-solid fa-scroll"></i>
            </a>
        </div>

        <div class="flex-col" id="contact">
          <h5 data-lang="en">Get in touch!</h5>
          <h5 data-lang="jp">お問い合わせ</h5>
          <form>
            <input type="email" name="email" placeholder="email@address.com">
            <a id="footer-email">
              <img src="images/global/paper-airplane.png" alt="send message"/>
            </a>
            <p data-lang="en">Questions, comments, new projects, or anything else that&#8217;s on your mind.</p>
            <p data-lang="jp">ご質問、ご意見、新しいプロジェクトの提案、その他ご意見など、お気軽にお問い合わせください。</p>
          </form>
          <picture class="bg">
            <source srcset="images/global/footer-typewriter-dark.png" media="(prefers-color-scheme:dark)">
            <img src="images/global/footer-typewriter-light.png" alt=""/>
          </picture>
        </div>
      </div>

      <div id="last-line">
        <p>&copy;2024 ––
          <span data-lang="en">All rights reserved</span>
          <span data-lang="jp">無断転載を禁じます</span>
        </p>
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
    var path = window.location.pathname;
    const links = $('#sitemap a[href]').toArray();


    for (var i = 0; i < links.length; i++) {
      let href = $(links[i]).attr('href');

      if (path === '/') {
        $('#sitemap').find('a[href="index.html"]').addClass('you-are-here');
        i = links.length;
      } else
        if (path.includes('contact.html')) {
        $('#sitemap').find('a[href="contact.html"]').addClass('you-are-here');
        $('#footer #contact').hide();
        i = links.length;
      } else
        if (path.includes(href)) {
        $(links[i]).addClass('you-are-here');
        i = links.length;
      }
    }
  }
}

customElements.define('global-footer', footer);
