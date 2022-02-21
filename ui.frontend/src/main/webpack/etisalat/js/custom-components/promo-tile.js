(function () {
    "use strict";
      // register the event handlers
    $(document).ready(function () {
        // open youtube video and close by removing src and then add
        $(".youtube-video-link").on("click", function (e) {
            e.preventDefault();
            var modalCTA = $(this).next(".mediaCtaVideo");
            modalCTA.modal().show();
            if ($("body").hasClass("modal-open")) {
              $("body").parent().css("overflow", "hidden");
            }
            $("body").addClass("modal-overlay");
        });

        $(".youtube-popup-container").on("hidden.bs.modal", function () {
            var src = $(this).find("iframe").attr("src");
            $(this).find("iframe").attr("src", "");
            $(this).find("iframe").attr("src", src.replace("autoplay=1", ""));
            $("html").removeAttr("style");
            if ($("body").hasClass("modal-overlay")) {
              $("body").removeClass("modal-overlay");
            }
        });
    });
})();
