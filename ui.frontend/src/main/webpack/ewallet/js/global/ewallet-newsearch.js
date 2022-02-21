/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-undef */

(function ($) {
  $(document).ready(function () {
    var show_per_page = $("#show_per_page").val();
    var number_of_items = $(".ewalletnews").children().length;
    var number_of_pages = Math.ceil(number_of_items / show_per_page);
    var navigation_html = "<ul>";
    var current_link = 0;

    $("#current_page").val(0);

    while (number_of_pages > current_link) {
      navigation_html +=
        '<li><a class="page_link" data-id="' +
        current_link +
        '" href="javascript:void(0);" longdesc="' +
        current_link +
        '">' +
        (current_link + 1) +
        "</a></li>";
      current_link++;
    }

    navigation_html += "</ul>";
    $("#page_navigation").html(navigation_html);

    $("#page_navigation .page_link:first").addClass("active");
    $(".ewalletnews").css("display", "none");
    $(".ewalletnews").slice(0, show_per_page).css("display", "block");

    $(document).on("click", ".page_link", function () {
      var curid = parseInt($(this).data("id"));
      var show_per_page = parseInt($("#show_per_page").val());
      var start_from = curid * show_per_page;
      var end_on = start_from + show_per_page;
      $(".ewalletnews").css("display", "none").slice(start_from, end_on).css("display", "block");

      $(".page_link").removeClass("active");
      $(".page_link[longdesc=" + curid + "]")
        .addClass("active")
        .siblings(".active")
        .removeClass("active");

      $("#current_page").val(curid);
    });
    $(document).on("click", ".previous_link", function () {
      new_page = parseInt($("#current_page").val()) - 1;
      if ($(".active").prev(".page_link").length == true) {
        go_to_page(new_page);
      }
    });
    $(document).on("click", ".next_link", function () {
      new_page = parseInt($("#current_page").val()) + 1;
      if ($(".active").next(".page_link").length == true) {
        go_to_page(new_page);
      }
    });
    setTimeout(function () {
      $(".consumerload").hide();
      $("#page_navigation").css("visibility", "visible");
    }, 4000);
  });
})(jQuery);
