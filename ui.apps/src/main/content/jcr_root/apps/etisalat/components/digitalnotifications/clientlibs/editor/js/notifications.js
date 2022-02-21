(function(window, document, $) {
    "use strict";

    var actionsEnabledCheckboxSelector = 'coral-checkbox[name="./actionsEnabled"]';
    var dialogContentSelector = ".cmp-digitalnotifications__editor";
    var ctaTextfieldSelector = 'input[name="./notificationCTATitle"]';
    var ctaTextLinkfieldSelector = '.digital-notification-ctalink';
    var actionsEnabled;
    var $ctaTextField;
    var $ctaTextLink;



    $(document).on("dialog-loaded", function(e) {
        var $dialog = e.dialog;
        var $dialogContent = $dialog.find(dialogContentSelector);
        var dialogContent = $dialogContent.length > 0 ? $dialogContent[0] : undefined;
        $ctaTextField = $(dialogContentSelector).find(ctaTextfieldSelector).adaptTo("foundation-field");
        $ctaTextLink = $(dialogContentSelector).find(ctaTextLinkfieldSelector).adaptTo("foundation-field");

        if (dialogContent) {
            var $actionsEnabledCheckbox = $dialogContent.find(actionsEnabledCheckboxSelector);
            actionsEnabled = $actionsEnabledCheckbox.adaptTo("foundation-field").getValue() === "true";
            if (actionsEnabled) {
                enableCTA();
            } else {
                disableCTA();
                resetCTA();
            }
        }

    });


    $(document).on("change", '.digital-notification-actionenabled', function(e) {
        actionsEnabled = $('.digital-notification-actionenabled').prop('checked');
        if (actionsEnabled) {
            enableCTA();
        } else {
            disableCTA();
        }
    });

    function disableCTA() {
        $ctaTextField.setDisabled(true);
        $ctaTextLink.setDisabled(true);
    }

    function enableCTA() {
        $ctaTextField.setDisabled(false);
        $ctaTextLink.setDisabled(false);
    }

    function resetCTA() {
        $ctaTextField.setValue("");
        $ctaTextLink.setValue("");
    }


})(window, document, Granite.$);