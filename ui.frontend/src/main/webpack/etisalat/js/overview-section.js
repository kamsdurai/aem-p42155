/* eslint-disable no-undef */
/* eslint-disable consistent-return */
export const VIEW_MORE_TOGGLE = () => {
  const VIEW_MORE_CTA = $(".product-features .view-more");

  if (!VIEW_MORE_CTA.length) {
    return false;
  }

  // View more button only visible in section if content tiles > 3
  const ENABLE_VIEW_MORE = () => {
    const OVERVIEW_SECTION = Array.from(VIEW_MORE_CTA.parents(".enable-view-more"));

    OVERVIEW_SECTION.forEach((element) => {
      const VIEW_MORE = $(element).find(".view-more");
      const CONTENT_TILE_LENGTH = $(element).find(".product-features__content").length;

      if (CONTENT_TILE_LENGTH <= 3) {
        VIEW_MORE.addClass("hide");
      }
    });
  };

  ENABLE_VIEW_MORE();

  // View More CTA click handler

  VIEW_MORE_CTA.on("click", function (event) {
    event.preventDefault();
    const PRODUCT_FEATURE = $(this).parents(".product-features").find(".product-features__overview");
    $(this).toggleClass("active");
    PRODUCT_FEATURE.toggleClass("show-more");
  });
};
