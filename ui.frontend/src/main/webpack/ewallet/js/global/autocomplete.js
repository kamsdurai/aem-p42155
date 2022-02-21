(function (window) {
  // define(['jquery','jquery-ui'], function($) {
  //'use strict';

  return function () {
    $(document).ready(function () {
      var movieCount = $(".in").length;
      $(".list-count").text(movieCount + " Movies");
      $(".ui-autocomplete-input").keyup(function () {
        var searchTerm = $(".ui-autocomplete-input").val();
        var listItem = $(".overlay-wrap").children(".config-accordion-wrapper");
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

        $.extend($.expr[":"], {
          containsi: function (elem, i, match, array) {
            return (
              (elem.textContent || elem.innerText || "")
                .toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0
            );
          },
        });
        $(".config-accordion-wrapper")
          .not(":containsi('" + searchSplit + "')")
          .each(function (e) {
            $(this).addClass("hiding out").removeClass("in");
            setTimeout(function () {
              $(".out").addClass("hidden");
            }, 400);
          });

        $(".config-accordion-wrapper:containsi('" + searchSplit + "')").each(
          function (e) {
            $(this).removeClass("hidden out").addClass("in");
            setTimeout(function () {
              $(".in").removeClass("hiding");
            }, 1);
          }
        );

        var movieCount = $(".in").length;
        $(".list-count").text(movieCount + " items");
        if (movieCount == "0") {
          $(".overlay-wrap").addClass("empty");
        } else {
          $(".overlay-wrap").removeClass("empty");
        }
      });

      $(".ui-autocomplete-input").on("change", function () {
        var searchTerm = $(".ui-autocomplete-input").val();
        var listItem = $(".overlay-wrap").children(".config-accordion-wrapper");
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
        $.extend($.expr[":"], {
          containsi: function (elem, i, match, array) {
            return (
              (elem.textContent || elem.innerText || "")
                .toLowerCase()
                .indexOf((match[3] || "").toLowerCase()) >= 0
            );
          },
        });

        $(".config-accordion-wrapper")
          .not(":containsi('" + searchSplit + "')")
          .each(function (e) {
            $(this).addClass("hiding out").removeClass("in");
            setTimeout(function () {
              $(".out").addClass("hidden");
            }, 400);
          });

        $(".config-accordion-wrapper:containsi('" + searchSplit + "')").each(
          function (e) {
            $(this).removeClass("hidden out").addClass("in");
            setTimeout(function () {
              $(".in").removeClass("hiding");
            }, 1);
          }
        );

        var movieCount = $(".in").length;
        $(".list-count").text(movieCount + " items");
        if (movieCount == "0") {
          $(".overlay-wrap").addClass("empty");
        } else {
          $(".overlay-wrap").removeClass("empty");
        }
      });
      function colorReplace(findHexColor, replaceWith) {
        // Convert rgb color strings to hex
        function rgb2hex(rgb) {
          if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

          function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }
        $("*").map(function (i, el) {
          var styles = window.getComputedStyle(el);
          Object.keys(styles).reduce(function (acc, k) {
            var name = styles[k];
            var value = styles.getPropertyValue(name);
            if (value !== null && name.indexOf("color") >= 0) {
              if (
                value.indexOf("rgb(") >= 0 &&
                rgb2hex(value) === findHexColor
              ) {
                $(el).css(name, replaceWith);
              }
            }
          });
        });
      }

      colorReplace("#719e19", "#616b1e");

      $(function () {
        var availableTags = $(".config-accordion-wrapper .text-label")
          .map(function () {
            return this;
          })
          .toArray();

        $("#tags").autocomplete({
          source: availableTags,
        });
      });

      $(function () {
        var availableTags = [
          "#28670",
          "#38000",
          "Ahmad",
          "Mohammed",
          "Sarah",
          "Nabeel",
          "Bunsiness Ultimate",
          "Bunsiness Talk",
          "Emirati Plan",
        ];

        $("#tags").autocomplete({
          source: availableTags,
          messages: {
            noResults: "",
            results: function () {
              console.log("");
            },
          },
        });
      });

      $(".check1 .floating-label").click(function () {
        $(".show1").show();
      });
      $(".check2 .floating-label").click(function () {
        $(".show2").show();
      });

      $(".close-overlay").click(function () {
        $(".show2").hide();
        $(".show1").hide();
      });
    });
    //ttes
  };
  // });
})(window);
