var swiper = new Swiper(".slider-outlet-brands", {
  autoplay: false,
  slidesPerView: 8,
  slidesPerColumn: 2,
  simulateTouch: true,
  noSwiping: true,
  noSwipingClass: "no-swap-desktop",

  breakpoints: {
    1024: {
      slidesPerView: 6,
      slidesPerColumn: 2,
      spaceBetweenSlides: 60,
      noSwiping: false,
    },
    788: {
      slidesPerView: 4,
      slidesPerColumn: 2,
      noSwiping: false,
      spaceBetweenSlides: 30,
    },
    767: {
      slidesPerView: 2,
      slidesPerColumn: 2,
      noSwiping: false,
      spaceBetweenSlides: 60,
    },
  },
});
