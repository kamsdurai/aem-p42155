import { FORM_VALIDATION_MESSAGES } from "../../../global/js/constant";

(function () {
  const $FORM = $("#proxyform");
  const $SUBMIT_CTA = $("#proxyform .cmp-form-button");

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
      name: FORM_VALIDATION_MESSAGES.EN.name,
      emailAddress: FORM_VALIDATION_MESSAGES.EN.emailAddress,
      reason: FORM_VALIDATION_MESSAGES.EN.reason,
    },
    ar: {
      name: FORM_VALIDATION_MESSAGES.AR.name,
      emailAddress: FORM_VALIDATION_MESSAGES.AR.emailAddress,
      reason: FORM_VALIDATION_MESSAGES.AR.reason,
    },
  };

  if (document.documentElement.lang == "ar") {
    messagelocal = validateMessage.ar;
  } else {
    messagelocal = validateMessage.en;
  }

  $FORM.validate({
    rules: {
      name: {
        required: true,
        realalphabeticlatinarabic: true,
        maxlength: 248,
      },
      email: {
        required: true,
        email: true,
      },
      phone1: {
        required: true,
        number: true,
        digits: true,
        pattern: /^(02|03|04|06|07|09|050|054|055|056|052)/,
        minlength: function (element) {
          return /^(02|03|04|06|07|09)/i.test(element.value) ? 7 : 10;
        },

        maxlength: 10,
      },
      url: {
        required: true,
        urlvalid: true,
      },
      reason: {
        required: true,
        richtext: true,
      },
    },
    messages: messagelocal,
    submitHandler: function (form) {
      return true;
    },
  });
})();
