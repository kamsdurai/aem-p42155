(function(){
$(document).ready(function () {
  localStorage.setItem("FEED_BACK", JSON.stringify([]));

  $(".share-feedback-btn")
    .off()
    .on("click", function () {
      $(".cfm .nv-modal").addClass("show");
      $(".share-feedback-btn").hide();
      // resetSurvy()
    });
  $(".nv-modal-close.feedback-toggle")
    .off()
    .on("click", function () {
      $(".cfm .nv-modal").removeClass("show");
      $(".share-feedback-btn").show();
      resetSurvy();
    });

  $(".short-survey")
    .off()
    .on("click", function () {
      $(".question-1").show();
      $(".feedback-type").hide(), $(".questions-row").show();
    });

  $(".long-survey")
    .off()
    .on("click", function () {
      $(".question-final").show();
      $(".feedback-type").hide();
      $(".questions-row").show();
    });

  $(".next-q")
    .off()
    .on("click", function () {
      $(".questions").hide();
      $("." + $(this).data("nextstep")).show();
    });

  $(".prev-q")
    .off()
    .on("click", function () {
      $(".questions").hide();
      $("." + $(this).data("prevstep")).show();
    });

  $(".feedback-comment").on("keypress", function () {
    if ($(this).val().length > 0) {
      $(".remaining-chars-container").show();
      $(".remaining-chars").text(2000 - $(this).val().length);
      $(".submit-feedback").prop("disabled", false);
      $(".feedback-comment + label").hide();
    }
  });

  $(".feedback-comment").keyup(function (e) {
    if (e.keyCode == 8) {
      $(".remaining-chars").text(2000 - $(this).val().length);
      if ($(this).val().length == 0) {
        $(".submit-feedback").prop("disabled", true);
        $(".remaining-chars-container").hide();
        $(".feedback-comment + label").show();
      }
    }
  });

  $(".cfm .selector-item").on("click", function () {
    var radio = $(this).children('input[type="radio"]');
    radio.prop("checked", !radio.prop("radio"));
    var allAnwsers = JSON.parse(localStorage.getItem("FEED_BACK"));
    if (allAnwsers == null) allAnwsers = [];

    var feedbackOBJ = {
      questionGuid: radio.data("question"),
      answerGuid: radio.data("option"),
    };
    if (radio.attr("name") == "exploring" || radio.attr("name") == "shopping" || radio.attr("name") == "enquiry" || radio.attr("name") == "payment") {
      $(".screen-one-last-section").removeClass("d-none");
      $('[data-nextstep="question-2"]').prop("disabled", false);
    }

    if ($("[name='easeofnavigating']").is(":checked") && $("[name='Pageuploadtime']").is(":checked") && $("[name='searchfunction']").is(":checked")) {
      $('[data-nextstep="question-3"]').prop("disabled", false);
    }
    if ($("[name='browsingexperience']").is(":checked")) {
      $('[data-nextstep="question-4"]').prop("disabled", false);
    }

    if (feedbackOBJ.answerGuid && feedbackOBJ.questionGuid) {
      allAnwsers.push(feedbackOBJ);
    }
    localStorage.setItem("FEED_BACK", JSON.stringify(allAnwsers));
    console.log(allAnwsers);
  });
  $("#notificationCFM .close").on("click", function () {
    $("#notificationCFM").toggleClass("d-none");
  });
  $(".submit-feedback").on("click", function () {
    var allAnwsers = JSON.parse(localStorage.getItem("FEED_BACK"));
    if (allAnwsers == null) allAnwsers = [];
    if ($(this).data("type") == "etisalatFeedback") {
      var feedbackOBJ = {
        questionGuid: "0d4-7b86ef9f34fa",
        answerGuid: "",
        comment: $(".etisalatFeedback").val(),
      };
      allAnwsers.push(feedbackOBJ);
      localStorage.setItem("FEED_BACK", JSON.stringify(allAnwsers));
    }

    if ($(this).data("type") == "generaSampling" && $(".generaSampling").val()) {
      var feedbackOBJ = {
        questionGuid: "365-f07041ec8cdb",
        answerGuid: "",
        comment: $(".generaSampling").val(),
      };
      allAnwsers.push(feedbackOBJ);
      localStorage.setItem("FEED_BACK", JSON.stringify(allAnwsers));
    }
    var browserName = checkBrowserName();
    var feedbackObject = {
      feedback: {
        language: "en",
        surveyGuid: "ac1-0fba5696fce9",
        browserInfo: browserName,
        answers: JSON.parse(localStorage.getItem("FEED_BACK")),
      },
    };

    $.ajax({
      type: "POST",
      url: "/b2c/eshop/submitCFM",
      data: JSON.stringify(feedbackObject),
      dataType: "json",
      // encode: true,
      contentType: "application/json; charset=utf-8",
      success: function (data, status, jqXHR) {
        $("#notificationCFM").toggleClass("d-none");
        setTimeout(function () {
          $("#notificationCFM").toggleClass("d-none");
        }, 3000);
        $(".cfm .nv-modal").toggleClass("show");
        $(".share-feedback-btn").toggle();
        resetSurvy();
      },
      error: function (jqXHR, status, err) {
        resetSurvy();
        $(".cfm .nv-modal").toggleClass("show");
        $(".share-feedback-btn").toggle();
      },
    });
    // return false to prevent normal browser submit and page navigation
    return false;
  });

  function resetSurvy() {
    // $('.cfm .nv-modal').toggleClass('show');
    $(".questions").hide();
    $(".feedback-type").show();
    // $('.share-feedback-btn').toggle();
    $('input[name="payment"]').prop("checked", false);
    $('input[name="enquiry"]').prop("checked", false);
    $('input[name="shopping"]').prop("checked", false);
    $('input[name="exploring"]').prop("checked", false);
    $('input[name="searchfunction"]').prop("checked", false);
    $('input[name="Pageuploadtime"]').prop("checked", false);
    $('input[name="easeofnavigating"]').prop("checked", false);
    $('input[name="browsingexperience"]').prop("checked", false);
    $(".remaining-chars-container").hide();
    $('[data-type="generaSampling"]').prop("disabled", true);
    $(".next-q").prop("disabled", true);
    $(".feedback-comment").val("");
    $(".feedback-comment + label").show();
  }

  function checkBrowserName() {
    var browserName;
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0) {
      browserName = "Opera";
      return;
    }
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
      return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      return "Firefox";
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
      return "Edge";
    } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
      //IF IE > 10
      return "IE";
    } else {
      return "unknown";
    }
  }
});

})()