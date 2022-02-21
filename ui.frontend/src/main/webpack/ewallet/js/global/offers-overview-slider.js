$(document).ready(function () {
  var swiper = new Swiper(".slider-offerNew", {
    slidesPerView: 3,
    spaceBetween: 25,
    noSwiping: true,
    noSwipingClass: "no-swap-desktop-new",
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 20,
        noSwiping: true,
      },
      736: {
        slidesPerView: "auto",
        spaceBetween: 20,
        noSwiping: false,
      },
    },
  });

  var swiper = new Swiper(".slider-featureOffer", {
    slidesPerView: 3,
    spaceBetween: 25,
    noSwiping: true,
    noSwipingClass: "no-swap-desktop-feature",
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
        noSwiping: true,
      },
      736: {
        slidesPerView: "auto",
        spaceBetween: 20,
        noSwiping: false,
      },
    },
  });
});
