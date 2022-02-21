/* eslint-disable */
import { FORM_VALIDATION_MESSAGES } from "../../../global/js/constant";

(function () {
  const NO_SCROLL_CLASS = "no-scroll";
  const $SUCCSS_POP_UP = $(".cmp-experiencefragment--Newsletter-subscription-pop-up");
  const $BODY = $("body");
  const $OVERLAY_CLOSE_CTA = $(".form-close");
  const $FORM = $("#newsletterSubscription");
  const $SUBMIT_CTA = $("#newsletterSubscription .cmp-form-button");
  const $DYNAMIC_EMAIL = $("#form-popup-box .dynamicEmail");

  if (!$FORM.length) {
    return false;
  }

  $SUBMIT_CTA.on("click", function () {
    if ($FORM.valid() === false) {
      return false;
    }
  });

  let messagelocal;
  const validateMessage = {
    en: {
      EmailAddress: FORM_VALIDATION_MESSAGES.EN.EmailAddress,
    },
    ar: {
      EmailAddress: FORM_VALIDATION_MESSAGES.AR.EmailAddress,
    },
  };

  if (document.documentElement.lang === "ar") {
    messagelocal = validateMessage.ar;
  } else {
    messagelocal = validateMessage.en;
  }


  function getFormData($form) {
    var o = {};
    var a = $form.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        o[this.name] = this.value || "";
      }
    });
    return o;
  }

  function submitSuccessResponse() {
    const GET_EMAIL = $("input[name='EmailAddress']").val();
    $DYNAMIC_EMAIL.text(GET_EMAIL);
    $SUCCSS_POP_UP.show();
    $BODY.addClass(NO_SCROLL_CLASS);
    $("input[name='EmailAddress']").val("").removeClass("valid");
    $("input[name='CustomerName']").val("").removeClass("valid");
  }

  function submitErrorResponse(jqXHR, textStatus, error) {
    let errorText = (jqXHR.responseJSON && jqXHR.responseJSON.message) || error;
    console.log(errorText);
  }

  $FORM.validate({
    rules: {
      CustomerName: {
        required: true,
        realalphabeticlatinarabic: true,
        maxlength: 25,
      },
      EmailAddress: {
        required: true, 
        email: true,
      },
    },
    messages: messagelocal,
    submitHandler: function () {
      const ARTI_NAME = $("input[name=ArticleName]").val();
      const formData = getFormData($FORM);
      formData.ArticleName = ARTI_NAME;

      let dataObj = {
        ArticleName: formData.ArticleName,
        CustomerName: formData.CustomerName,
        EmailAddress: formData.EmailAddress,
      };

      dataObj = JSON.stringify(dataObj, null, 2);

      $.ajax({
        type: "POST",
        url: "https://www.etisalat.ae/b2bportal/subscribeNewsLetter.service",
        data: dataObj,
        dataType: "json",

        headers: {
          "content-type": "application/json",
          "x-calling-application": "cms"
        },

        encode: true,
      })
        .done(submitSuccessResponse)
        .fail(submitErrorResponse);
    },
  });

  $OVERLAY_CLOSE_CTA.on("click", (event) => {
    $SUCCSS_POP_UP.hide();
    $BODY.removeClass(NO_SCROLL_CLASS);
  });
})();
