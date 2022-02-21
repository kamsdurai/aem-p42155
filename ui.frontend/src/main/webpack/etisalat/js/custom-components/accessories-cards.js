import { swiperInit } from "../../../global/js/swiperInitialize";

//function to pass swiper options collectively
const swiperOptions = (elem, next, prev, brPoint1, brPoint2, brPoint3, brPoint4, brPoint5) => {
  return {
      slidesPerView: 2.2,
      scrollbar: elem.find(".scrollbar"),
      nextButton: next,
      prevButton: prev,
      scrollbarHide: false,
      scrollbarDraggable: true,
      breakpoints: {
      540: {
          slidesPerView: brPoint1,
      },
      768: {
          slidesPerView: brPoint2,
      },
      1200: {
          slidesPerView: brPoint3,
      },
      1439: {
          slidesPerView: brPoint4,
      },
      9999: {
          slidesPerView: brPoint5,
      },
      },
  };
};

// accessories slider
function initAccessorySwiper() {
  $(document).find('.accessories-wrapper.with-slider').each(function (index) {
    $(this).addClass('card-slider'+index);
    var $slider = $(this);
    $slider.find('.next').addClass('right'+index);
    $slider.find('.prev').addClass('left'+index);
    var slidesCount = $slider.find('.swiper-slide').length;
    $slider.addClass('remove-controls');
    $slider.removeClass('remove-controls'); 
    var $accessoriesSlider = swiperInit(".card-slider" + index + " .swiper-container", swiperOptions($slider, ".next.right" + index, ".prev.left" + index, 2.2, 4, 4, 6, 7));


    if (slidesCount > 7) {
        $slider.removeClass('remove-controls'); 
    } else if (window.innerWidth < 1200) {
        $slider.removeClass('remove-controls'); 
        var $accessoriesSlider = swiperInit('.card-slider'+index+' .swiper-container', swiperOptions($slider, ".next.right" + index, ".prev.left" + index, 2.2, 4, 4, 6, 7));
    } else {
        $slider.addClass('remove-controls');
    }
  });
}

//etisalat reccommendations cards
function initRecommendationSwiper() {
    $(document).find('.eti-recommendation-wrapper.with-slider').each(function (index) {
      $(this).addClass('eti-card-slider'+index);
      var $slider = $(this);
      $slider.find('.next').addClass('eti-right'+index);
      $slider.find('.prev').addClass('eti-left'+index);
      var etiSlidesCount = $slider.find('.swiper-slide').length;
      $slider.addClass('remove-controls');
      $slider.removeClass('remove-controls'); 
      var $accessoriesSlider = swiperInit('.eti-card-slider'+index+' .swiper-container', swiperOptions($slider, ".next.eti-right" + index, ".prev.eti-left" + index, 2.2, 3, 3, 4, 5));


      if (etiSlidesCount > 5) {
          $slider.removeClass('remove-controls'); 
      } else if (window.innerWidth < 1200) {
          $slider.removeClass('remove-controls'); 
          var $accessoriesSlider = swiperInit('.eti-card-slider'+index+' .swiper-container', swiperOptions($slider, ".next.eti-right" + index, ".prev.eti-left" + index, 2.2, 3, 3, 4, 5));
      } else {
          $slider.addClass('remove-controls');
      }
    });
}

//etisalat reccommendations cards big
function initBigRecommendationSwiper() {
    $(document).find('.eti-recommendation-big-card.with-slider').each(function (index) {
      $(this).addClass('eti-big-card-slider'+index);
      var $slider = $(this);
      $slider.find('.next').addClass('eti-big-right'+index);
      $slider.find('.prev').addClass('eti-big-left'+index);
      var etiSlidesCount = $slider.find('.swiper-slide').length;
      $slider.addClass('remove-controls');
      $slider.removeClass('remove-controls'); 
      var $accessoriesBigCardSlider = swiperInit('.eti-big-card-slider'+index+' .swiper-container', swiperOptions($slider, '.next.eti-big-right'+index, '.prev.eti-big-left'+index, 2.2, 2.5, 2.5, 3, 3));

      if (etiSlidesCount > 3) {
          $slider.removeClass('remove-controls'); 
      } else if (window.innerWidth < 1200) {
          $slider.removeClass('remove-controls'); 
          var $accessoriesSlider = swiperInit('.eti-big-card-slider'+index+' .swiper-container', swiperOptions($slider, '.next.eti-big-right'+index, '.prev.eti-big-left'+index, 2.2, 2.5, 2.5, 3, 3));
      } else {
          $slider.addClass('remove-controls');
      }

    });
}

// brands logos
function initBrandsLogo() {
    $(document).find('.brands-logo.with-slider').each(function (index) {
      $(this).addClass('brands-slider'+index);
      var $slider = $(this);
      $slider.find('.next').addClass('logo-right'+index);
      $slider.find('.prev').addClass('logo-left'+index);
      var etiSlidesCount = $slider.find('.swiper-slide').length;
      $slider.addClass('remove-controls');
      $slider.removeClass('remove-controls'); 
      var $accessoriesBigCardSlider = swiperInit('.brands-slider'+index+' .swiper-container', swiperOptions($slider, '.next.logo-right'+index, '.prev.logo-left'+index, 3.5, 5, 6, 9, 9));

      if (etiSlidesCount > 9) {
          $slider.removeClass('remove-controls'); 
      } else if (window.innerWidth < 1200) {
          $slider.removeClass('remove-controls'); 
          var $accessoriesSlider = swiperInit('.brands-slider'+index+' .swiper-container', swiperOptions($slider, '.next.logo-right'+index, '.prev.logo-left'+index, 3.5, 5, 6, 9, 9));
      } else {
          $slider.addClass('remove-controls');
      }
    });
}

// register the event handlers
$(document).ready(function() {
  initAccessorySwiper();
  initRecommendationSwiper();
  initBigRecommendationSwiper();
  initBrandsLogo()
});
