$(document).ready(function() {
  $('.headline-img').addClass('shadow');

  // $('#holistic-approach').on('click', function(){
  //   $('#holistic-approach').toggleClass('animated')
  // });

  // set up animation
  buildAnimation();
  $(window).on('resize', buildAnimation);
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
        --startingPos: ${startingPos};
        --endingPos: ${endingPos};
      }
    </style>`
  ));
}
