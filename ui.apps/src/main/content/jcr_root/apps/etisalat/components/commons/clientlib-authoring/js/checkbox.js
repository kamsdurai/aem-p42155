/**
 * Directions to use -
 *
 * 1. Add class to checkbox
 *		Example: granite:class="cq-dialog-checkbox-showhide"
 * 2. Add cq-dialog-checkbox-showhide-target data-attribute to checkbox with the value being the selector to target for toggleing
 *		Example: cq-dialog-checkbox-showhide-target=".togglefield"
 * 3. Add target class to toggleable fields or components
 *	    Example: granite:class="togglefield"
 */
(function (document, $) {
    "use strict";

    $(document).on("foundation-contentloaded", function (e) {
        // if there is already an initial value make sure the according target element becomes visible
        handleCheckbox($(".cq-dialog-checkbox-showhide", e.target));
    });

    $(document).on("change", ".cq-dialog-checkbox-showhide", function (e) {
        handleCheckbox($(this));
    });

    function handleCheckbox(el) {
        el.each(function (i, element) {
            if($(element).is("coral-checkbox")) {
                // handle Coral3 base drop-down
                Coral.commons.ready(element, function (component) {
                    toggleFields(component, element);
                    component.on("change", function () {
                        toggleFields(component, element);
                    });
                });
            } else {
                // handle Coral2 based drop-down
                var component = $(element).data("checkbox");
                if (component) {
                    toggleFields(component, element);
                }
            }
        })
    }

    function toggleFields(component, element) {
        // get the selector to find the target elements. its stored as data-.. attribute
        var target = $(element).data("cqDialogCheckboxShowhideTarget");
        var $target = $(target);


        if (target) {
            $target.addClass("hide");
            if (component.checked) {
                $target.removeClass("hide");
            }
        }
    }
})(document, Granite.$);
