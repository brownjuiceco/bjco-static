$(document).ready(function () {
  /* set up form */
  const $form = $('#contactForm');
  const $reason = $('#reason');
  const $name = $('#name');
  const $email = $('#email');
  const $message = $('#message');
  const $captchaQuestion = $('#captchaQuestion');
  const $submit = $('#sendButton');

  const $reasonError = $('#reasonError');
  const $nameError = $('#nameError');
  const $emailError = $('#emailError');
  const $messageError = $('#messageError');
  const $captchaError = $('#captchaError');

  let captchaRequired = false;

  // Generate a CAPTCHA question
  function generateCaptcha() {
    if ($captchaQuestion.attr('data-answer')) return;
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const question = `${num1} + ${num2}`;
    $captchaQuestion.attr('data-answer', num1 + num2);
    $captchaQuestion.attr("placeholder", question);
  }

  function validateName(bypassError) {
    const valid = $name.val().trim() !== '';

    if (!bypassError) {
      if (valid) {
        $nameError.text('');
        $name.removeClass('error');
      } else {
        $nameError.text('Name is required.');
        $name.addClass('error');
      }
    }

    return valid;
  }

  function validateEmail(bypassError) {
    const emailValue = $email.val().trim();
    const localPart = emailValue.split('@')[0];
    const domainPart = emailValue.split('@')[1];
    const localTooManyNumbers = (localPart.match(/\d/g) || []).length > 2;
    const domainTooManyNumbers = domainPart ? (domainPart.match(/\d/g) || []).length > 2 : false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(emailValue);

    if (!bypassError) {
      // check format
      if (valid) {
        $emailError.text('');
        $email.removeClass('error');
      } else {
        $emailError.text('Please enter a valid email address.');
        $email.addClass('error');
      }
    }

    // check quality (too many numbers)
    if (localTooManyNumbers || domainTooManyNumbers) {
      captchaRequired = true;
      $('#captchaContainer').slideDown();
      $captchaError.text('');
      generateCaptcha();
    }

    return valid;
  }

  function validateMessage(bypassError) {
    const valid = $message.val().trim() !== '';

    if (!bypassError) {
      if (valid) {
        $messageError.text('');
        $message.removeClass('error');
      } else {
        $messageError.text('Message cannot be empty.');
        $message.addClass('error');
      }
    }

    return valid;
  }

  function validateCaptcha() {
    let valid = true;

    if (captchaRequired) {
      const userAnswer = parseInt($captchaQuestion.val(), 10);
      const correctAnswer = parseInt($captchaQuestion.attr('data-answer'), 10);
      valid = !isNaN(userAnswer) && userAnswer === correctAnswer;

      if (valid) {
        $captchaError.text('');
        $captchaQuestion.removeClass('error');
      } else {
        $captchaError.text('Incorrect answer. Please try again.');
        $captchaQuestion.addClass('error');
      }
    }

    return valid;
  }

  function checkFormValidity(bypassError = false) {
    const nameValid = validateName(bypassError);
    const emailValid = validateEmail(bypassError);
    const messageValid = validateMessage(bypassError);
    const captchaValid = validateCaptcha();

    const isFormValid = nameValid && emailValid && messageValid && captchaValid;

    $submit.prop('disabled', !isFormValid);

    return isFormValid;
  }

  // Handle Field Validation on Focus Out
  $name.on('focusout', () => {
    $name.addClass('touched')
    validateName(false)
  });
  $email.on('focusout', () => {
    $email.addClass('touched')
    validateEmail(false)
  });
  $message.on('focusout', () => {
    $message.addClass('touched')
    validateMessage(false)
  });
  $captchaQuestion.on('focusout', validateCaptcha);

  // Handle Field Validation on Input (For Invalid Fields Only)
  $name.on('focus keyup paste cut', function () {
    if ($name.hasClass('touched')) validateName(false);
  });
  $email.on('focus keyup paste cut', function () {
    if ($email.hasClass('touched')) validateEmail(false);
  });
  $message.on('focus keyup paste cut', function () {
    if ($message.hasClass('touched')) validateMessage(false);
  });
  $captchaQuestion.on('focus keyup paste cut', function () {
    if ($captchaQuestion.hasClass('touched')) validateCaptcha();
  });

  // Enable Submit Button Only When All Fields Are Valid
  function checkFormValidity(bypassError = false) {
    const name = validateName(bypassError);
    const email = validateEmail(bypassError);
    const message = validateMessage(bypassError);
    const captcha = validateCaptcha();
    const isFormValid = name && email && message && captcha;

    $submit.prop('disabled', !isFormValid);

    return isFormValid;
  }

  $form.on('change keyup', () => checkFormValidity(true));

  // Submit Form
  $form.on('submit', function (e) {
    e.preventDefault();
    if (!checkFormValidity(true)) return;
    if (window.submitting) return;
    window.submitting = true;

    const inquiry = {
      name: $name.val().trim(),
      email: $email.val().trim(),
      reason: $reason.val(),
      message: $message.val().trim(),
      form: 'bjco-contact'
    };

    // Simulate email sending
    sendMessage(inquiry);
    // console.log('Sending email:', inquiry);
  });

  // delivery helper
  function sendMessage(inquiry) {
    $form.hide();

    $.ajax({
      url: 'https://bjco-server-3d68e4a22d18.herokuapp.com/api/contact/mailer',
      type: 'POST',
      data: JSON.stringify(inquiry),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        window.response = response;
        $('#messageSent').show();

        setTimeout(() => {
          $('#messageSent').hide();
          $form.trigger('reset').show();
        }, 8000);

        localStorage.clear();
        window.submitting = false;
      },
      error: function(xhr, status, error) {
        console.log(xhr, status, error);
        /* TODO: Create failure alert */
        var errorMessage = '';
        if (window.location.hash.slice(1) === 'jp') {
          errorMessage = `メッセージの送信中に問題が発生しました。代わりにメールをお送りください。<a href="mailto:hello@brownjuice.co">hello@brownjuice.co</a>までご連絡ください。`;
        } else {
          errorMessage = `There was a problem sending your message. Please send us an email instead. You can reach us at <a href="mailto:hello@brownjuice.co">hello@brownjuice.co</a>`;
        }
        $('#messageSent').html(`<p>${errorMessage}</p>`).show();

        // show field content
        $submit.remove();
        $form.slideDown();

        // don't reset submitting flag
        // window.submitting = true;
      }
    });
  }
});

