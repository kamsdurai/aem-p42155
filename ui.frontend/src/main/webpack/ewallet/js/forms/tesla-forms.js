import { FORM_VALIDATION_MESSAGES } from "./constant";
(function () {
  const $FORM = $("#new_form");
  const $SUBMIT_CTA = $("#new_form .cmp-form-button");

  if (!$FORM.length) {
    return false;
  }

  $SUBMIT_CTA.on("click", function () {
    if ($FORM.valid() == false) {
      return false;
    }
  });

  let messagelocal;
  const validateMessage = {
    en: {
      ewalletFirstName: FORM_VALIDATION_MESSAGES.EN.ewalletFirstName,
      ewalletLastName: FORM_VALIDATION_MESSAGES.EN.ewalletLastName,
      companyName: FORM_VALIDATION_MESSAGES.EN.companyName,
      emirate: FORM_VALIDATION_MESSAGES.EN.emirate,
      phoneNumber: FORM_VALIDATION_MESSAGES.EN.phoneNumber,
      emailAddress: FORM_VALIDATION_MESSAGES.EN.emailAddress,
    },
    ar: {
      ewalletFirstName: FORM_VALIDATION_MESSAGES.AR.ewalletFirstName,
      ewalletLastName: FORM_VALIDATION_MESSAGES.AR.ewalletLastName,
      companyName: FORM_VALIDATION_MESSAGES.AR.companyName,
      emirate: FORM_VALIDATION_MESSAGES.EN.emirate,
      phoneNumber: FORM_VALIDATION_MESSAGES.AR.phoneNumber,
      emailAddress: FORM_VALIDATION_MESSAGES.AR.emailAddress,
    },
  };

  if (document.documentElement.lang == "ar") {
    messagelocal = validateMessage.ar;
  } else {
    messagelocal = validateMessage.en;
  }

  $FORM.validate({
    rules: {
      ewalletFirstName: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 248,
      },
      ewalletLastName: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 248,
      },
      companyName: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 248,
      },
      emirate: {
        required: true,
      },
      phoneNumber: {
        required: true,
        number: true,
        digits: true,
        pattern: /^(050|054|055|056|052)/,
        minlength: 10,
        maxlength: 10,
      },
      emailAddress: {
        required: true,
        email: true,
      },
    },
    messages: messagelocal,
    submitHandler: function (form) {
      return false;
    },
  });
})();
