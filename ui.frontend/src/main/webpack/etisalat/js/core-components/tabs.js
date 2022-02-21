/* eslint-disable no-undef */
(function ($) {
$(document).ready(function () {
$(".cmp-tabs__tab").click(function () {
const tabsActiveId = $(this).attr("id") + 'panel';
const taboffset = $("#" + tabsActiveId).offset();
const taboffsetTop = taboffset.top - 200;
window.scrollTo(0, taboffsetTop);
});
});
})(jQuery);