
if ($('.backToTop').length) {
    var scrollTrigger; // px   
    var mediaType = window.matchMedia("(max-width: 768px)")
    function myFunction(media) {
        if (media.matches) { // If media query matches
            scrollTrigger = 200;
        } else {
            scrollTrigger = 100;
        }
      }
      
      
      myFunction(mediaType) // Call listener function at run time
      mediaType.addListener(myFunction)

     
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('.backToTop a').addClass('show');
            } else {
                $('.backToTop a').removeClass('show');
            }
        };

    backToTop();
    function debounce(method, delay) {
        clearTimeout(method._tId);
        method._tId= setTimeout(function(){
            method();
        }, delay);
    }
    
    $(window).scroll(function() {
        debounce(backToTop, 0);
    });
   
    $('.backToTop a').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}