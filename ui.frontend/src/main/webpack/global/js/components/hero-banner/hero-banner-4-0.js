/* eslint-disable no-console */
import { swiperInit } from "../../swiperInitialize";

(function (window) {
  "use strict";

  // for multiple slides
  function initHeroSwiper() {
    $(document)
      .find(".hero-banner-section.multi-slides")
      .each(function (index) {
        $(this).addClass("h-b-slider-multi" + index);
        var $carouselSliderCurrentPromotionsMulti = swiperInit(".h-b-slider-multi" + index + " .swiper-hero-container", {
          //clickable: true,
          direction: "horizontal",
          effect: "fade",
          followFinger: false,
          nextButton: ".hero-next",
          prevButton: ".hero-prev",
          pagination: ".swiper-pagination",
          paginationType: "bullets",
          paginationClickable: true,
          loop: true,
          slidesPerView: 1,
          autoplay: 5000,
          onClick: function (swiper, event) {
            if ($(event.target).hasClass("hero-bg-cta")) {
              var url = $(swiper.clickedSlide).find(".hero-bg-cta").attr("data-label");
              if (url !== "" && typeof url !== "undefined") {
                window.location.href = url;
              }
            }
          },
        });
        appendHeroModelPopup($(this), ".h-b-slider-multi" + index);
      });
  }

  //single slide only
  function initHeroSwiperSingleSlide() {
    $(document)
      .find(".hero-banner-section.single-slide-only")
      .each(function (index) {
        $(this).addClass("h-b-slider" + index);
        var $carouselSliderCurrentPromotionsSingle = swiperInit(".h-b-slider" + index + " .swiper-hero-container", {
          direction: "horizontal",
          effect: "fade",
          followFinger: false,
          loop: false,
          slidesPerView: 1,
          autoplay: false,
          onClick: function (swiper, event) {
            if ($(event.target).hasClass("hero-bg-cta")) {
              var url = $(swiper.clickedSlide).find(".hero-bg-cta").attr("data-label");
              if (url !== "" && typeof url !== "undefined") {
                window.location.href = url;
              }
            }
          },
        });
        appendHeroModelPopup($(this), ".h-b-slider" + index);
      });
  }

  function appendHeroModelPopup(elm, className) {
    if (elm.find(".hero-banner-modal").length > 0) {
      elm.find(".hero-banner-modal").each(function () {
        var heroModel = $(this).clone();
        $(this).remove();
        heroModel.insertAfter(className);
      });
    }
  };

  //Hero banner call to action initialization

  function initHeroBannerCallToAction() {
    $(document)
      .find(".hero-images-call-to-action-section")
      .each(function () {
        if ($(this).closest(".carousel").length > 0) {
          if (!$(this).closest(".carousel").hasClass("hero-banner-image-section")) {
            $(this).closest(".carousel").addClass("hero-banner-image-section hero-banner-image-add medium has-action dynamic-content");
          }
        } else {
          if (!$(this).closest(".etisalatherobanner").hasClass("hero-banner-image-section")) {
            $(this).closest(".etisalatherobanner").addClass("hero-banner-image-section hero-banner-image-add medium has-action dynamic-content");
          }
        }
      });
  }

  // register the event handlers
  $(document).ready(function () {
    initHeroSwiper();
    initHeroSwiperSingleSlide();
    initHeroBannerCallToAction();

    const limitText = function (title, limit) {
      const newTitle = [];
      if (title.length > limit) {
        title.split(" ").reduce(function (acc, curr) {
          if (acc + curr.length <= limit) {
            newTitle.push(curr);
          }
          return acc + curr.length;
        }, 0);
        return newTitle.join(" ");
      }
      return title;
    };

    // offer tags text ristriction
    $(".hero-offer-tags-wrapper .text").each(function () {
      var $eleText = $(this).text();
      var $textResult = "";
      if (window.innerWidth < 375) {
        $textResult = limitText($eleText, 24);
        if ($eleText.length >= 24 && $eleText.slice(-3) !== "...") {
          $(this).text($textResult + "...");
        }
      } else {
        $textResult = limitText($eleText, 32);
        if ($eleText.length >= 32 && $eleText.slice(-3) !== "...") {
          $(this).text($textResult + "...");
        }
      }
    });

    // hero title text ristrictions
    $(".hero-title.long h2").each(function () {
      var $eleText = $(this).text();
      var $textResult = limitText($eleText, 75);
      if ($eleText.length >= 75 && $eleText.slice(-3) !== "...") {
        $(this).text($textResult + "...");
      }
    });
    $(".hero-title.regular h2").each(function () {
      var $eleText = $(this).text();
      var $textResult = limitText($eleText, 48);
      if ($eleText.length >= 48 && $eleText.slice(-3) !== "...") {
        $(this).text($textResult + "...");
      }
    });
    $(".hero-title.short h2").each(function () {
      var $eleText = $(this).text();
      var $textResult = limitText($eleText, 16);
      if ($eleText.length >= 16 && $eleText.slice(-3) !== "...") {
        $(this).text($textResult + "...");
      }
    });
    // hero description text ristrictions
    $(".hero-description p").each(function () {
      var $eleText = $(this).text();
      var $textResult = limitText($eleText, 96);
      if ($eleText.length >= 96 && $eleText.slice(-3) !== "...") {
        $(this).text($textResult + "...");
      }
    });

    // hero-banner-video - popup modal with youtube video to make video not to play-auto
    $(".hero-play-video").on("click", function () {
      $(".swiper-slide-active video")[0].pause();
    });
    // on close popup make video pause and reset and play the background video
    $(".hero-banner-modal").on("hidden.bs.modal", function () {
      var src = $(this).find("iframe").attr("src");
      $(this).find("iframe").attr("src", "");
      $(this).find("iframe").attr("src", src.replace("autoplay=1", ""));
      $("video")[0].play();
    });
  });
})(window);
