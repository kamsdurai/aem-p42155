 // Captcha Version 2
 var doSubmit = false;

 function reCaptchaVerify(response) {
     if (response === document.querySelector('.g-recaptcha-response').value) {
         doSubmit = true;
         $('#submitBtn').removeClass('hide');
         $('#disableBtn').removeClass('btn-disabled');

     }
 }

 function reCaptchaExpired() {
     alert('Verify Google Captcha again');
     $('#submitBtn').addClass('hide');
     $('#disableBtn').addClass('btn-disabled');

 }

 function reCaptchaCallback() {
     $('#submitBtn').addClass('hide');
     $('#disableBtn').addClass('btn-disabled');
     grecaptcha.render('rcaptcha', {
         'sitekey': document.getElementById('gcaptchaKeyV2').value,
         'callback': reCaptchaVerify,
         'expired-callback': reCaptchaExpired
     });
 }