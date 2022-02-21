import { swiperInit } from "../../../global/js/swiperInitialize";

//shop swiper st
function initTileBoxesSlider() {
  // plans table slider for CMS modules start
  $(document)
    .find(".tilecontainer .tile-boxes-section")
    .each(function (index) {
      $(this).addClass("t-b-slider" + index);
      var $tileBoxesCarousal = swiperInit(".t-b-slider" + index + " .swiper-container", {
        scrollbar: $(this).find(".scrollbar"),
        scrollbarHide: false,
        scrollbarDraggable: true,
        breakpoints: {
          540: {
            slidesPerView: 1.35,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2.35,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          9999: {
            centeredSlides: false,
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });
    });
  // plans table slider for CMS modules ends

  $(document)
    .find(".tilecontainer .tileBoxMobCarWrap")
    .each(function (itemindex) {
      var swiperSlideLength = $(this).find(".swiper-slide").length;
      $(this).addClass("swiper-with-" + swiperSlideLength + "-slides");
      if ($(window).width() > 991) {
        $(this).find(".tileboxCarousal").addClass("destroyed");
      } else {
        var $carouselSlider = swiperInit($(this).find(".tileboxCarousal"), {
          loop: false,
          autoplay: false,
          slidesPerView: 1,
          simulateTouch: true,
          pagination: ".swiper-pagination",
          touchEventsTarget: "swiper-wrapper",
          scrollbarDraggable: true,
          scrollbarHide: false,
          scrollbar: $(this).find(".table-swiper-scrollbar"),
          centeredSlides: true,
          spaceBetween: 20,
        });
      }
    });
}

// register the event handlers
$(document).ready(function () {
  initTileBoxesSlider();
  if ($(window).width() < 992) {
  }
});
//shop swiper en

//insurance swiper st
// External carousel for mobile only

//insurance swiper en
