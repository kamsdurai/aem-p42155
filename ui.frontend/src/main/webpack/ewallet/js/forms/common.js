/* eslint-disable no-undef */
(function ($) {
  // Class
  const FORM_OPTION_CLASS = ".cmp-form-options";
  const ERROR_FIELD_CLASS = "has-error-fields";
  const FLOATING_LABEL_CLASS = "floating-label";
  const FLOATING_LABEL_SELECTED_CLASS = "floating-label-selected";
  const ERROR_CLASS = ".has-error";
  const SELECT_DROPDOWN_WRAP_CLASS = ".cmp-form-options--drop-down";
  const SELECT_DROPDOWN_OPEN_CLASS = "cmp-form-options--open";

  // Selector
  const SELECT_DROPDOWN = $("select.cmp-form-options__field");

  // Element
  const EMPTY_OPTION = `<option style="display: none"></option>`;

  function initSelect2AndFixFormFloatingLabels() {
    /**
     * Default Select2 settings and initialization
     */
    // initialize select 2

    SELECT_DROPDOWN.each(function (index, element) {
      const $SELECT = $(this);
      const $IS__DEFAULT_SELECTED = $SELECT.parents().hasClass("default-selected");
      const $IS_SEARCH_ENABLE = $SELECT.parents().hasClass("search-enable");
      if ($IS__DEFAULT_SELECTED) {
        $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).find("label").addClass(FLOATING_LABEL_CLASS);
      } else {
        $(element).find("option").get(0).remove();
        $(element).val("");
        $(element).prepend(EMPTY_OPTION);
      }

      $SELECT
        .select2({
          width: "100%",
          minimumResultsForSearch: $IS_SEARCH_ENABLE ? "" : Infinity,
        })
        .on("select2:opening", function () {
          $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).addClass(SELECT_DROPDOWN_OPEN_CLASS);
          $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).find("label").addClass(FLOATING_LABEL_CLASS);
        })
        .on("select2:selecting", function () {
          $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).find("label").addClass(FLOATING_LABEL_SELECTED_CLASS);
        })
        .on("select2:close", function () {
          $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).removeClass(SELECT_DROPDOWN_OPEN_CLASS);
          if (!$(this).closest(SELECT_DROPDOWN_WRAP_CLASS).find("label").hasClass(FLOATING_LABEL_SELECTED_CLASS)) {
            if (!$SELECT.val()) {
              $(this).closest(SELECT_DROPDOWN_WRAP_CLASS).find("label").removeClass(FLOATING_LABEL_CLASS);
            }
          }
        });
    });
  }
  initSelect2AndFixFormFloatingLabels();

  // To remove error class from select dropdown
  SELECT_DROPDOWN.change(function () {
    if ($(this).val() !== null) {
      $(this).closest(FORM_OPTION_CLASS).removeClass(ERROR_FIELD_CLASS);
      $(this).closest(FORM_OPTION_CLASS).find(ERROR_CLASS).remove();
    }
  });
})(jQuery);
