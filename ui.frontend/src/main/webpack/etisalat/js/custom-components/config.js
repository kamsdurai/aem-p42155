$(document).ready(function () {

    var pageNav = $('#page-nav');
    var windowWidth = $(window).width();
    if (pageNav.length > 0) {

      var body = $('body');
      body.css('position', 'relative');
      body.scrollspy({
        target: '#page-nav',
        offset: 144
      });

      $('#page-nav a').on('click', function(event) {

        event.preventDefault();
        var hash = this.hash, $that = $(this);

        if ($(hash).length > 0) {
          $(this).parent().parent().find('.active').removeClass('active');
          $that.parent().addClass('active');
          var hashOffsetTop, $PageNavWrap;
          $PageNavWrap = $('.page-nav-wrap');

          if ($PageNavWrap.hasClass('affix')) {
            hashOffsetTop = $(hash).offset().top - 140;
          } else {
            hashOffsetTop = $(hash).offset().top - 360;
          }

          $('html, body').animate({ scrollTop: (hashOffsetTop) },
            { duration: 800, queue: false });
        }

      });

      var wrap = $('.page-nav-wrap');
      wrap.each(function() {
        $(this).affix({
          offset: {
            top: $(this).offset().top - 104
          }
        });
      });


    }

    // $(window).scroll(function() {
    //   if ($('.config-section-wrap').hasClass('affix')) {
    //     $('body').addClass('fixed-config-section');
    //   } else {
    //     $('body').removeClass('fixed-config-section');
    //   }
    //   console.log('touch start');
    //   if (windowWidth < 991) {
    //     $('.links-wrapper').addClass('fixed');
    //     $('.config-section-wrap').addClass('m-top-24');
    //     if($(this).scrollTop()== 0){
    //       $('.links-wrapper').removeClass('fixed');
    //       $('.config-section-wrap').removeClass('m-top-24');
    //     }
    //   }
    // });

    $(window).scroll(function() {
      if ($('.config-section-wrap').hasClass('affix')) {
        $('body').addClass('fixed-config-section');
      } else {
        $('body').removeClass('fixed-config-section');
      }
      var fixedWrapper = $('#fixed-wrapper').attr('data-behaviour')
      if (windowWidth < 991 && fixedWrapper) {
        $('#fixed-wrapper').addClass(fixedWrapper);
        $('.config-section-wrap').addClass('m-top-24');
        if($(this).scrollTop()== 0){
          $('#fixed-wrapper').removeClass(fixedWrapper);
          $('.config-section-wrap').removeClass('m-top-24');
        }
      }
    });

    $(".has-related").click(function() {
      $('li').each(function() {
          if ($(this).data('hasrelated') == '0') {
              $(this).hide();
          }
      });
  });
  
    $(document).ready(function () {
      if (windowWidth < 991) {
        $('.config-section-wrap .page-nav li a').on('click', function () {
          $('.config-section-wrap .page-nav li').removeClass('active');
          $(this).parent().addClass('active');
          var scrollToCurrent = $('.config-section-wrap .page-nav li.active').offset().left + $('.config-section-wrap .page-nav li.active').outerWidth(true)/2 + $('.simplebar-content').scrollLeft() - $('.simplebar-content').width()/2;
          //alert('alert');
          $('.simplebar-content').scrollLeft(scrollToCurrent);

        });
      }

      var scrollToCurrent = $('.config-section-wrap .page-nav li.active').offset().left + $('.config-section-wrap .page-nav li.active').outerWidth(true)/2 + $('.simplebar-content').scrollLeft() - $('.simplebar-content').width()/2;
      //alert('alert');
      $('.simplebar-content').scrollLeft(scrollToCurrent);

    });




  });