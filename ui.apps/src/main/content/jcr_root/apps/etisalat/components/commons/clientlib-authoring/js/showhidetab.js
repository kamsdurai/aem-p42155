(function(window, document, $) {
    "use strict";

    var $showHideTabSelector = '.cq-dialog-editor-showhide-target-tab';
    var dialogContentSelector = ".cmp-tab-dialog-content__editor";

    $(document).on("dialog-loaded", function(e) {
        var $dialog = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        var dropDownSelectorName = $(dialogContentSelector).attr('data-tab-dropdown-selector-name');
        var layoutDropdownSelector = 'coral-select[name="./%SELECTOR_NAME%"]';
        layoutDropdownSelector = layoutDropdownSelector.replace("%SELECTOR_NAME%", dropDownSelectorName);
        var $targetSelectValue = $(dialogContentSelector).attr('data-tab-target-dropdown-value');

        if (dialogContent) {
            var $actionsEnabledCheckbox = $dialogContent.find(layoutDropdownSelector);
            var layout = $actionsEnabledCheckbox.adaptTo("foundation-field").getValue();
            if (layout == $targetSelectValue) {
                showTabOnLoad($showHideTabSelector);
            } else {
                hideTabOnLoad($showHideTabSelector);
            }
        }

    });

    $(document).on("click", ".cq-dialog-submit", function(e) {
        var $targetSelectValue = $(dialogContentSelector).attr('data-tab-target-dropdown-value');
        var layout = $(".cq-dialog-editor-dropdown-tab-showhide coral-select-item:selected").val();
        if (layout != $targetSelectValue) {
            $($showHideTabSelector).empty();
        }
    });

    $(document).on("change", '.cq-dialog-editor-dropdown-tab-showhide', function(e) {
        var layoutSelectedVal = $(this).val();
        showHideHandler(layoutSelectedVal)
    });

    function showHideHandler(e) {
        var $targetSelectValue = $(dialogContentSelector).attr('data-tab-target-dropdown-value');
        if (e == $targetSelectValue) {
            showTab($showHideTabSelector);
        } else {
            hideTab($showHideTabSelector);
        }
    }

    function hideTab(e) {
        $(e).each(function(index, element) {
	        var coralPanelId =  $(this).closest('coral-panel').attr('aria-labelledby');
	        $('#' + coralPanelId).hide();	
	    });
    }

    function showTab(e) {	   
	    $(e).each(function(index, element) {
	        var coralPanelId =  $(this).closest('coral-panel').attr('aria-labelledby');
	        $('#' + coralPanelId).show();	
	    });
    }

    function hideTabOnLoad(e) {
        setTimeout(function() {
            hideTab(e);
        }, 250);
    }

    function showTabOnLoad(e) {
        setTimeout(function() {
            showTab(e);
        }, 250);
    }

})(window, document, Granite.$);