(function(window, document, $) {
    "use strict";

    var swiperContainerImageTabSelector = '.swiper-container-image-tab';
    var swiperContainerFeatureTabSelector = '.swiper-container-featurecontent-tab';
    var layoutDropdownSelector = 'coral-select[name="./tileBoxLayout"]';
    var dialogContentSelector = ".cmp-swiper-container__editor";
    var $ewalletFeatureContent = "ewallet-feature";


    $(document).on("dialog-loaded", function(e) {
        var $dialog = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent = $dialogContent.length > 0 ? $dialogContent[0] : undefined;

        if (dialogContent) {
            var $actionsEnabledCheckbox = $dialogContent.find(layoutDropdownSelector);
            var layout = $actionsEnabledCheckbox.adaptTo("foundation-field").getValue();
            if (layout == $ewalletFeatureContent) {
                showTabOnLoad(swiperContainerImageTabSelector);
                showTabOnLoad(swiperContainerFeatureTabSelector);
            } else {
                hideTabOnLoad(swiperContainerImageTabSelector);
                hideTabOnLoad(swiperContainerFeatureTabSelector);
            }
        }

    });

    $(document).on("click", ".cq-dialog-submit", function(e) {
        var layout = $(".swiper-container-content-displaylayout coral-select-item:selected").val();       
        if(layout != $ewalletFeatureContent) {
            $(swiperContainerImageTabSelector).empty();
            $(swiperContainerFeatureTabSelector).empty();
        }
    });

    $(document).on("change", '.swiper-container-content-displaylayout', function(e) {
        var layoutSelectedVal = $(this).val();
        showHideHandler(layoutSelectedVal)
    });

    function showHideHandler(e) {
        if (e == $ewalletFeatureContent) {
            showTab(swiperContainerImageTabSelector);
            showTab(swiperContainerFeatureTabSelector);
        } else {
            hideTab(swiperContainerImageTabSelector);
            hideTab(swiperContainerFeatureTabSelector);
        }
    }

    function hideTab(e) {
        var coralTab = $(e);
        var coralPanelId = coralTab.closest('coral-panel').attr('aria-labelledby');
        $('#' + coralPanelId).hide();
    }

    function showTab(e) {
        var coralTab = $(e);
        var coralPanelId = coralTab.closest('coral-panel').attr('aria-labelledby');
        $('#' + coralPanelId).show();
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