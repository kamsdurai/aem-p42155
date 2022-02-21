$(document).ready(function () {
  function zoomIn() {
    var $affectedElements = $("p,ul,li,span,b,a,button,h1,h2,h3,h4,h5,h6,strike,svg");

    for (var i = 0; i < $affectedElements.length; i++) {
      $($affectedElements[i]).css({ "font-size": parseInt($($affectedElements[i]).css("font-size")) * (120 / 100) });
    }
    localStorage.setItem("zoom", "large");
  }
  //  zoomIn()

  function resetDefault() {
    var $affectedElements = $("p,ul,li,span,b,a,button,h1,h2,h3,h4,h5,h6,strike,svg");

    //$affectedElements.find("*").css({ 'font-size': '' });
    for (var i = 0; i < $affectedElements.length; i++) {
      $($affectedElements[i]).css({ "font-size": "" });
    }
    localStorage.setItem("zoom", "small");
  }
  $(".open-accessibility-popup")
    .off()
    .on("click", function () {
      //var currentPopUp = $(this).find('.accessibility-popup');
      if ($(this).hasClass("mobile-accessibility-popup")) {
        const accessibilityOverlay = $(".accessibility-overlay");
        $("body").append(accessibilityOverlay);
      }
      setTimeout(function () {
        $(".modal-backdrop").hide();
      }, 10);
      $(".accessibility-overlay").modal("show");
      $("body").addClass("freeze");
    });

  $(".accessibility-overlay").on("hidden.bs.modal", function (e) {
    $("body").removeClass("freeze");
  });

  var closePopUp = function (e) {
    e.stopPropagation();
    e.preventDefault();
    var currentOpendPopUp = $(this).closest(".accessibility-overlay");
    $(currentOpendPopUp).removeClass("in");
    $(currentOpendPopUp).modal("hide");
    $(currentOpendPopUp).css("display", "none");
  };
  $(".accessibility-overlay").off("click").on("click", ".closing", closePopUp);

  $(".acc-theme-controller").on("click", function () {
    var radio = $(this).children('input[type="radio"]');
    var themeName = $(this).find("span").text();
    if ($("html").attr("lang") === "ar") {
      $(".selector-toggle-container-colored .selector-toggle-title").html("<strong> الألوان:  </strong> " + themeName);
    } else {
      $(".selector-toggle-container-colored .selector-toggle-title").html("<strong> Colour : </strong> " + themeName);
    }

    $("body").removeClass(function (index, className) {
      return (className.match(/\bacc-\S+/g) || []).join(" ");
    });
    $("body").addClass(radio.prop("value"));
    radio.prop("checked", !radio.prop("radio"));
    localStorage.setItem("theme", radio.prop("value"));
  });

  const PAGE_TYPE = $("body").hasClass("consumer__page");

  if (PAGE_TYPE) {
    if (localStorage.getItem("zoom") == "large") {
      zoomIn();
      $(".selector-toggle-item").children('input[type="radio"][value=large]').prop("checked", true);
      if ($("html").attr("lang") === "ar") {
        $(".acc-font-controller .selector-toggle-title").html("<strong> حجم الخط : </strong> كبير");
      } else {
        $(".acc-font-controller .selector-toggle-title").html("<strong> Text size : </strong> Large");
      }
    }
    if (localStorage.getItem("theme")) {
      $("body").addClass(localStorage.getItem("theme"));
      $(".acc-theme-controller")
        .children('input[type="radio"][value=' + localStorage.getItem("theme") + "]")
        .prop("checked", true);
      var themeName = $("input[value=" + localStorage.getItem("theme") + "]")
        .parent()
        .find("span")
        .text();
      if ($("html").attr("lang") === "ar") {
        $(".selector-toggle-container-colored .selector-toggle-title").html("<strong> الألوان:  </strong> " + themeName);
      } else {
        $(".selector-toggle-container-colored .selector-toggle-title").html("<strong> Colour : </strong> " + themeName);
      }
    }
  }

  $(".acc-font-controller .selector-toggle-item").on("click", function () {
    var radio = $(this).children('input[type="radio"]');
    if (radio.is(":checked")) {
      return;
    }
    radio.prop("checked", !radio.prop("radio"));
    if (radio.prop("value") == "small") {
      resetDefault();

      if ($("html").attr("lang") === "ar") {
        $(".acc-font-controller .selector-toggle-title").html("<strong> حجم الخط : </strong> متوسط");
      } else {
        $(".acc-font-controller .selector-toggle-title").html("<strong> Text size : </strong> Standard");
      }
    } else {
      zoomIn();

      if ($("html").attr("lang") === "ar") {
        $(".acc-font-controller .selector-toggle-title").html("<strong> حجم الخط : </strong> كبير");
      } else {
        $(".acc-font-controller .selector-toggle-title").html("<strong> Text size : </strong> Large");
      }
    }
  });
});
