/*******************************************************************************
 * Copyright 2021 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
(function(window, document, $) {
    "use strict";

    var blogmodalSizeCheckboxSelector = 'coral-select[name="./blogsize"]';
    var youTubeTextfieldSelector = 'input[name="./youTubeUrl"]';
    var playIconTextfieldSelector = 'input[name="./playIconText"]';


    $(document).on("dialog-loaded", function(e) {
        $(blogmodalSizeCheckboxSelector).find("coral-select-item:selected").each(function() {
            if ($(this).text().indexOf('Video') >= 0) {
                showVideoDetails();
            } else {
                hideVideoDetails();
            }
        });

    });

    $(document).on("change", blogmodalSizeCheckboxSelector, function(e) {
        $(this).find("coral-select-item:selected").each(function() {
            if ($(this).text().indexOf('Video') >= 0) {
                showVideoDetails();
            } else {
                hideVideoDetails();
            }
        });

    });

    function hideVideoDetails() {
        $(youTubeTextfieldSelector).closest('div.coral-Form-fieldwrapper').hide();
        $(playIconTextfieldSelector).closest('div.coral-Form-fieldwrapper').hide();       
    }

    function showVideoDetails() {
        $(youTubeTextfieldSelector).closest('div.coral-Form-fieldwrapper').show();
        $(playIconTextfieldSelector).closest('div.coral-Form-fieldwrapper').show();       
    }



})(window, document, Granite.$);