 // Captcha Version 2

 var doSubmit = false;

 function reCaptchaVerify(response) {

  if (response === document.querySelector('.g-recaptcha-response').value) {
    doSubmit = true;
 $('#submitBtn').removeClass('hide');
 $('#disableBtn').removeClass('btn-disabled');

   }
 }

 function reCaptchaExpired () {
   alert('Verify Google Captcha again');
   $('#submitBtn').addClass('hide');
   $('#disableBtn').addClass('btn-disabled');

 }

 function reCaptchaCallback () { 
      $('#submitBtn').addClass('hide');
      $('#disableBtn').addClass('btn-disabled');
   grecaptcha.render('rcaptcha', {
    'sitekey': document.getElementById('gcaptchaKeyV2').value,
    'callback': reCaptchaVerify,
    'expired-callback': reCaptchaExpired
   });
 }

 // Captcha Version 3

 grecaptcha.ready(function() {
    // do request for recaptcha token
    // response is promise with passed token
        grecaptcha.execute(document.getElementById('gcaptchaKeyV3').value, {action:'validate_captcha'})
                  .then(function(token) {
            // add token value to form
            document.getElementById('g-recaptcha-response').value = token;
        });

    });

