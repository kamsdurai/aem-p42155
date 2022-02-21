$(document).ready(function () {
  //footer copyright year in dynamic
  $(".footer-copyright-year").text(new Date().getFullYear());
});
(function () {
  define(["lodash", "select2", "swiper"], function (_) {
    const position = "{lat: 25.208549, lng: 55.271945}";
    const lang = "en";
    const locationHref = "https://ewallet.ae/en/locations/locations.jsp";
    //return function () {
    // ---------------------------------------------------------
    // Common functions
    // ---------------------------------------------------------
    function checkIconURL(docLang, link) {
      if (link.indexOf("/" + docLang + "/") > 1) {
        return "/" + docLang + "/system/assets/img/bulk/";
      } else {
        return "/resources/images/";
      }
    }
    function isJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    var currentFilter = "";
    if (location.hash === "#coverage") {
      currentFilter = "coverage";
    } else {
      currentFilter = "all";
    }
    var defaultCenterPosition = position; // { lat: 25.208549, lng: 55.271945 };
    var currentLocation = defaultCenterPosition;
    var map;
    var markers = [];
    var infowindowprec = null; // global variable to save last infowindow
    var storesLoaded = false;
    var myMarker;
    var myInfoWindow;
    var autocomplete;
    var listFilterid = "";

    const checkURL = "https://ewallet.ae" + checkIconURL(lang, locationHref);
    const currentUrlPath = checkURL;
    debugger;
    var $mapFilter = $("#mapFilter");
    var $mapFiltersLinks = $(".map-filter-topnav .nav a");
    var swiperMap;
    //var swiperList;
    var currentView = "map";
    var storeLocatorData;
    var options = {
      suppressInfoWindows: true,
      map: map,
    };
    var kml2g = new google.maps.KmlLayer("https://sites.google.com/site/etisalatkml/home/kml/2g.kml", options),
      kml3g = new google.maps.KmlLayer("https://sites.google.com/site/etkmlz/kml/3gM2.kml", options),
      kml4g = new google.maps.KmlLayer("https://sites.google.com/site/etkmlz/kml/4gM7.kml", options);

    function resultItemTemplateList(resultData) {
      var items = [];
      var listItems = [];

      items = resultData;
      if (items != null) {
        $.each(items, function (key, val) {
          if (val != null) {
            listItems += `<div class="result-item-container swiper-slide">
                    <li class="active desc-short ${val.type} ${val.color}" data-storeid= "${val.id}" 
                    data-type="store">
                   <h5>${val.name} <label>${val.distance === "NaN KM" ? "0 KM" : val.distance}</label></h5><b>${val.address ? val.address : ""}</b>
                   <span class="num">${val.phoneNumber ? val.phoneNumber : ""} </span>
                   <p> ${val.information ? val.information : ""} </p>
                   <p> ${val.storeTiming} </p><p> 
                   <span class="closed"> Fridays closed</span></p></li></div>`;
          }
        });
        return listItems;
        //$('#store-locator-result-item-list-template').empty();

        //$('#store-locator-result-item-list-template').append(listItems);
      }
    }
    /**
     * Custom format for Select2
     * @param data
     * @returns {*}
     */

    /**
     * Initialize Google Maps
     * @param position
     * @param zoom
     * @param disableui
     * @returns {*}
     */
    function initGoogleMap(position, zoom, disableui) {
      map = new google.maps.Map(document.getElementById("store-locator-map"), {
        center: position,
        zoom: zoom,
        scrollwheel: false,
        zoomControl: true,
        disableDefaultUI: disableui,
        styles: [
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: {
              color: "#f7f1e9",
            },
          },
          {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [
              {
                color: "#f7f1e9",
              },
            ],
          },
          {
            featureType: "landscape.natural.landcover",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fef7c2",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fff982",
              },
            ],
          },
        ],
      });
    }
    /**
     * Call the backend to retrieve the stores date, and for each store
     * create a marker and infowindow
     * @param map
     */
    var categoryMap = {
      "store-basket": "Agent",
      "store-bag": "Outlet",
      "store-machine": "ATM",
      "store-wifi": "WifiHotspot",
      "store-business": "Merchant",
    };
    /* eslint-disable quote-props */
    var iconMap = {
      Reseller: "ICO_Map01Resellers.png",
      Outlet: "ICO_Map02Outlets.svg",
      PaymentMachine: "ICO_Map03Paymachines.png",
      WifiHotspot: "ICO_Map04Wifi.svg",
      BusinessCenter: "ICO_Map05businesscenter.png",
      Agent: "ICO_Map01Resellers.png",
      ATM: "ICO_Map03Paymachines.png",
      Merchant: "ICO_Map05businesscenter.png",
    };

    var colorMap = {
      Reseller: "store-basket",
      Outlet: "store-bag",
      PaymentMachine: "store-machine",
      WifiHotspot: "store-wifi",
      BusinessCenter: "store-business",
      Agent: "ICO_Map01Resellers.png",
      ATM: "ICO_Map03Pay machines.png",
      Merchant: "ICO_Map05businesscenter.png",
    };
    function formatPagination(index) {
      console.log(index);
      var paginationList = $(".swiper-pagination-list > li");
      var postion = paginationList.length / index;
      if (postion < 1.5) {
        $(paginationList).first().removeClass("hidden");
      }
      if (postion < 6 && postion > 1.5) {
        $(paginationList).first().removeClass("hidden");
        $(paginationList).last().removeClass("hidden");
      }
      if (postion > 6) {
        $(paginationList).last().removeClass("hidden");
      }
    }
    function renderStoresList(storeLocator) {
      var storeLocatorData = JSON.parse(JSON.stringify(storeLocator));

      if (listFilterid) {
        _.remove(storeLocatorData, function (n) {
          return n.id !== listFilterid;
        });

        $(".swiper-pagination-list").html('<li class="active backtoList swiper-pagination-bullet">Back</li>');
      } else {
        //var storeLocatorData = (isJson(storeLocator.data) === false) ? storeLocator.data : JSON.parse(storeLocator.data); // enable this for cms

        storeLocatorData = isJson(storeLocatorData.data) === false ? storeLocatorData.data : JSON.parse(storeLocatorData.data); // enable this for cms
        // filter stores
        if (currentFilter !== "all") {
          _.remove(storeLocatorData, function (n) {
            return n.storeType.replace(/\s+/g, "") !== categoryMap[currentFilter];
          });
        }
      }

      var temp = {
        items: storeLocatorData,
      };

      // set the correct icon depending of the type
      /*
                    var latitude1 = 39.46;
                    var longitude1 = -0.36;
                    var latitude2 = 40.40;
                    var longitude2 = -3.68;
            
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
                    console.log(Math.round(distance*0.001)+"KM");
            */
      _.forEach(temp.items, function (item) {
        //  item.iconPath = currentUrlPath + iconMap[item.type.replace(/ +/g, "")];
        item.color = colorMap[item.storeType];
        item.distance =
          Math.round(
            google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(item.latitude, item.longitude),
              new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
            ) * 0.001,
          ) + " KM";
      });
      temp.items.sort(function (a, b) {
        return parseInt(a.distance) > parseInt(b.distance) ? 1 : -1;
      });

      _.templateSettings = {
        evaluate: /<#([\s\S]+?)#>/g,
        interpolate: /<#=([\s\S]+?)#>/g,
        escape: /<#-([\s\S]+?)#>/g,
      };

      //list view template
      // $('.store-locator-wrap .result-slide').html('');
      var resultList = resultItemTemplateList(storeLocatorData);

      //map view template
      var compiledTemplateList = _.template(resultList);
      //var compiledTemplateList = _.template($('#store-locator-result-item-list-template').html());
      $(".listview-wrap .result-slide").html(compiledTemplateList(temp));

      // swiper for results
      var activeIndex = 0;
      if (!listFilterid) {
        swiperList = new Swiper(".swiper-container-list", {
          slidesPerView: 2,
          slidesPerColumn: 4,

          spaceBetween: 20,
          mousewheelControl: false,
          paginationType: "bullets",
          paginationClickable: true,
          pagination: ".swiper-pagination-list",

          paginationBulletRender: function (className, index) {
            let NEW_SWIPER_CLS = "swiper-pagination-bullet";
            if (index < activeIndex + 7 && index >= activeIndex - 7) {
              NEW_SWIPER_CLS = index === activeIndex ? NEW_SWIPER_CLS + " swiper-pagination-bullet-active" : NEW_SWIPER_CLS;
              return '<li class="' + NEW_SWIPER_CLS + '">' + (index + 1) + "</li>";
            } else {
              return '<li class="' + NEW_SWIPER_CLS + ' hidden">' + (index + 1) + "</li>";
            }
          },

          onSlideChangeEnd: function (swiper) {
            if (swiper.activeIndex > activeIndex + 3 || swiper.activeIndex < activeIndex - 3) {
              activeIndex = swiper.activeIndex;
              swiper.updatePagination();
            }
            formatPagination(activeIndex);
          },

          breakpoints: {
            500: {
              slidesPerView: 1,
            },
          },
        });
      }

      // scroll to top "onclick"

      $(".result-item-container").on("click", function (event) {
        if (!$(this).hasClass("coverage")) {
          var target = $(".result-item-container:first-child");
          if (target.length) {
            event.preventDefault();
            $(this.div).stop().animate(
              {
                scrollTop: target.offset().top,
              },
              1000,
            );
          }
        } else {
          event.stopPropagation();
        }
      });

      // swiper for filters
      var swiper = new Swiper(".topnav-swiper-container", {
        slidesPerView: "auto",
        breakpoints: {
          1023: {
            slidesPerView: "auto",
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          },
        },
      });
      function myStoreClick(id) {
        // alert('testo:'+id)

        var marker = _.find(markers, function (item) {
          return parseInt(item.storeid) === parseInt(id);
        });

        // console.log('marker.storeid:' + marker.storeid)
        var pos = {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
        };
        //currentLocation = pos; // to avvoide changing user location
        map.setCenter(marker.getPosition());

        google.maps.event.trigger(marker, "click");
      }

      /**
       * open result details
       * @type {*|jQuery|HTMLElement}
       */
      var resultAccordion = $(".result-item-container .desc-short");
      resultAccordion.click(function (e) {
        e.preventDefault();

        if (!$(this).parent().hasClass("coverage")) {
          var pressedButton = $(this);
          var actualWrapper = pressedButton.closest(".result-item-container");
          var storeid = $(this).data("storeid").toString();

          if (actualWrapper.hasClass("open-detail")) {
            actualWrapper.find(".desc-long").slideUp(300);
            // console.log('closing swiper:' + storeid)
            actualWrapper.removeClass("open-detail");
          } else {
            var containerHeight = actualWrapper.parent(".result-slide").height() - pressedButton.height();
            actualWrapper.find(".desc-long").css("height", containerHeight + "px");

            actualWrapper.find(".desc-long").slideDown(300);
            // console.log('opening swiper:' + storeid)
            actualWrapper.addClass("open-detail");

            swiperMap.slideTo(0, 0);
          }

          // simulate click on marker for the given storeid
          // console.log('swiper clicked storeid:' + storeid)

          $(".details-desc .more-details").click(function (e) {
            e.preventDefault();
            $(".store-locator-wrap .result-main-container > .swiper-container-map").removeClass("hidden").addClass("hidden-xs hidden-ms");
            // myStoreClick($('.result-item-container .desc-short').data('storeid'));
            myStoreClick(storeid);
          });
          $(".address-list .desc-short h5").click(function (e) {
            e.preventDefault();
            myStoreClick(storeid);
          });
        }

        /*
                else {
                    var $toggle = $(this).find('input[type="checkbox"]');
                    if($toggle.is(':checked')) {
                        $toggle.prop('checked',false);
                    }
                    else {
                        $toggle.prop('checked',true);
                    }
                }
                */
      });

      // ------------------ open result More details
      var moreDetailsAccordion = $(".result-item-container .desc-long .details-desc a.more-details");
      moreDetailsAccordion.click(function (e) {
        e.preventDefault();
        var pressedButton = $(this);
        var actualWrapper = pressedButton.closest(".result-main-container");
        // var sidebarImage = $('#sidebar-icon');

        if (actualWrapper.hasClass("open-more-detail")) {
          actualWrapper.find(".more-details-box").fadeIn(300);

          actualWrapper.removeClass("open-more-detail");
        } else {
          actualWrapper.find(".more-details-box").fadeOut(300);

          actualWrapper.addClass("open-more-detail");
        }
      });

      swiper.update(true);
      // console.log('swiper update true')

      // ----- close button
      $(".desc-long .close-btn").click(function (e) {
        // console.log('pressing close')
        e.preventDefault();
        var inWrapper = $(this).closest(".result-item-container");
        inWrapper.find(".desc-long").slideUp(300);
        inWrapper.removeClass("open-detail");
      });
    }
    function renderAutoComplete(storeLocatorData) {
      // autocomplete for Stores
      var datautocomplete = $.map(storeLocatorData, function (value, key) {
        return {
          label: value.name,
          value: value.name + " - " + value.address,
          address: value.address,
          id: value.id,
        };
      });
      // function myStoreClick(id) {
      //     // alert('testo:'+id)

      //     var marker = _.find(markers, function (item) {
      //         return parseInt(item.storeid) === parseInt(id);
      //     });

      //     // console.log('marker.storeid:' + marker.storeid)
      //     var pos = {
      //         lat: marker.position.lat(),
      //         lng: marker.position.lng()
      //     };
      //     //currentLocation = pos; // to avvoide changing user location
      //     map.setCenter(marker.getPosition());

      //     google.maps.event.trigger(marker, 'click');
      // }
      // function renderStoresList(storeLocator) {

      //     var storeLocatorData = JSON.parse(JSON.stringify(storeLocator));

      //     if (listFilterid) {
      //         _.remove(storeLocatorData, function (n) {
      //             return n.id !== listFilterid;
      //         });

      //         $('.swiper-pagination-list')
      //             .html('<li class="active backtoList swiper-pagination-bullet">Back</li>');

      //     } else {
      //         //var storeLocatorData = (isJson(storeLocator.data) === false) ? storeLocator.data : JSON.parse(storeLocator.data); // enable this for cms

      //         storeLocatorData = (isJson(storeLocatorData.data) === false) ? storeLocatorData.data : JSON.parse(storeLocatorData.data); // enable this for cms
      //         // filter stores
      //         if (currentFilter !== 'all') {
      //             _.remove(storeLocatorData, function (n) {
      //                 return n.storeType.replace(/\s+/g, '') !== categoryMap[currentFilter];
      //             });
      //         }
      //     }

      //     var temp = {
      //         items: storeLocatorData
      //     };

      //     _.forEach(temp.items, function (item) {
      //         //  item.iconPath = currentUrlPath + iconMap[item.type.replace(/ +/g, "")];
      //         item.color = colorMap[item.storeType];
      //         item.distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(item.latitude, item.longitude), new google.maps.LatLng(currentLocation.lat, currentLocation.lng)) * 0.001) + " KM";
      //     });
      //     temp.items.sort(function (a, b) { return parseInt(a.distance) > parseInt(b.distance) ? 1 : -1 });

      //     _.templateSettings = {
      //         evaluate: /<#([\s\S]+?)#>/g,
      //         interpolate: /<#=([\s\S]+?)#>/g,
      //         escape: /<#-([\s\S]+?)#>/g
      //     };

      //     //list view template
      //     var compiledTemplateList = _.template($('#store-locator-result-item-list-template').html());
      //     $('.listview-wrap .result-slide').html(compiledTemplateList(temp));

      //     // swiper for results
      //     var activeIndex = 0
      //     if (!listFilterid) {
      //         swiperList = new Swiper('.swiper-container-list', {

      //             slidesPerView: 2,
      //             slidesPerColumn: 4,

      //             spaceBetween: 20,
      //             mousewheelControl: false,
      //             paginationType: 'bullets',
      //             paginationClickable: true,
      //             pagination: '.swiper-pagination-list',
      //             paginationBulletRender: function (index, className) {
      //                 if (index < (activeIndex + 7) && index >= activeIndex - 7) {
      //                     className = index == activeIndex ? className + " swiper-pagination-bullet-active" : className;
      //                     return '<li class="' + className + '">' + (index + 1) + '</li>';
      //                 } else {
      //                     return '<li class="' + className + ' hidden">' + (index + 1) + '</li>';
      //                 }

      //             },
      //             onSlideChangeEnd: function (swiper) {

      //                 if (swiper.activeIndex > activeIndex + 3 || swiper.activeIndex < activeIndex - 3) {
      //                     activeIndex = swiper.activeIndex;
      //                     swiper.updatePagination();
      //                 }
      //                 formatPagination(activeIndex);

      //             },

      //             breakpoints: {
      //                 500: {
      //                     slidesPerView: 1,
      //                 }
      //             }

      //         });
      //     }

      //     // scroll to top "onclick"

      //     $('.result-item-container').on('click', function (event) {

      //         if (!$(this).hasClass('coverage')) {
      //             var target = $('.result-item-container:first-child');
      //             if (target.length) {
      //                 event.preventDefault();
      //                 $(this.div).stop().animate({
      //                     scrollTop: target.offset().top
      //                 }, 1000);
      //             }
      //         } else {
      //             event.stopPropagation();
      //         }

      //     });

      //     // var formatPagination = function(index) {
      //     //   console.log(index);
      //     //   var paginationList  = $('.swiper-pagination-list > li');
      //     //   var postion = paginationList.length/index;
      //     //   if(postion < 1.5){
      //     //     $(paginationList).first().removeClass('hidden');
      //     //   }
      //     //   if(postion < 6 && postion > 1.5 ){
      //     //     $(paginationList).first().removeClass('hidden');
      //     //     $(paginationList).last().removeClass('hidden');
      //     //   }
      //     //   if(postion > 6 ){
      //     //     $(paginationList).last().removeClass('hidden');
      //     //   }

      //     // }

      //     // swiper for filters
      //     var swiper = new Swiper('.topnav-swiper-container', {
      //         slidesPerView: 'auto',
      //         breakpoints: {
      //             1023: {
      //                 slidesPerView: 'auto',
      //                 nextButton: '.swiper-button-next',
      //                 prevButton: '.swiper-button-prev'
      //             }
      //         }
      //     });

      //     /**
      //      * open result details
      //      * @type {*|jQuery|HTMLElement}
      //      */
      //     var resultAccordion = $('.result-item-container .desc-short');
      //     resultAccordion.click(function (e) {
      //         e.preventDefault();

      //         if (!$(this).parent().hasClass('coverage')) {

      //             var pressedButton = $(this);
      //             var actualWrapper = pressedButton.closest('.result-item-container');
      //             var storeid = $(this).data('storeid').toString();

      //             if (actualWrapper.hasClass('open-detail')) {
      //                 actualWrapper.find('.desc-long').slideUp(300);
      //                 // console.log('closing swiper:' + storeid)
      //                 actualWrapper.removeClass('open-detail');
      //             } else {

      //                 var containerHeight = actualWrapper.parent('.result-slide').height() - pressedButton.height();
      //                 actualWrapper.find('.desc-long').css('height', containerHeight + 'px');

      //                 actualWrapper.find('.desc-long').slideDown(300);
      //                 // console.log('opening swiper:' + storeid)
      //                 actualWrapper.addClass('open-detail');

      //                 swiperMap.slideTo(0, 0);
      //             }

      //             // simulate click on marker for the given storeid
      //             // console.log('swiper clicked storeid:' + storeid)

      //             $('.details-desc .more-details').click(function (e) {
      //                 e.preventDefault();
      //                 $('.store-locator-wrap .result-main-container > .swiper-container-map').removeClass('hidden').addClass('hidden-xs hidden-ms');
      //                 // myStoreClick($('.result-item-container .desc-short').data('storeid'));
      //                 myStoreClick(storeid);
      //             });
      //             $('.address-list .desc-short h5').click(function (e) {
      //                 e.preventDefault();
      //                 myStoreClick(storeid);
      //             });

      //         }

      //         /*
      //         else {
      //             var $toggle = $(this).find('input[type="checkbox"]');
      //             if($toggle.is(':checked')) {
      //                 $toggle.prop('checked',false);
      //             }
      //             else {
      //                 $toggle.prop('checked',true);
      //             }
      //         }
      //         */

      //     });

      //     // ------------------ open result More details
      //     var moreDetailsAccordion = $('.result-item-container .desc-long .details-desc a.more-details');
      //     moreDetailsAccordion.click(function (e) {
      //         e.preventDefault();
      //         var pressedButton = $(this);
      //         var actualWrapper = pressedButton.closest('.result-main-container');
      //         // var sidebarImage = $('#sidebar-icon');

      //         if (actualWrapper.hasClass('open-more-detail')) {
      //             actualWrapper.find('.more-details-box').fadeIn(300);

      //             actualWrapper.removeClass('open-more-detail');
      //         } else {
      //             actualWrapper.find('.more-details-box').fadeOut(300);

      //             actualWrapper.addClass('open-more-detail');
      //         }

      //     });
      //     swiper.update(true);
      //     // ----- close button
      //     $('.desc-long .close-btn').click(function (e) {
      //         // console.log('pressing close')
      //         e.preventDefault();
      //         var inWrapper = $(this).closest('.result-item-container');
      //         inWrapper.find('.desc-long').slideUp(300);
      //         inWrapper.removeClass('open-detail');
      //     });
      // }

      $("#storessuggestion")
        .autocomplete({
          source: datautocomplete,
          minLength: 4,
          response: function (event, ui) {
            //ui.content = ui.content.slice(0,10);
            console.log(event + ui);
          },
          open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
          },
          select: function (e, ui) {
            listFilterid = ui.item.id;
            function myStoreClick(id) {
              // alert('testo:'+id)

              var marker = _.find(markers, function (item) {
                return parseInt(item.storeid) === parseInt(id);
              });

              // console.log('marker.storeid:' + marker.storeid)
              var pos = {
                lat: marker.position.lat(),
                lng: marker.position.lng(),
              };
              //currentLocation = pos; // to avvoide changing user location
              map.setCenter(marker.getPosition());

              google.maps.event.trigger(marker, "click");
            }
            if (currentView == "map") {
              myStoreClick(listFilterid);
            } else {
              renderStoresList(storeLocatorData);
              listFilterid = "";
            }

            console.log(ui.item ? "Selected: " + ui.item.value + ", geonameId: " + ui.item.id : "Nothing selected, input was " + this.value);
          },
        })
        .autocomplete("instance")._renderItem = function (ul, item) {
        ul.addClass("locateus-autocomplete");
        return $("<li>")
          .addClass("store-location")
          .append("<div> <div class='ui-menu-item-title'>" + item.label + "</div><div class='ui-menu-item-desc'>" + item.address + "</div></div>")
          .appendTo(ul);
      };
    }

    function renderStores(storeLocator) {
      var storeLocatorData = JSON.parse(JSON.stringify(storeLocator));
      storeLocatorData = isJson(storeLocatorData.data) === false ? storeLocatorData.data : JSON.parse(storeLocatorData.data);
      // enable this for cms

      // filter stores
      //
      if (currentFilter !== "all") {
        _.remove(storeLocatorData, function (n) {
          return n.storeType.replace(/\s+/g, "") !== categoryMap[currentFilter];
        });
      }
      var temp = {
        items: storeLocatorData,
      };

      _.forEach(temp.items, function (item) {
        item.color = colorMap[item.storeType];
        item.distance =
          Math.round(
            google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(item.latitude, item.longitude),
              new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
            ) * 0.001,
          ) + " KM";
      });
      temp.items.sort(function (a, b) {
        return parseInt(a.distance) > parseInt(b.distance) ? 1 : -1;
      });
      renderAutoComplete(temp.items);
      _.templateSettings = {
        evaluate: /<#([\s\S]+?)#>/g,
        interpolate: /<#=([\s\S]+?)#>/g,
        escape: /<#-([\s\S]+?)#>/g,
      };

      var resultList = resultItemTemplateList(storeLocatorData);

      $(".store-locator-wrap .result-slide").html("");
      //map view template
      var compiledTemplate = _.template(resultList);
      $(".store-locator-wrap .result-slide").html(compiledTemplate(temp.items));

      // clean markers from map
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];

      // cycle json and place markers
      $.each(storeLocatorData, function (key, data) {
        var latLng = new google.maps.LatLng(data.latitude, data.longitude);

        // html content for the infowindo

        var contentString =
          ' <div id="content-' +
          data.id +
          '" class="more-details-box"> ' +
          ' <div class="box-container"> ' +
          ' <div class="col-md-12 col-sm-12 col-lg-12 "> ' +
          ' <div class="box-section"> ' +
          ' <div class="header-name"> ' +
          " <h4>" +
          data.name +
          "<label>" +
          data.distance +
          "</label></h4> " +
          ' <p class="dynamic-value">' +
          data.address +
          "</p> " +
          //  ' <p class="dynamic-value">' + data.city + ' - ' + data.country + '</p> ' +
          " </div> " +
          ' <div class="box-section-footer"> ' +
          (data.phoneNumber ? ' <div class="contact-info-no"> ' + ' <p><span class="dynamic-value">' + data.phoneNumber + "</span></p> " + " </div> " : "") +
          " </div> " +
          " </div> " +
          " </div> " +
          " </div> ";
        // --------------------------------

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 511,
        });

        /*
         * The google.maps.event.addListener() event waits for
         * the creation of the infowindow HTML structure 'domready'
         * and before the opening of the infowindow defined styles
         * are applied.
         */
        google.maps.event.addListener(infowindow, "domready", function () {
          // Reference to the DIV which receives the contents of the infowindow using jQuery
          var iwOuter = $(".gm-style-iw");

          /* The DIV we want to change is above the .gm-style-iw DIV.
           * So, we use jQuery and create a iwBackground variable,
           * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
           */
          var iwBackground = iwOuter.prev();

          // Remove the background shadow DIV
          iwBackground.children(":nth-child(2)").css({
            display: "none",
          });

          // Remove the white background DIV
          iwBackground.children(":nth-child(4)").css({
            display: "none",
          });
          var iwCloseBtn = iwOuter.next();

          // Apply the desired effect to the close button
          iwCloseBtn.css({
            opacity: "1", // by default the close button has an opacity of 0.7
            right: "64px",
            top: "30px", // button repositioning
          });

          // The API automatically applies 0.7 opacity to the button after the mouseout event.
          // This function reverses this event to the desired value.
          iwCloseBtn.mouseout(function () {
            $(this).css({
              opacity: "1",
            });
          });
        });

        // Creating a marker and putting it on the map

        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: data.name,
          icon: {
            url: currentUrlPath + iconMap[data.storeType.replace(/\s+/g, "")],
            size: new google.maps.Size(60, 60),
            scaledSize: new google.maps.Size(60, 60),
          },
          storeid: data.id,
        });

        /**
         * Marker on click event
         */
        marker.addListener("click", function () {
          // console.log('click marker : ' + marker.storeid)
          //change image for selected marker
          // var curImg = this.icon.url;
          // curImg = a.substring(0,curImg.length-4);
          // curImg = curImg+' active.svg';
          // this.icon.url = curImg;

          var oldstoreid;
          if (infowindowprec) {
            if (marker.storeid.toString() === localStorage.getItem("oldstoreid")) {
              localStorage.removeItem("oldstoreid");
              infowindowprec.close(); // close the previous infowindow
              return;
            }
            infowindowprec.close(); // close the previous infowindow
          }
          infowindow.open(map, marker);
          // console.log('open infowindow : ' + marker.storeid)
          infowindowprec = infowindow; // assign actual infowindow to the global variable
          // console.log('--------------')
          localStorage.setItem("oldstoreid", marker.storeid);
        });
        markers.push(marker);
      });

      // swiper for results
      swiperMap = new Swiper(".swiper-container-map", {
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        pagination: ".swiper-pagination",
        direction: "vertical",
        slidesPerView: 2,
        spaceBetween: 0,
        mousewheelControl: false,
        paginationType: "fraction",
      });

      // scroll to top "onclick"

      $(".result-item-container").on("click", function (event) {
        if (!$(this).hasClass("coverage")) {
          var target = $(".result-item-container:first-child");
          if (target.length) {
            event.preventDefault();
            $(this.div).stop().animate(
              {
                scrollTop: target.offset().top,
              },
              1000,
            );
          }
        } else {
          event.stopPropagation();
        }
      });

      // swiper for filters
      var swiper = new Swiper(".topnav-swiper-container", {
        slidesPerView: "auto",
        breakpoints: {
          1023: {
            slidesPerView: "auto",
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          },
        },
      });
      function myStoreClick(id) {
        // alert('testo:'+id)

        var marker = _.find(markers, function (item) {
          return parseInt(item.storeid) === parseInt(id);
        });

        // console.log('marker.storeid:' + marker.storeid)
        var pos = {
          lat: marker.position.lat(),
          lng: marker.position.lng(),
        };
        //currentLocation = pos; // to avvoide changing user location
        map.setCenter(marker.getPosition());

        google.maps.event.trigger(marker, "click");
      }
      //   var formatPagination = function(index) {
      //    console.log(index);
      //    var paginationList  = $('.swiper-pagination-list > li');
      //    var postion = paginationList.length/index;
      //    if(postion < 1.5){
      //      $(paginationList).first().removeClass('hidden');
      //    }
      //    if(postion < 6 && postion > 1.5 ){
      //      $(paginationList).first().removeClass('hidden');
      //      $(paginationList).last().removeClass('hidden');
      //    }
      //    if(postion > 6 ){
      //      $(paginationList).last().removeClass('hidden');
      //    }

      //  }

      /**
       * open result details
       * @type {*|jQuery|HTMLElement}
       */
      var resultAccordion = $(".result-item-container .desc-short");
      resultAccordion.click(function (e) {
        e.preventDefault();

        if (!$(this).parent().hasClass("coverage")) {
          var pressedButton = $(this);
          var actualWrapper = pressedButton.closest(".result-item-container");
          var storeid = $(this).data("storeid").toString();
          myStoreClick(storeid);
        }
      });

      // ------------------ open result More details
      var moreDetailsAccordion = $(".result-item-container .desc-long .details-desc a.more-details");
      moreDetailsAccordion.click(function (e) {
        e.preventDefault();
        var pressedButton = $(this);
        var actualWrapper = pressedButton.closest(".result-main-container");
        // var sidebarImage = $('#sidebar-icon');

        if (actualWrapper.hasClass("open-more-detail")) {
          actualWrapper.find(".more-details-box").fadeIn(300);

          actualWrapper.removeClass("open-more-detail");
        } else {
          actualWrapper.find(".more-details-box").fadeOut(300);

          actualWrapper.addClass("open-more-detail");
        }
      });

      swiper.update(true);
      // console.log('swiper update true')

      // ----- close button
      $(".desc-long .close-btn").click(function (e) {
        // console.log('pressing close')
        e.preventDefault();
        var inWrapper = $(this).closest(".result-item-container");
        inWrapper.find(".desc-long").slideUp(300);
        inWrapper.removeClass("open-detail");
      });

      map.setCenter(currentLocation);
    }
    function getStores(map) {
      $(".loader-disable-screen").show();

      var payload = {
        lang: "en",
        buildNumber: "8",
        osVersion: "8",
        osType: "IOS",
        deviceId: "C9DD924D-E8B3-4D83-BB01-D0F04A96E3E3",
        transactionId: "1569360219214",
      };
      if (storesLoaded) {
        if (currentView == "map") {
          renderStores(storeLocatorData);
        } else {
          renderStoresList(storeLocatorData);
        }
        return;
      }
      $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://mobileapp.e-wallet.ae/mwallet-rest/api/help/stores",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        data: JSON.stringify(payload),
        //timeout:9999,
        // cache: true, WORKS ONLY FOR GET,HEAD requests http://api.jquery.com/jQuery.ajax/
        //encode: true
        error: function (response) {
          console.log(response);
        },
      }).done(function (json) {
        //console.log(json);
        storesLoaded = true;
        $(".loader-disable-screen").hide();
        storeLocatorData = isJson(json) === false ? json : JSON.parse(json); // enable this for cms
        //storeLocatorData = json.data;
        if (currentView == "map") {
          renderStores(storeLocatorData);
        } else {
          renderStoresList(storeLocatorData);
        }

        return true;
      });
    }
    /**
     * Handle the Places Autocomplete selection
     */
    function PlacesAutocompleteChange() {
      myMarker.setVisible(false);

      var place = autocomplete.getPlace();

      if (!place.geometry) {
        // window.alert("Autocomplete's returned place contains no geometry")
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(10); // Why 17? Because it looks good.
      }

      myMarker.setIcon({
        url: currentUrlPath + "ICO_Myposition.svg",
        size: new google.maps.Size(90, 90),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(45, 90),
      });
      myMarker.setPosition(place.geometry.location);
      myMarker.setVisible(true);

      // set the current location
      currentLocation = place.geometry.location;

      // if the store are not yet loaded, then load them, expand the map and show the results
      if (!storesLoaded) {
        // expand the map
        $(".map-container > .background-map").removeClass("closed").addClass("opened");

        // show the results and navbar
        $(".store-locator-wrap .result-main-container > .swiper-container-map").removeClass("hidden").addClass("hidden-xs hidden-ms");
        $(".store-locator-wrap .result-main-container > .result-pager").removeClass("hidden").addClass("hidden-xs hidden-ms");
        $(".store-locator-wrap .map-filter-topnav").removeClass("hidden");

        $(".store-locator-wrap .switch-store-locator").removeClass("hidden");
        getStores(map);
      }
    }

    /**
     * Initialize Google Maps and Places Autocomplete
     */
    function initAutocomplete() {
      var input = document.getElementById("pac-input-store-locator");
      autocomplete = new google.maps.places.autocomplete(input);
      autocomplete.geocode = false;
      autocomplete.bindTo("bounds", map);
      // autocomplete.setTypes(['address']);
      autocomplete.setComponentRestrictions({
        country: ["ae"],
      });
      //  map.addListener('click', function (e) {
      //placeMarker(e.latLng, map);
      //  });

      // set the listener for place changes event
      autocomplete.addListener("place_changed", PlacesAutocompleteChange);
    }

    function placeMarker(position, map) {
      console.log("positions: ", position);
      var marker = new google.maps.Marker({
        position: position,
        map: map,
      });
      map.panTo(position);
      map.setZoom(15);
    }

    function displayLocation(lat1, lng1) {
      var geocoder = new google.maps.Geocoder();
      var latlng = {
        lat: parseFloat(lat1),
        lng: parseFloat(lng1),
      };
      geocoder.geocode(
        {
          location: latlng,
        },
        function (results, status) {
          if (status === "OK") {
            if (results[0]) {
              $("#pac-input-store-locator").val(results[0].formatted_address);
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        },
      );
    }

    /**
     * Position the map on the current user position (if avail.) or the configured center,
     * and retrieve the list of store nearby.
     */
    function positionOnMyLocation() {
      myInfoWindow.close(map, myMarker);

      $(".map-container > .background-map").removeClass("closed").addClass("opened");

      // show the results and navbar
      $(".store-locator-wrap .result-main-container > .swiper-container-map").removeClass("hidden").addClass("hidden-xs hidden-ms");
      $(".store-locator-wrap .result-main-container > .result-pager").removeClass("hidden").addClass("hidden-xs hidden-ms");
      $(".store-locator-wrap .map-filter-topnav").removeClass("hidden");

      map.center = currentLocation;
      map.zoom = 15;
      map.disableDefaultUI = true;
      // var infoWindow = new google.maps.InfoWindow({ map: map })

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            currentLocation = pos; // update my current position
            //  displayLocation(pos.lat, pos.lng);
            map.setCenter(pos);

            myMarker.setPosition(pos);
            myMarker.setVisible(true);
          },
          function () {
            // position to the configured center
            currentLocation = defaultCenterPosition;

            // handleLocationError(true, myInfoWindow, map.getCenter());
          },
          {},
        );
      } else {
        // position to the configured center
        currentLocation = defaultCenterPosition;

        // // Browser doesn't support Geolocation
        // handleLocationError(false, myInfoWindow, map.getCenter());
      }

      // --[Load stores in google maps from a json file]---------------------------------------------
      $(".store-locator-wrap .switch-store-locator").removeClass("hidden");
      getStores(map);

      // --------------------------------------------------------------------------------------------
    }

    function toggleKML(layer, toggle) {
      if (layer.getMap() == null) {
        layer.setMap(map);
        toggle.prop("checked", true);
      } else {
        layer.setMap(null);
        toggle.prop("checked", false);
      }
    }

    function getCoverage(map) {
      // clean markers from map
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];

      $(".store-locator-wrap .result-slide").html("");

      var resultList = resultItemTemplateList(storeLocatorData);
      var compiledTemplate = _.template(resultList);
      $(".store-locator-wrap .result-slide").html(compiledTemplate);

      swiperMap && swiperMap.update && swiperMap.update(true);

      var $kmlToggle = $(".result-item-container");

      $kmlToggle.click(function (e) {
        e.preventDefault();

        var src = $(this).data("kml"),
          $toggle = $(this).find('input[type="checkbox"]');

        if ($(this).hasClass("net-2g")) {
          //alert("kml2g:::::::::"+kml2g);
          kml4g.setMap(null);
          kml3g.setMap(null);
          $("#3g").prop("checked", false);
          $("#4g").prop("checked", false);
          toggleKML(kml2g, $toggle);
        }
        if ($(this).hasClass("net-3g")) {
          kml2g.setMap(null);
          kml4g.setMap(null);
          $("#2g").prop("checked", false);
          $("#4g").prop("checked", false);
          toggleKML(kml3g, $toggle);
        }
        if ($(this).hasClass("net-4g")) {
          kml3g.setMap(null);
          kml2g.setMap(null);
          $("#3g").prop("checked", false);
          $("#2g").prop("checked", false);
          toggleKML(kml4g, $toggle);
        }
      });
    }

    // ---------------------------------------------------------
    // EVENTS HANDLERS
    // ---------------------------------------------------------

    /**
     * ===============================
     *      On Document.Ready
     * ===============================
     */
    $(function () {
      $("#store-locator-form").submit(function (e) {
        e.preventDefault();
      });

      /**
       * Category filters
       */

      $mapFilter.find('input[name="filtercheck"]').change(function () {
        currentFilter = $(this).val();
        map.center = currentLocation;
        map.zoom = 10;
        map.disableDefaultUI = true;

        if (currentFilter === "coverage") {
          getCoverage(map);
        } else {
          kml2g.setMap(null);
          kml3g.setMap(null);
          kml4g.setMap(null);
          getStores(map);
        }
      });
      $mapFilter.on("select2:select", function () {
        currentFilter = $(this).val();
        map.center = currentLocation;
        map.zoom = 10;
        map.disableDefaultUI = true;

        if (currentFilter === "coverage") {
          getCoverage(map);
        } else {
          kml2g.setMap(null);
          kml3g.setMap(null);
          kml4g.setMap(null);
          getStores(map);
        }

        // cycle to lighten the correstponging tab selected in the dropdown
        $mapFiltersLinks.each(function () {
          $(this).parent("li").removeClass("active");

          if (currentFilter === $(this).data("category")) {
            $(this).parent("li").addClass("active");
          }
        });
      });

      /**
       * Map Filter Click event
       */
      $mapFiltersLinks.click(function (e) {
        e.preventDefault();

        var clickedItem = $(this);

        // first, I remove the active class from all links
        $mapFiltersLinks.each(function () {
          $(this).parent("li").removeClass("active");
        });

        // then set the active class only to the clicked link
        clickedItem.parent("li").addClass("active");

        $mapFilter.val(clickedItem.data("category")).trigger("change");

        map.center = currentLocation;
        map.zoom = 13;
        map.disableDefaultUI = true;

        currentFilter = clickedItem.data("category");

        // ...

        if (currentFilter === "coverage") {
          getCoverage(map);
        } else {
          getStores(map);
        }
      });

      /**
       * Clean pac text
       */
      $("#store-locator-text-cleaner").click(function (e) {
        e.preventDefault();
        //$('#pac-input-store-locator').val('');
      });

      /**
       * Mobile Toolbar for switch Map/Result
       */
      $("#sl-MapView-link").click(function (e) {
        e.preventDefault();
        $(".store-locator-wrap .result-main-container > .swiper-container-map").removeClass("hidden").addClass("hidden-xs hidden-ms");
      });

      $("#sl-ListView-link").click(function (e) {
        e.preventDefault();
        $(".store-locator-wrap .result-main-container > .swiper-container-map").removeClass("hidden").removeClass("hidden-xs hidden-ms");
      });

      $('a[data-toggle="tab"]').click("shown.bs.tab", function (e) {
        e.target; // newly activated tab
        e.relatedTarget; // previous active tab
        listFilterid = "";
        $("#storessuggestion").val("");
        var tabActive = document.querySelectorAll("#myTab li.active");
        var href = $(tabActive).children().attr("href");
        $(tabActive).removeClass("active");
        $(".tab-content " + href + "").removeClass("active in");
        $(this).show();
        $(e.target).parent().addClass("active in");
        var href1 = $(e.target).attr("href");
        $(".tab-content " + href1 + "").addClass("active in");
        if (e.target.hash == "#listview") {
          currentView = "list";
          renderStoresList(storeLocatorData);
        } else {
          currentView = "map";
          renderStores(storeLocatorData);
        }
      });

      $(document).on("click", ".backtoList", function () {
        listFilterid = "";
        renderStoresList(storeLocatorData);
      });

      /**
       * click on use my current location
       */
      $("#my-location-link").click(function (e) {
        // disable content in href
        e.preventDefault();
        // by default center on Dubai

        positionOnMyLocation();
      });
    });

    // ---------------------------------------------------------
    // START
    // ---------------------------------------------------------

    // Init Maps
    initGoogleMap(defaultCenterPosition, 10, true);

    // set my position marker
    myMarker = new google.maps.Marker({
      map: map,
      zoomControl: true,
      anchorPoint: new google.maps.Point(0, -29),
    });

    myMarker.setIcon({
      url: currentUrlPath + "ICO_Myposition.svg",
      size: new google.maps.Size(90, 90),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(45, 90),
    });

    myMarker.setVisible(false);

    // create info window
    myInfoWindow = new google.maps.InfoWindow();

    // init the maps and autocompelte
    //initAutocomplete();
    $(document).ready(function () {
      setTimeout(function () {
        if (currentFilter == "coverage") {
          $mapFilter.val("coverage").trigger("change");
          $("#my-location-link").trigger("click");
          setTimeout(function () {
            $mapFilter.trigger("select2:select");
            $("#2g").prop("checked", true);
            $("#2g").trigger("click");
          }, 2000);
        }
      }, 2000);
      setTimeout(function () {
        positionOnMyLocation();
      }, 1000);
    });

    //};
  });
})(define, window);
