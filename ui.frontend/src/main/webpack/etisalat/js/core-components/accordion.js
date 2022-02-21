/* eslint-disable no-undef */
(function ($) {
  // Class
  const SHOW_CLASS = "show";
  const HIDE_CLASS = "hidden";

  // Selector
  const MORE_CLASS = $(".more");
  const LESS_CLASS = $(".less");
  const ACCORDION_VIEW_CLASS = $(".accordion-view");
  const LIST_ITEM_VIEW_CLASS = $(".listitems-view");
  const CMP_VIEWALL_CLASS = $(".cmp-viewall");

  function accordionView(param) {
    if (!MORE_CLASS.hasClass(HIDE_CLASS) && LESS_CLASS.hasClass(HIDE_CLASS)) {
      CMP_VIEWALL_CLASS.children().each(function () {
        if ($(this).hasClass(HIDE_CLASS)) {
          $(this).addClass(SHOW_CLASS);
          $(this).removeClass(HIDE_CLASS);
          LESS_CLASS.removeClass(HIDE_CLASS);
          MORE_CLASS.addClass(HIDE_CLASS);
        }
      });
    } else if (MORE_CLASS.hasClass(HIDE_CLASS) && !LESS_CLASS.hasClass(HIDE_CLASS)) {
      CMP_VIEWALL_CLASS.children().each(function (index) {
        var numberOfItems = CMP_VIEWALL_CLASS.attr("data-items-show");
        if (index + 1 > numberOfItems) {
          $(this).addClass(HIDE_CLASS);
          $(this).removeClass(SHOW_CLASS);
          if (param === "accordion") {
            ACCORDION_VIEW_CLASS.addClass(SHOW_CLASS);
            ACCORDION_VIEW_CLASS.removeClass(HIDE_CLASS);
          } else if (param === "list") {
            LIST_ITEM_VIEW_CLASS.addClass(SHOW_CLASS);
            LIST_ITEM_VIEW_CLASS.removeClass(HIDE_CLASS);
          }
          MORE_CLASS.removeClass(HIDE_CLASS);
          LESS_CLASS.addClass(HIDE_CLASS);
        }
      });
    }
  }

  ACCORDION_VIEW_CLASS.on("click", function () {
    accordionView("accordion");
  });
  LIST_ITEM_VIEW_CLASS.on("click", function () {
    accordionView("list");
  });
})(jQuery);
