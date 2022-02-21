import { swiperInit } from "../../../global/js/swiperInitialize";

//function to pass swiper options collectively
const swiperOptions = (elem, next, prev, loopVal, dragVal, slideView1, slideView2, slideView3, slideView4, slideView5) => {
  return {
    scrollbar: elem.find(".scrollbar"),
    touchEventsTarget: "swiper-wrapper",
    autoplay: false,
    loop: loopVal,
    scrollbarDraggable: dragVal,
    simulateTouch: true,
    scrollbarHide: false,
    nextButton: next,
    prevButton: prev,
    breakpoints: {
      540: {
        spaceBetween: slideView1,
        slidesPerView: 2,
      },
      768: {
        spaceBetween: slideView2,
        slidesPerView: 2,
      },
      1024: {
        spaceBetween: slideView3,
        slidesPerView: 2,
      },
      1440: {
        spaceBetween: slideView4,
        slidesPerView: 3,
      },
      9999: {
        spaceBetween: slideView5,
        slidesPerView: 3,
      },
    },
  };
};

function initContextSwiper() {
  $(document)
    .find(".tilecontainer  .context-navigation-4-0.with-slider")
    .each(function (index) {
      $(this).addClass("c-n-slider" + index);
      var $slider = $(this);
      $slider.find(".next").addClass("right" + index);
      $slider.find(".prev").addClass("left" + index);
      var $contextNavigation = swiperInit(
        ".c-n-slider" + index + " .swiper-container",
        swiperOptions($slider, ".next.right" + index, ".prev.left" + index, false, true, 96, 96, 24, 24, 24),
      );
    });
}

function initContextSwiperWithLoop() {
  $(document)
    .find(".tilecontainer.endless-swiper .context-navigation-4-0.with-loop")
    .each(function (index) {
      $(this).addClass("c-n-slider-loop" + index);
      var $sliderLoop = $(this);
      $sliderLoop.find(".next").addClass("right-loop" + index);
      $sliderLoop.find(".prev").addClass("left-loop" + index);
      var $contextNavigation = swiperInit(
        ".c-n-slider-loop" + index + " .swiper-container",
        swiperOptions($sliderLoop, ".next.right-loop" + index, ".prev.left-loop" + index, true, false, 96, 24, 24, 24, 24),
      );
    });
}

// register the event handlers
$(document).ready(function () {
  if ($(window).width() > 767) {
    initContextSwiperWithLoop();
  }

  if ($(window).width() > 992) {
    initContextSwiper();
  }

  $(".context-navigation-4-0").each(function () {
    var len = $(this).find(".all-tiles .context-tile ").length;
    if (len > 3) {
      $(this).find(".load-more").show();
    } else {
      $(this).find(".load-more").hide();
    }
  });

  $(".context-navigation-4-0 .load-more a.btn").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".context-navigation-4-0").find(".all-tiles .context-tile").css("display", "flex");
    $(this).closest(".load-more").css("display", "none");
  });
});
