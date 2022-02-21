$(document).ready(function () {
  $(".cmp-experiencefragment--header").addClass("Scroll-Down");
  $(window).scroll(() => {
    var windowTop = $(window).scrollTop();
    if (windowTop > 250) {
      $("#main-header").addClass("Scroll-Up");
      $("#main-header").removeClass("Scroll-Down");
    } else {
      $("#main-header").addClass("Scroll-Down");
      $("#main-header").removeClass("Scroll-Up");
      $("nav ul").css("overflow", "visible");
    }
  });

  $(".menu__icon").on("click", function (e) {
    e.preventDefault();
    $(".main-nav__list").addClass("ShowMenu");
    $(".main-nav__list").toggleClass("Scroll-Down");
    $(".main-nav__list").slideToggle("slow");
  });

  $(".menu li a").on("click", function () {
    $(".ShowMenu").slideToggle("slow");
    $(".main-nav__list").removeClass("ShowMenu");
  });
  //dynamic year
  $('.footer-copyright-year').text(new Date().getFullYear());
});

$(document).on('click', '.main-nav__item a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 40
  }, 300);
});
