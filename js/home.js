$(document).ready(function() {
  $('.headline-img').addClass('shadow');

  // $('#holistic-approach').on('click', function(){
  //   $('#holistic-approach').toggleClass('animated')
  // });

  // set up animation
  buildAnimation();
  $(window).on('resize', buildAnimation);

  // animate "holistic" element
  const holistic = $('#holistic-approach');
  $(window).on('scroll', function() {
    let top = holistic[0].getBoundingClientRect().top;
    // short-circuit if section is off-screen
    if (top > window.innerHeight || top < 0) return;

    if (top <= window.innerHeight * .7) {
      holistic.addClass('animating animated');
      $(window).off('scroll');

      window.setTimeout(function() {
        holistic.removeClass('animating');
      }, 550);
    }
  });

});

function buildAnimation() {
  const img = $('#ds-experts .anim-container .positioned.anim img');
  const offset = 0; // .02;
  const startingPos = img.height() * (.5 + offset) * -1;
  const endingPos = img.height() * (0 + offset) * -1;

  $('style[name="animation-container"]').remove();
  $('body').append($(
    `<style type="text/css" name="animation-container">
      :root {
        --startingPos: ${startingPos}px;
        --endingPos: ${endingPos}px;
      }
    </style>`
  ));
}

