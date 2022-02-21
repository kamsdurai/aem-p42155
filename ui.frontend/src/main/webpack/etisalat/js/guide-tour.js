/* eslint-disable*/

export const GUIDE_TOUR_POPUP = () => {
  const POPUP_CTA = $(".guide-tour");
  if (!POPUP_CTA.length) {
    return false;
  }

  // popup
  $(".guide-tour")
    .off()
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var dataLabel = $(this).attr("data-label");
      if (typeof dataLabel !== "undefined" && dataLabel !== "") {
        $("#" + dataLabel).addClass("show");
        $("body").addClass("freeze no-scroll");
      }
    });

  // close popup
  $(".guide-tour-modal")
    .off()
    .on("click", ".nv-modal-close", function (e) {
      e.stopPropagation();
      e.preventDefault();
      var currentOpendPopUp = $(this).closest(".nv-modal");
      $(currentOpendPopUp).removeClass("show");
      $(currentOpendPopUp).css("display", "none");
      $("body").removeClass("freeze no-scrol");
    });

  var current = 1,
    steps;
  steps = $(".guide-section").length;

  function updateItems(delta) {
    var $items = $(".multi-step").children();
    var $current = $items.filter(".current");
    $current = $current.length ? $current : $items.first();
    var index = $current.index() + delta;
    // Range check the new index
    index = index < 0 ? 0 : index > $items.length ? $items.length : index;
    $current.removeClass("current");
    $current = $items.eq(index).addClass("current");
    // Hide/show the next/prev
    $(".back").toggle(!$current.is($items.first()));
    $(".next").toggle(!$current.is($items.last()));
    $(".started").toggle(!$current.is($items.last()));
    if (!$current.is($items.last())) {
      $(".started").hide();
    } else {
      $(".started").show();
    }
  }
  $(".next").click(function () {
    setProgressBar(++current);
    updateItems(1);
  });
  $(".back").click(function () {
    setProgressBar(--current);
    updateItems(-1);
  });
  // Cause initial selection
  updateItems(0);

  setProgressBar(current);
  // Change progress bar action
  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width", percent + "%")
      .html(percent + "%");
  }
};
