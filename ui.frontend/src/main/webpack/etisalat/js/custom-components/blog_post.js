$(document).ready(function () {
    $('.blog-post-wrapper.video .img-cover').on('click', function () {
        var modalCTA = $(this).closest('.blog-post-wrapper.video').find('.mediaCtaVideo')
        modalCTA.modal().show();
    });

});

// number of rows to show for example 4 then 4*12 number bootstrap col = 48
var btnLoadMore = $('.blogpost-wrapper .action');

// load more items button
$(btnLoadMore).on('click', function (e) {
    e.preventDefault();
    $('.blogpost-wrapper .item').css('display', 'block');
    $(this).hide();
});

// search functionality for tile boxes
$(".search-wrapper input").on("keyup", function () {
    var btnLoadMore = $('.blogpost-wrapper .action');
    var searchCount = 0;
    var value = $(this).val().toLowerCase();

    // while searching hide the loadmore button
    $(btnLoadMore).css('display', 'none');

    // iterate items and show the matching results
    $(".blogpost-wrapper .item").filter(function () {
        $(this).toggle(
            $(this).text().toLowerCase().indexOf(value) > -1
        );

        // count items and show for user how many items they have found
        if ($(this).text().toLowerCase().indexOf(value) > -1) {
            searchCount += 1;
        }
    });
    // show the item found div
    $('.search-results-wrapper').css('display', 'block');
    // show the item counted for user input
    if (searchCount > 0) {
        $('.search-count').text(searchCount);
        $('.no-result-found').css('display', 'none')
    } else {
        $('.search-count').text('No');
        $('.no-result-found').css('display', 'inline-block')
    }
    // show the text user has putted in search
    $('.searchTarget').text('"' + value + '"');
});

// clear the search functionality / reset

$('.clear-search').on('click', function (e) {
    e.preventDefault();
    $(".search-wrapper form .form-group input").val('');
    var btnLoadMore = $('.blogpost-wrapper .action');
    var numberofitem = $('.cmp-blogpost-search').attr('data-noof-items');

    function makeRowsVisible(maxColCount) {
        var item = $('.blogpost-wrapper .item');
        if ((Number(numberofitem)) > 0) {
            for (var i = 0; i < (Number(numberofitem) - 1); i++) {
                item[i].style.display = 'block';
                btnLoadMore.removeClass('hidden');
            }
            var itemLength = item.length;
            for (var i = (Number(numberofitem)); i < item.length; i++) {
                item[i].style.display = 'hidden';
            }
        }
    }
    makeRowsVisible(numberofitem);
    $(btnLoadMore).css('display', 'block');
    $('.search-results-wrapper').css('display', 'none');
});

var numberofitem = $('.cmp-blogpost-search').attr('data-noof-items');
if(Number(numberofitem) == 0){
    $(btnLoadMore).css('display', 'none');
}