/* eslint-disable */
(function () {
  const $FORM = $("#leadOrder");
  const $SUBMIT_CTA = $("#leadOrder .cmp-form-button");

  if (!$FORM.length) {
    return false;
  }

  $SUBMIT_CTA.on("click", function () {
    if ($FORM.valid() == false) {
      return false;
    }
  });

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

  function submitErrorResponse(jqXHR, textStatus, error) {
    let errorText = (jqXHR.responseJSON && jqXHR.responseJSON.message) || error;
    console.log(errorText);
  }

  $FORM.validate({
    rules: {
      firstName: {
        required: true,
        realalphabeticlatinarabic: true,
        maxlength: 248,
      },
      lastName: {
        required: true,
        realalphabeticlatinarabic: true,
        maxlength: 248,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      contactNumber: {
        required: true,
        digits: true,
        pattern: /^(050|054|055|056|052)/,
        minlength: 10,
        maxlength: 10,
      },
      companyName: {
        required: true,
        realalphabeticlatinarabic: true,
        maxlength: 248,
      },
      description: {
        required: true,
      },
    },
    submitHandler: function () {
      const formData = getFormData($FORM);

      const PAYLOAD = {
        accountNumber: formData.accountNumber,
        product: formData.product,
        subject: formData.subject,
        channel: formData.channel,
        existingAccount: formData.existingAccount,
        contactFirstName: formData.firstName,
        contactLastName: formData.lastName,
        email: formData.emailAddress,
        mobileNo: formData.mobileNo,
        companyName: formData.companyName,
        description: formData.description,
      };

      let dataObj = {
        ClientCaptchaValue: formData["g-recaptcha-response"],
        TYPE: "CREATEOMNILEAD",
        REQPAYLOAD: PAYLOAD,
      };

      dataObj = JSON.stringify(dataObj, null, 2);

      $.ajax({
        type: "POST",
        url: "https://www.etisalat.ae/b2bportal/Utility/checkCaptcha.service",
        data: dataObj,
        dataType: "json",

        headers: {
          "content-type": "application/json",
          "x-calling-application": "cms",
        },

        encode: true,
      })
        .done(function () {
          return true;
        })
        .fail(submitErrorResponse);
    },
  });

  $(".cmp-form").on("change", "input[name=existingAccount]", function () {
    if (this.value == "yes") {
      $(".account-number").removeClass("hide");
    } else {
      $(".account-number").addClass("hide");
    }
  });
})();
