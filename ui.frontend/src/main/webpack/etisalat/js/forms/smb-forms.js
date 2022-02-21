import { FORM_VALIDATION_MESSAGES } from "../../../global/js/constant";
(function () {
  const $FORM = $("#eventRegistration");
  const $SUBMIT_CTA = $("#eventRegistration .cmp-form-button");

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
      number: FORM_VALIDATION_MESSAGES.EN.number,
      firstName: FORM_VALIDATION_MESSAGES.EN.firstName,
      lastName: FORM_VALIDATION_MESSAGES.EN.lastName,
      emailAddress: FORM_VALIDATION_MESSAGES.EN.emailAddress,
      contactNumber: FORM_VALIDATION_MESSAGES.EN.contactNumber,
      companyName: FORM_VALIDATION_MESSAGES.EN.companyName,
      description: FORM_VALIDATION_MESSAGES.EN.description,
      socialAd: FORM_VALIDATION_MESSAGES.EN.socialAd,
    },
    ar: {
      number: FORM_VALIDATION_MESSAGES.AR.number,
      firstName: FORM_VALIDATION_MESSAGES.AR.firstName,
      lastName: FORM_VALIDATION_MESSAGES.AR.lastName,
      emailAddress: FORM_VALIDATION_MESSAGES.AR.emailAddress,
      contactNumber: FORM_VALIDATION_MESSAGES.AR.contactNumber,
      companyName: FORM_VALIDATION_MESSAGES.AR.companyName,
      description: FORM_VALIDATION_MESSAGES.AR.description,
      socialAd: FORM_VALIDATION_MESSAGES.AR.socialAd,
    },
  };

  if (document.documentElement.lang == "ar") {
    messagelocal = validateMessage.ar;
  } else {
    messagelocal = validateMessage.en;
  }

  $FORM.validate({
    rules: {
      firstName: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 50,
      },
      lastName: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 50,
      },
      designation: {
        required: true,
        simplealphabeticlatinarabic: true,
        maxlength: 50,
      },
      emailAddress: {
        required: true,
        email: true,
        maxlength: 50,
      },
      phone1: {
        required: true,
        number: true,
        digits: true,
        pattern: /^(050|054|055|056|052)/,
        minlength: 10,
        maxlength: 10,
      },
      companyName: {
        required: true,
        maxlength: 50,
        simplealphabeticlatinarabic: true,
      },
      socialAd: {
        required: true,
      },
    },
    messages: messagelocal,
    submitHandler: function (form) {
      return false;
    },
  });
})();
