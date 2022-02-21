import { swiperInit } from "../../../global/js/swiperInitialize";

$( document ).ready(function() {

// get height of slide and assign it to container
var getSwiperSlideHeight = function () {
    var height = $('.digital-notifications-wrapper.multi-notifications').find('.swiper-slide');
    var max = -1;
    $(height).each(function () {
        var h = $(this).height();
        max = h > max ? h : max;
    });
    return max;
}
$('.digital-notifications-wrapper.multi-notifications').find('.swiper-container').css('height', getSwiperSlideHeight() + 'px');


// get height of bottom notification and add padding to body bottom
var getBottomNotificationHeight = function () {
    return $('.digital-notifications-wrapper.bottom').height();
};
if ($('.digital-notifications-wrapper').hasClass('bottom') && getBottomNotificationHeight() > 0) {
    $('body').css('padding-bottom', (getBottomNotificationHeight() + 66) + 'px');
}

// expand collapse and open popup
$('.digital-notifications-wrapper .more-notifications').off().on('click', function (e) {

    if ($(this).closest('.digital-notifications-wrapper').hasClass('expand-collapse')) {
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass('active');
        $(this).closest('.digital-notifications-wrapper.expand-collapse').find('.notifications-body').slideToggle();
        if (getBottomNotificationHeight() > 0) {
            $('body').css('padding-bottom', (getBottomNotificationHeight() + 66) + 'px');
        }

        // $('.digital-notifications-wrapper.multi-notifications').find('.swiper-container').css('height', getSwiperSlideHeight()+'px');

        if (document.documentElement.lang == 'ar') {
            if ($(this).find('a').text().toLowerCase() == ' عرض المزيد ') {
                $(this).find('a').text(" عرض أقل ");
            } else {
                $(this).find('a').text(" عرض المزيد ");
            }

        } else {
            if ($(this).find('a').text().toLowerCase() == 'view more') {
                $(this).find('a').text("view less");
            } else {
                $(this).find('a').text("view more");
            }
        }
    }
    // GA datalayer starts
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
        'event': 'notifyBanner',
        'ev_cat': 'notifyBanner', //Event Category
        'ev_act': 'load' //Event Action
    });

    function gaLayer() {
        var dataurl = window.location.href;
        dataLayer.push({
            'event': 'notifyBanner',
            'ev_cat': 'notifyBanner', //Event Category
            'ev_act': 'click', //Event Action
            'ev_url': dataurl
        });
    }
    $('.digital-notifications-wrapper').off('click').on('click', function (e) {
        gaLayer();
    });
    // GA datalayer ends
    // popup
    var dataLabel = $(this).find('a').attr("data-label");
    if (typeof dataLabel !== 'undefined' && dataLabel !== '') {
        e.preventDefault();
        e.stopPropagation();
        $('#' + dataLabel).addClass('show');
        $('body').addClass('freeze');
        gaLayer();
    }
});

// expand bottom menu on bar click
$('.mob-tab-bar').off().on('click', '.tab-line', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('.digital-notifications-wrapper.expand-collapse').find('.notifications-body').toggleClass('expanded');
});

var notificationsswiper = swiperInit('.digital-notification-swiper-container .swiper-container', {
    autoHeight: true,
    direction: 'vertical',
    slidesPerView: 1,
    autoplay: 5000
});
 
// close popup
$('.nv-noti-modal-close').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    var currentOpendPopUp = $(this).closest('.nv-modal');
    $('.nv-modal').removeClass('show');
    $(currentOpendPopUp).css('display', 'none');
    $('body').removeClass('freeze');
});

// close notifications - contextual ( bottom )
$('.digital-notifications-wrapper.bottom .noti-icon-dismis').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).closest('.digital-notifications-wrapper').css('display', 'none');
    $('body').css('padding-bottom', 0);
    gaLayer();
});

// close notifications - global ( top )
function reset() {
    $('.nav-drill').css('margin-top', 56);
    $('body').removeClass('show-digital-notification-top');
    $('.top-nav-section').css("top", '');
    $('.mega-menu-navbar-default').css("top", '');
    $('.show-digital-notification-top').css("margin-top", '');
};
$('.digital-notifications-wrapper.top .noti-icon-dismis').off('click').on('click', 'a', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).closest('.digital-notifications-wrapper').css('display', 'none');
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("notifications", true);
    };
    // reset menu bar
    reset();
    $('body').css('margin-top', 139);
    gaLayer();
});
if (sessionStorage.getItem("notifications")) {
    $('.digital-notifications-wrapper.top').css('display', 'none');
    reset();
}

function posNotifications(scrollPos, targetDiv, bodyMargin) {
    if (targetDiv.outerHeight() > scrollPos) {
        $('body').addClass('show-digital-notification-top');
        $('.top-nav-section').css("top", targetDiv.outerHeight())

        if (window.outerWidth < 991) {
            $('.mega-menu-navbar-default').css("top", targetDiv.outerHeight());
            $('.nav-drill').css('margin-top', bodyMargin - scrollPos);
        } else {
            $('.mega-menu-navbar-default').css("top", targetDiv.outerHeight() + 48);
        }

        $('.show-digital-notification-top').css("margin-top", bodyMargin);
        $(targetDiv).css({
            "top": "",
            "position": ""
        });
    } else {
        $('.nav-drill').css('margin-top', 56);
        $('body').removeClass('show-digital-notification-top');
        $('.top-nav-section').css("top", '');
        $('.mega-menu-navbar-default').css("top", '');
        $('.show-digital-notification-top').css("margin-top", '');
        $(targetDiv).css({
            "top": 0 - bodyMargin,
            "position": "absolute"
        })
    }
}

function setNotificaiton(condtion) {
    var top = $(window).scrollTop(),
        divNotification = $('.digital-notifications-wrapper.top');

    var bodyMargintop = parseInt($('.show-digital-notification-top').css("margin-top")) + divNotification.outerHeight();

    if (condtion === true) {
        $('body').removeClass('show-digital-notification-top');
        $('body').css('margin-top', parseInt($('.show-digital-notification-top').css("margin-top")) - divNotification.outerHeight());
        return false;
    }
    posNotifications(0, divNotification, bodyMargintop);

    $(window).on('scroll', function () {
        if (sessionStorage.getItem('notifications') == "true") {
            return false
        }
        top = $(window).scrollTop();
        posNotifications(top, divNotification, bodyMargintop);
    });
}
$('body').addClass('digital-notification');
$('body').addClass('show-digital-notification-top');
if ($('body').hasClass('show-digital-notification-top') && sessionStorage.getItem('notifications') != "true") {
    setNotificaiton(false);

} else {

    setNotificaiton(true);
}
});