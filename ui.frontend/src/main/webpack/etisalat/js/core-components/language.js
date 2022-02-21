/* eslint-disable no-undef */
// language dropdown
$(document).ready( function(){
    $(".language a").click( function(event){
        $(".language a").toggleClass( 'open' );
        event.stopPropagation();
        $('.language-menu').toggle();
    });
    $(document).click( function(){
        $('.language-menu').hide();
    });
});