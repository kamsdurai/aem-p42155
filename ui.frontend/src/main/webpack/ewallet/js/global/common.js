/* eslint-disable no-undef */
(function ($) {
  const PLAY_VIDEO = $(".video__play-icon");
  PLAY_VIDEO.on("click", function (ev) {
    PLAY_VIDEO.next().addClass("play");
    PLAY_VIDEO.next()[0].src += "?autoplay=1&mute=1";
    ev.preventDefault();
  });
})(jQuery);
