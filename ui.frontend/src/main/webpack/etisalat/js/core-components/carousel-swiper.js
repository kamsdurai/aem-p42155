/* eslint-disable no-undef */
import { swipedInit } from "../swipedEvents";

(function ($) {
  function initCarouselSwiper() {
    const carouselContainer = document.querySelector(".carousel");
    const carouselSwiperContainer = $(".cmp-carousel.swiper-enabled");
    
    carouselSwiperContainer.each(function () {
      swipedInit(carouselContainer, "swiped-left", ".cmp-carousel__action--next");
      swipedInit(carouselContainer, "swiped-right", ".cmp-carousel__action--previous");
    });
  };

  $(document).ready(function () {
    initCarouselSwiper();
  });
})(jQuery);
