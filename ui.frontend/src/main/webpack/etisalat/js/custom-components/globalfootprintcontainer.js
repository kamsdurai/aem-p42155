import {isMobile, IsMediaQuery} from '../../../global/js/helpers';
import { swiperInit } from "../../../global/js/swiperInitialize";

if ($(".globalfootprintcontainer").length > 0) {
  var $slider = $(".globalfootprintcontainer").find('.swiper-gallery-slide');
  var galleryTop = swiperInit('.swiper-gallery-slide', {
    spaceBetween: 10,
    effect: 'fade',
    nextButton: $slider.find('.swiper-button-next'),
    prevButton: $slider.find('.swiper-button-prev'),
    loop: true,
    loopedSlides: 16,
    breakpoints: {
      991: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
  });
  var galleryThumbs = swiperInit('.swiper-gallery-thumbs', {
    spaceBetween: 10,
    speed:900,
    centeredSlides: false,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 16,
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      991: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
  });
  galleryTop.params.control = galleryThumbs;
  galleryThumbs.params.control = galleryTop;
}

if (!IsMediaQuery.md.matches) {
  const ANDRIOD_CTA = $(".download1");
  const APPLE_CTA = $(".download2");

  if (isMobile.Android()) {
    ANDRIOD_CTA.show();
    APPLE_CTA.hide();
  }

  if (isMobile.iOS()) {
    ANDRIOD_CTA.hide();
    APPLE_CTA.show();
  }
}