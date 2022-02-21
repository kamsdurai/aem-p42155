$(document).ready(function () {

    $('.hamburger').on('click', function () {
        $(".hamburger").toggleClass("is-active");
        $(".main-menu-mobile").toggleClass("mob-visible");
        $(".nav-drill").toggleClass("main-menu-slide");
    });



    // Dyanamic year 
    $('.copyright-year').text(new Date().getFullYear());

    //ETSL -38
    $(".cmp-accordion__button").on("click", function(event) {
      $(this).find('.accordion-top-view').find('span').toggleClass('hidden');
    });
    if (window.matchMedia('(max-width: 768px)').matches)
        {
            $(".beigebg-container").find('.accordion-top-view').addClass('displaynone');
        }
    //ETSL -196
    if ($(".showNoContract").length > 0){ 
        $("a.showNoContract").click(function(event) {
            event.preventDefault();
            $(this).hide();
            $('.hide-product--grid').show();
        });
    }
});


/* Sub Menu Nav Slide */
// Selector
let NAV_EXPAND = [].slice.call(document.querySelectorAll(".nav-expand"));
const NAV_DRILL_CLS = $(".nav-drill");

// Class
const SEARCH_NAV_DRILL_CLS = "search-nav-drill";
const ACTIVE_CLS = "active";
const NAV_LINK_CLS = ".nav-link";
const SEARCH_LINK_CLS = "search-link";
const NAV_BACK_LINK_CLS = ".nav-back-link";

NAV_EXPAND.forEach(function (item) {
  item.querySelector(NAV_LINK_CLS).addEventListener("click", function () {
    item.classList.add(ACTIVE_CLS);

    if (this.classList.contains(SEARCH_LINK_CLS)) {
      NAV_DRILL_CLS.addClass(SEARCH_NAV_DRILL_CLS);
    }
  });

  item.querySelector(NAV_BACK_LINK_CLS).addEventListener("click", function () {
    item.classList.remove(ACTIVE_CLS);
    
    if (NAV_DRILL_CLS.hasClass(SEARCH_NAV_DRILL_CLS)) {
      NAV_DRILL_CLS.removeClass(SEARCH_NAV_DRILL_CLS);
    }
  });
});


