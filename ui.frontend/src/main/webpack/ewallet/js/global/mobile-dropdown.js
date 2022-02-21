/* eslint-disable no-undef */
(function ($) {
  const MEDIA_QUERY = window.matchMedia("(max-width: 991px)");

  const MENU_ICON = $(".menu__icon");
  const MENU_WRAPPER = $(".MenuWrapper");
  const MOB_NON_ACTOVE_CLS = $("#mobile-non-active");
  const MOB_ACTOVE_CLS = $("#mobile-active");

  const URL = window.location.href;
  const ACTIVE_CLS = "active";
  const NO_ACTIVE_CLS = "noactive";

  MENU_ICON.on("click", function (e) {
    e.preventDefault();
    MENU_ICON.toggleClass("CloseBtn");
    MENU_WRAPPER.toggleClass("ShowMenu");
    MENU_WRAPPER.slideToggle("slow");
  });

  $(".menu li a").on("click", function () {
    $(".MenuWrapper.ShowMenu").slideToggle("slow");
  });

  function isMobileActive(MEDIA_QUERY) {
    if (MEDIA_QUERY.matches) {
      MOB_NON_ACTOVE_CLS.eq(0)
        .show()
        .addClass(ACTIVE_CLS)
        .removeClass(NO_ACTIVE_CLS);
      if (URL.indexOf("business") != -1 || URL.indexOf("personal") != -1) {
        MOB_NON_ACTOVE_CLS.show()
          .addClass(ACTIVE_CLS)
          .removeClass(NO_ACTIVE_CLS);
        MOB_ACTOVE_CLS.hide();
      }
    } else {
      MOB_NON_ACTOVE_CLS.addClass(NO_ACTIVE_CLS).removeClass(ACTIVE_CLS);
      MOB_ACTOVE_CLS.show();
      MENU_WRAPPER.show();
    }
  }

  isMobileActive(MEDIA_QUERY);
  MEDIA_QUERY.addListener(isMobileActive);
})(jQuery);
