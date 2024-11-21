$(document).ready(function () {
  $(".headline-img").addClass("shadow");

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const localPart = emailValue.split('@')[0];
    const domain = emailValue.split('@')[1];
    const localTooManyNumbers = (localPart.match(/\d/g) || []).length > 2;
    const domainTooManyNumbers = (domainPart.match(/\d/g) || []).length > 2;
    const valid = emailRegex.test(emailValue);

    if (!bypassError) {
      if (valid) {
        $emailError.text('');
        $email.removeClass('error');
      } else {
        $emailError.text('Please enter a valid email address.');
        $email.addClass('error');

        if (localTooManyNumbers || domainTooManyNumbers) {
          captchaRequired = true;
          $('#captchaContainer').show();
          $captchaError.text('');
          generateCaptcha();
        } else {
          captchaRequired = false;
          $('#captchaContainer').hide();
          $captchaError.text('');
        }
      }
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
    const isFormValid =
      validateName(bypassError) &&
      validateEmail(bypassError) &&
      validateMessage(bypassError) &&
      validateCaptcha();
    $submit.prop('disabled', !isFormValid);

    return isFormValid;
  }

  $form.on('change keyup', () => checkFormValidity(true));

  // Submit Form
  $form.on('submit', function (e) {
    e.preventDefault();

    if (!checkFormValidity(true)) return;

    const formData = {
      reason: $reason.val(),
      name: $name.val().trim(),
      email: $email.val().trim(),
      message: $message.val().trim(),
    };

    // Simulate email sending
    console.log('Sending email:', formData);

    // Clear Local Storage and Form Fields After Submission
    localStorage.clear();
    $form.hide();
    $('#messageSent').show();
    setTimeout(() => {
      $('#messageSent').hide();
      $form.trigger('reset').show();
    }, 8000);
  });
});
