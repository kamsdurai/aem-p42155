(function ($) {
  /**
   * Set default settings for jquery validate plugin
   * -------------------------------------------------------------------------------
   */
  var alertIcon = `<div class="alert-icon"><svg xmlns:xlink="http://www.w3.org/1999/xlink">
         <use xlink:href="#error-icon-red">
          <symbol id="error-icon-red" viewBox="0 0 64 64">
            <defs></defs>
            <g id="icon_error" stroke="none" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"  stroke-linejoin="round">
                <g id="icon_error_red_64" stroke="#BE1218"> 
                <g id="@-Self-Care-/-Icon-/-Outline-/-Error-/-red">
                <path d="M59.9958503,31.5126196 C60.2643926,46.9726045 47.4634532,59.7271876 31.9999998,59.9956917 C16.5390919,60.2641958 4.27269159,47.9486362 4.00414931,32.4873787 C3.73560704,17.0273937 16.5378192,4.27281071 31.9999998,4.00430657 C47.4634532,3.73580243 59.727308,16.0564522 59.9958503,31.5126196 L59.9958503,31.5126196 Z" id="Line"></path>
                <g id="Group-2" fill-rule="evenodd" transform="translate(20.000000, 20.000000)">
                     <path d="M24,0 L0,24" id="Line"></path>
                    <path d="M24,24 L0,0" id="Line"></path>
                    </g>
                </g>
                </g>
              </g>
            </symbol>
            </use>
         </svg>
        </div>`;

  /**
   * Set the defaults for jQuery Validate
   */
  function setValidationDefaults() {
    $.validator.setDefaults({
      errorClass: "has-error",
      errorElement: "div",
      highlight: function (element, errorClass, validClass) {
        $(element).closest(".form-group").addClass("has-error-fields");
        $(element).closest(".cmp-form-options").addClass("has-error-fields"); // for select dropdown
        $(element).removeClass(validClass);
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).closest(".form-group").removeClass("has-error-fields");
        $(element).closest(".cmp-form-options").removeClass("has-error-fields"); // for select dropdown
        $(element).removeClass(errorClass).addClass(validClass);
      },
      errorPlacement: function (error, element) {
        const $element = $(element).next();

        if ($(element).hasClass("cmp-form-options__field--drop-down")) {
          error.addClass("alert-label").insertBefore($element);
          $(alertIcon).insertBefore(error);
        } else if ($(element).parents().hasClass("iti--allow-dropdown")) {
          const $parentElement = $($element).parents(".cmp-form-text");
          error.addClass("alert-label").insertAfter($element);
          $parentElement.append(alertIcon);
          //$(alertIcon).insertBefore(error);
        } else {
          error.addClass("alert-label").insertAfter($element);
          $(alertIcon).insertAfter(error);
        }
      },
      debug: false,
    });

    /**
     * Additional Validation Rules (extracted from additional-methods.js)
     */
    $.validator.addMethod(
      "internetUserNameValidation",
      function (value, element) {
        return this.optional(element) || /^[a-z]+[0-9a-z]*$/g.test(value);
      },
      "Capital letters, space and special character are not allowed",
    );

    /**
     * Additional Validation Rules (extracted from additional-methods.js)
     */
    $.validator.addMethod(
      "alphanumeric",
      function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
      },
      "Letters, numbers, and underscores only please",
    );

    // $.validator.addMethod('etiname', function (value, element) {
    //   return this.optional(element) || /^[a-zA-Z\u0600-\u06FF\s]{1,248}\$/i.test(value);
    // }, 'Letters latin and arabic, numbers, and spaces only please');

    // accept only letters and digits, spaces, no underscore
    $.validator.addMethod(
      "realalphanumeric",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s0-9\-]+$/i.test(value);
      },
      "Letters, numbers, and spaces only please",
    );

    // accept only letters and digits, spaces, no underscore
    $.validator.addMethod(
      "realalphanumericnospace",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
      },
      "Letters and numbers only please",
    );

    // accept only letters and spaces only
    $.validator.addMethod(
      "realalphabetic",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
      },
      "Letters, and spaces only please",
    );

    // accept only letters, spaces, no underscore
    $.validator.addMethod(
      "realalphabeticlatinarabic",
      function (value, element) {
        return (
          this.optional(element) ||
          /^[a-zA-Z\u0600-\u0660-\u0669\u06ff\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd92-\ufdc7\ufe70-\ufefc\uFDF0-\uFDFD\s]+$/i.test(value)
        );
      },
      "Letters, and spaces only please",
    );

    // accept only letters, spaces, no underscore arabic no special letter
    $.validator.addMethod(
      "simplealphabeticlatinarabic",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]+$/i.test(value);
      },
      "Letters only please",
    );

    // mobile number pattern
    $.validator.addMethod(
      "mobile",
      function (value, element) {
        return this.optional(element) || /^(050|054|055|056|052)/i.test(value);
      },
      "Invalid format.",
    );

    // mobile number pattern
    $.validator.addMethod(
      "internationalmobile",
      function (value, element) {
        return this.optional(element) || /^(050|054|055|056|052)/i.test(value);
      },
      "Invalid format.",
    );

    $.validator.addMethod(
      "integer",
      function (value, element) {
        return this.optional(element) || /^-?\d+$/.test(value);
      },
      "A positive or negative non-decimal number please",
    );

    $.validator.addMethod(
      "lettersonly",
      function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
      },
      "Letters only please",
    );

    $.validator.addMethod(
      "letterswithbasicpunc",
      function (value, element) {
        return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
      },
      "Letters or punctuation only please",
    );

    $.validator.addMethod(
      "documentNumber",
      function (value, element) {
        return this.optional(element) || /^[^\/|\-][A-Za-z0-9/\-\s]+$/i.test(value);
      },
      "Please enter valid document number",
    );

    $.validator.addMethod(
      "passwordf",
      function (value, element) {
        return this.optional(element) || /^(?=.*[A-Za-z]{2})(?=.*\d{2})[A-Za-z\d]{8,}$/i.test(value);
      },
      "At least 2 numbers,  2 alphabets & no special characters",
    );

    $.validator.addMethod(
      "passwordfa",
      function (value, element) {
        return this.optional(element) || /^(?=.*[A-Za-z]{1})(?=.*\d{1})[A-Za-z\d]{8,}$/i.test(value);
      },
      "At least 1 numbers,  1 alphabets & no special characters",
    );

    $.validator.addMethod(
      "notEqualTo",
      function (value, element, param) {
        return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
      },
      "Please enter a different value, values must not be the same.",
    );

    $.validator.addMethod(
      "internetUserId",
      function (value, element) {
        return this.optional(element) || /^[a-z]([0-9]|[a-z])+$/g.test(value);
      },
      "Not starts with a number and only contain letters or numbers",
    );

    $.validator.addMethod(
      "elifeUserId",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\@.-]+$/i.test(value);
      },
      "Letters, spaces and . - @ only please",
    );

    // select2 require validaiton
    $.validator.addMethod(
      "valueNotEquals",
      function (value, element, arg) {
        return arg !== value;
      },
      "Value must not equal arg.",
    );

    /**
     * Return true if the field value matches the given format RegExp
     *
     * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
     * @result true
     *
     * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
     * @result false
     *
     * @name $.validator.methods.pattern
     * @type Boolean
     * @cat Plugins/Validate/Methods
     */
    $.validator.addMethod(
      "pattern",
      function (value, element, param) {
        if (this.optional(element)) {
          return true;
        }
        if (typeof param === "string") {
          param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
      },
      "Invalid format.",
    );

    $.validator.addMethod(
      "MobilePattern",
      function (value, element, param) {
        if (this.optional(element)) {
          return true;
        }
        if (typeof param === "string") {
          param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
      },
      "your customized message",
    );
    $.validator.addMethod(
      "mobPattern",
      function (value, element, param) {
        if (this.optional(element)) {
          return true;
        }
        if (typeof param === "string") {
          param = new RegExp("^(?:" + param + ")$");
        }
        return param.test(value);
      },
      "Format 05X-XXXX-XXX.",
    );

    /**
     * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
     *
     * @example $.validator.methods.date("01/01/1900")
     * @result true
     *
     * @example $.validator.methods.date("01/13/1990")
     * @result false
     *
     * @example $.validator.methods.date("01.01.1900")
     * @result false
     *
     * @example <input name="pippo" class="{dateITA:true}" />
     * @desc Declares an optional input element whose value must be a valid date.
     *
     * @name $.validator.methods.dateITA
     * @type Boolean
     * @cat Plugins/Validate/Methods
     */
    $.validator.addMethod(
      "dateITA",
      function (value, element) {
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        var adata;
        var gg;
        var mm;
        var aaaa;
        var xdata;
        if (re.test(value)) {
          adata = value.split("/");
          gg = parseInt(adata[0], 10);
          mm = parseInt(adata[1], 10);
          aaaa = parseInt(adata[2], 10);
          xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
          if (xdata.getUTCFullYear() === aaaa && xdata.getUTCMonth() === mm - 1 && xdata.getUTCDate() === gg) {
            check = true;
          } else {
            check = false;
          }
        } else {
          check = false;
        }
        return this.optional(element) || check;
      },
      $.validator.messages.date,
    );

    /**
     * Custom password rule that respect Etisalat rules
     */
    $.validator.addMethod(
      "etipassword",
      function (value, element) {
        return this.optional(element) || /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@._-]{5,248})/.test(value);
      },
      "Password not valid",
    );

    /**
     * Custom password rule that respect Etisalat rules except captial letter optional
     */
    $.validator.addMethod(
      "regpassword",
      function (value, element) {
        return this.optional(element) || /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9_@\-]{5,248}$/.test(value);
      },
      "Password invalid",
    );

    /**
     * Custom username/userid rule that respect Etisalat rules
     */
    $.validator.addMethod(
      "userid",
      function (value, element) {
        return this.optional(element) || /^(?=.*[0-9a-zA-Z])([a-zA-Z0-9@._-]{5,100})$/.test(value);
      },
      "Username not valid",
    );

    /**
     * Mutual Exclusive fields validation
     */
    $.validator.addMethod(
      "mutualex",
      function (value, element, param) {
        // Current value, Validated element, Parameters

        var target = $(param);
        var source = $(element);

        if (source.val().length === 0 && target.val().length === 0) {
          return false;
        }

        if (source.val().length > 0 && target.val().length > 0) {
          return false;
        }

        return true;
      },
      "These 2 fields cannot be filled simultaneausly",
    );

    /**
     * Custom email validation
     */
    $.validator.addMethod(
      "email2",
      function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return (
          this.optional(element) ||
          /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
            value,
          )
        );
      },
      "Please enter a valid email address.",
    );

    $.validator.addMethod(
      "email",
      function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return this.optional(element) || /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value);
      },
      "Please enter a valid email address.",
    );

    /**
     * Custom url validation
     */
    $.validator.addMethod(
      "urlvalid",
      function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return this.optional(element) || /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value);
      },
      "Please enter a valid URL.",
    );

    //

    // accept only letters  spaces number and ?-.@,""() only
    $.validator.addMethod(
      "richtext",
      function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s\?@,()"!\-\.]+$/i.test(value);
      },
      "special character not allowed",
    );

    // if the page is set for arabic language, then set the default messages for arabic
    if ($("html").attr("lang") === "ar") {
      /*
       * Translated default messages for the jQuery validation plugin.
       * Locale: AR (Arabic; العربية)
       */
      $.extend($.validator.messages, {
        required: "هذا الحقل إلزامي",
        remote: "يرجى تصحيح هذا الحقل للمتابعة",
        email: "رجاء إدخال عنوان بريد إلكتروني صحيح",
        email2: "رجاء إدخال عنوان بريد إلكتروني صحيح",
        url: "رجاء إدخال عنوان موقع إلكتروني صحيح",
        date: "رجاء إدخال تاريخ صحيح",
        dateISO: "رجاء إدخال تاريخ صحيح (ISO)",
        number: "رجاء إدخال عدد بطريقة صحيحة",
        digits: "رجاء إدخال أرقام فقط",
        creditcard: "رجاء إدخال رقم بطاقة ائتمان صحيح",
        equalTo: "رجاء إدخال نفس القيمة",
        simplealphabeticlatinarabic: " الرجاء ادخال احرف و مسافة فقط ",
        alphanumeric: "الحروف والأرقام والشرط فقط من فضلك",
        extension: "رجاء إدخال ملف بامتداد موافق عليه",
        maxlength: $.validator.format("الحد الأقصى لعدد الحروف هو {0}"),
        minlength: $.validator.format("الحد الأدنى لعدد الحروف هو {0}"),
        rangelength: $.validator.format("عدد الحروف يجب أن يكون بين {0} و {1}"),
        range: $.validator.format("رجاء إدخال عدد قيمته بين {0} و {1}"),
        max: $.validator.format("رجاء إدخال عدد أقل من أو يساوي (0}"),
        min: $.validator.format("رجاء إدخال عدد أكبر من أو يساوي (0}"),
      });
    }
  }

  const checkForLetters = (event) => {
    const inputValue = event.which;
    const inputValueForArabic = event.key;
    const isArabic = /^[\u0600-\u06ff\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd92-\ufdc7\ufe70-\ufefc\uFDF0-\uFDFD\s]/;

    // allow letters, whitespaces and arabic characters only.
    if (!(inputValue >= 65 && inputValue <= 122) && inputValue !== 32 && inputValue !== 0 && !isArabic.test(inputValueForArabic)) {
      event.preventDefault();
    }
  };
  const EWALLET_FIRST_NAME = $("#ewalletFirstName");
  const EWALLET_LAST_NAME = $("#ewalletLastName");

  setValidationDefaults();
  EWALLET_FIRST_NAME.keypress(checkForLetters);
  EWALLET_LAST_NAME.keypress(checkForLetters);
})(jQuery);
