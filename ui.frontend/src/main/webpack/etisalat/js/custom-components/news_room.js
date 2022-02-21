    $(document).ready(function () {
        window.pagesize = Number($('.cmp-newsroom-search').attr('data-noof-items'));       
        window.selectedCategory = "news-all"

        /*Load more content with jQuery */        
        if ($('.tile-boxes-section-wrapper').find('.temp').length <= pagesize) {
            $(".news-loadmore--btn").css('display', 'none');
        }
    });

    $('#filtering-select').on('click', function () {
        if ($('#filtering-select--menu').hasClass('select2-container--open')) {
            $('#filtering-select').removeClass('select2-container--open');
            $('#filtering-select--menu').removeClass('select2-container--open');
        } else {
            $('#filtering-select--menu').addClass('select2-container--open');
            $('#filtering-select').addClass('select2-container--open');
            
        }
    });
	
	$(document).on('click', function(event) {
	  if (!$(event.target).closest('#filtering-select').length) {
	    if ($('#filtering-select--menu').hasClass('select2-container--open')) {
	      $('#filtering-select').removeClass('select2-container--open');
          $('#filtering-select--menu').removeClass('select2-container--open');
        }
	  }
	});

    $('#NewsloadMore').on('click', function (e) {
        var x = pagesize;
        var elements = $(this).closest('.tile-boxes-section-wrapper').find('.temp');
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1200);
        if (x + 3 <= elements.length) {
            x += 3;
            pagesize = x;

            $(elements).slice(0, x).addClass('active');
        } else {
            $(elements).slice(0, elements.length).addClass('active');
            x = $('.cmp-newsroom-search').attr('data-noof-items');
            pagesize = x;
            $(".news-loadmore--btn").css('display', 'none');
        }

    });

	$('.select2-results__option').on('click', function(e) {
	    var alloptions = $('.select2-results__option');
	    selectedCategory = e.target.getAttribute('value');
	    pagesize = Number($('.cmp-newsroom-search').attr('data-noof-items'));	    
	    $('.filter-news-results .f-news-room').removeClass('active');
	    $('.filter-news-results .f-news-room').removeClass('temp');
	    $('#filtering-select--menu').removeClass('select2-container--open');
	    var tempItems;
	    if(selectedCategory == 'news-all') {
	      tempItems =  $('.filter-news-results .f-news-room').addClass('temp');
	      $('.filter-news-results .f-news-room').slice(0, pagesize).addClass('active');
	    } else {
	      tempItems =  $('.filter-news-results .f-news-room').filter('[data-cat="' + selectedCategory + '"]').addClass('temp');
	       $('.filter-news-results .f-news-room').filter('[data-cat="' + selectedCategory + '"]').slice(0, pagesize).addClass('active');
	    }
	    
	    if (tempItems.length > pagesize){
              $(".news-loadmore--btn").css('display', 'block');
            } else {
              $(".news-loadmore--btn").css('display', 'none');
            }
	    
	    $('.select2-selection__rendered').text($(this).text());
	    
	    	    	    
	    for (var i = 0; i < alloptions.length; i++) {
            if (alloptions[i].getAttribute('class').indexOf("select2-results__option--highlighted") != -1) {
                alloptions[i].classList.remove("select2-results__option--highlighted")
            }
            if (alloptions[i].getAttribute('value') == selectedCategory) {
                alloptions[i].classList.add("select2-results__option--highlighted")
            }
        }
	});
