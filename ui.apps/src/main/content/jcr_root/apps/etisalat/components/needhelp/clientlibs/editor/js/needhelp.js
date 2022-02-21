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
/* global jQuery, Coral */
(function($, Coral) {
    "use strict";

    console.log(" --------NEED HELP CLIENTLIBS LOADED------- ");

    var registry = $(window).adaptTo("foundation-registry");

    // Validator for required for multifield max and min items
    registry.register("foundation.validation.validator", {
        selector: "[data-validation=needhelp-multifield]",
        validate: function(element) {
            var el = $(element);
            let max=el.data("max-item");
            let min=el.data("min-item");
            let items=el.children("coral-multifield-item").length;
            let domitems=el.children("coral-multifield-item");
            console.log("{} : {} :{} ",max,min,items);
            if(items>max){
              /* Use below line if you don't want to add item in multifield more than max limit */
              //domitems.last().remove();
              return "You can add maximum "+max+" icons. You are trying to add "+items+"th icon."
            }
            if(items<min){
                return "You add minimum "+min+" icons."
            }
        }
    });

    registry.register("foundation.validation.validator", {
        selector: "[data-validation=needhelp-title-validation]",
        validate: function(element) {
            let el = $(element);
            let value=el.val();
            if(!value){
               return "Title is mandatory. Please provide Title value";
            }

        }
    });

   
})(jQuery, Coral);