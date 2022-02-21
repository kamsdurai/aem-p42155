import { swiperInit } from "../../swiperInitialize";
      $(document).ready(function () {
          if ($(".search-input").length <= 0) {
            return false;
          }
        var doc = document;
        if (window.location.hostname !== "www.etisalat.ae") {
          document.querySelectorAll("#searchForm").forEach(function (item, index) {
            item.dataset.secondarySearch = "https://www.etisalat.ae/b2c/guidedSearchRequest.service?locale=" + document.documentElement.lang + "-AE";
          });
        }

        var instannceNum = 0;
        var MaxTextLimit = 200;
        var recordsNum = 15;
        var guidedSearchCall = document.getElementById("searchForm") && document.getElementById("searchForm").getAttribute("data-secondary-search");
        var searchCallUrl = document.getElementById("searchForm") && doc.getElementById("searchForm").action;
        var guidedSearchWraper = "";
        var learMoreText = "LEARN MORE";
        var recentSearch = [];
        var navigationStateString = "";
        if (window.outerWidth <= 768) {
          instannceNum = 1;
          MaxTextLimit = 70;
        }
        if (document.documentElement.lang === "ar") {
          learMoreText = "اعرف المزيد";
        }
        loadRecentSearch();
        // check filter isSeleclted
        var isSeleclted = function (item) {
          if (typeof item.properties === "undefined") {
            return "";
          }
          if (item.properties.selected === "true") {
            return "checked";
          }
          return "";
        };
        //return data navigation string
        var addDataNavigation = function (item) {
          return item.label !== "All" && item.label !== "الكل" ? item.navigationState : "";
        };

        //Load Filters Starts
        var loadFilters = function (data) {
          var doc = document;
          doc.querySelector(".search-filter-wrap").classList.remove("d-none");
          var filterCheck = "";

          // '<div class="selector-toggle-item swiper-slide all">' +
          // '<input type="checkbox" name="connectivity" value="gold" />' +
          // '<div class="selector-feature">' +
          // '<label class="selector-feature-label">' +
          // '<div class="tab-more-text">all</div>' +
          // "</label>" +
          // "</div>" +
          // "</div>";

          if (data.response.SecondaryContent[0].navigation.length >= 1) {
            var refinements = data.response.SecondaryContent[0].navigation[0].refinements;
             for (var i = 0; i < refinements.length; i++) {
               filterCheck +=
                 '<div class="selector-toggle-item swiper-slide">' +
                 '<input type="checkbox" name="connectivity" value="' +
                 refinements[i].label +
                 '" ' +
                 isSeleclted(refinements[i]) +
                 ">" +
                 '<div class="selector-feature">' +
                 '<label class="selector-feature-label" data-navigation="' +
                 addDataNavigation(refinements[i]) +
                 '">' +
                 '<div class="tab-more-text" title="' +
                 refinements[i].label +
                 '">' +
                 refinements[i].label +
                 "</div>" +
                 "</label>" +
                 "</div>" +
                 "</div>";
             }
             doc.querySelector(".search-result-header-4-0 .selector-toggle-wapper").innerHTML = filterCheck;
             if (doc.querySelector('input[value="All"]') && doc.querySelectorAll(".search-filter-wrap input:checked").length == 0) {
               doc.querySelector('input[value="All"]').checked = true;
               doc.querySelector('input[value="All"]').parentElement.classList.add("all");
             }
             if (doc.querySelector('input[value="الكل"]') && doc.querySelectorAll(".search-filter-wrap input:checked").length == 0) {
               doc.querySelector('input[value="الكل"]').checked = true;
               doc.querySelector('input[value="الكل"]').parentElement.classList.add("all");
             }
             initFiltersEvents();
           } else {
             doc.querySelector(".search-filter-wrap").classList.add("d-none");
           }
        };
        // Swiper slider
        function initTileCarousel() {
          var ParentWidth = $(".search-filter-wrap .selector-toggle-carousel").width();
          var childrenTotalWidth = 0;
          $(".selector-toggle-carousel .selector-toggle-item").each(function () {
            childrenTotalWidth += $(this).outerWidth(true);
          });

          if (childrenTotalWidth < ParentWidth) {
            $(this).find(".selector-toggle-carousel").addClass("destroyed");
          } else {
          }
          var $carouselSlider = swiperInit(".selector-toggle-carousel", {
            loop: false,
            autoplay: false,
            slidesPerView: "auto",
            simulateTouch: true,
            centeredSlides: false,
            spaceBetween: 12,
            breakpoints: {
              767: {
                slidesPerView: 2.5,
                spaceBetween: 12,
              },
              992: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 7,
              },
              2000: {
                slidesPerView: 8,
              },
            },
          });
        }
        var initFiltersEvents = function () {
          initTileCarousel();
          //Search results filters starts
          $(".search-filter-wrap .selector-toggle-item").on("click", function () {
            var labelVaue = $(this).children("input").prop("value");
            var navigation = $(this).find("label").data("navigation");
            if (navigation.indexOf("N=") === 0) {
              navigation = navigation.substring(2, navigation.length);
            }
            if (navigation.substring(0, 2) === "Nr") {
              navigation = "";
            }
            navigationStateString = navigation;
            guidedSearch(guidedSearchText, navigationStateString, "0", recordsNum);
            var radio = $(this).children('input[type="checkbox"]');
            radio.prop("checked", !radio.prop("checked"));
            if ($(this).hasClass("all")) {
              $(this).siblings().children('input[type="checkbox"]').prop("checked", false);
            }
            if (!$(this).hasClass("all")) {
              $(".all").children('input[type="checkbox"]').prop("checked", false);
              var count = 0;
              $(".search-filter-wrap .selector-toggle-item:not(.all)").each(function (index, item) {
                if ($(item).children('input[type="checkbox"]').prop("checked") == false) {
                  count = 0;
                  return false;
                } else {
                  count = 1;
                  return true;
                }
              });
              if (count) {
                $(".search-filter-wrap .selector-toggle-item.all").children('input[type="checkbox"]').prop("checked", true);
                $(".search-filter-wrap .selector-toggle-item.all").siblings().children('input[type="checkbox"]').prop("checked", false);
              }
            }
          });
        };
        //Load Filters ends
        // guided seach once click on suggession links
        var guidedSearch = function (searchText, navigationState, start, end) {
          var doc = document;
          $(".not-found-wrapper-4-0").addClass("d-none");
          $(".search-items-wrapper-4-0.result-default-view").addClass("d-none");
          var loadertemplate =
            '<div class="search-result-loader-4-0 sr-right">' +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2 col-md-1">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-7 col-md-9">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 col-sm-3 col-md-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2 col-md-1">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-7 col-md-9">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 col-sm-3 col-md-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2 col-md-1">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-7 col-md-9">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 col-sm-3 col-md-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2 col-md-1">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-7 col-md-9">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 col-sm-3 col-md-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2 col-md-1">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-7 col-md-9">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 col-sm-3 col-md-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            "</div>";
          if($(".search-results-wrapper-4-0 .container").length > 0) {
            document.querySelector(".search-results-wrapper-4-0 .container").innerHTML = loadertemplate;
          }
          //{"Ntt":"Prepaid & Postpaid Play OnDemand - T&Cs","N":"","No":"3","Nrpp":"8"}
          var dataWithPayload = {
            Ntt: searchText,
            N: navigationState,
            No: start,
            Nrpp: end.toString(),
          };

          var dataObjJSON = JSON.stringify(dataWithPayload, null, 2);
         /* const localUrl = navigationState.length > 0  ? "http://localhost:8000/data" : "http://localhost:3000/data";
              $.getJSON(localUrl, function (data) {
                  renderTabItems(data);
                }); THIS IS FOR TESTING IN LOCAL*/
          $.ajax({
            type: "POST",
            url: guidedSearchCall,
            data: dataObjJSON,
            dataType: "json",
            // xhrFields: {
            //      withCredentials: true
            // },
            crossDomain: true,
            headers: {
              "content-type": "application/json",
              cookie:
                '_fbp=fb.1.1569735054625.157762004; RTVisitorGuid=b7dede7c-a6f2-45e6-907a-13256bb7d062; _scid=56f7bdd3-3cd4-4dd8-bcc7-aaae00561581; _hjid=b5e10904-89d4-4892-9748-89d7e0249e24; _ga_J3ZF3NC5CP=GS1.1.1598864737.2.1.1598865538.0; eventQueue=undefined; requestQueue=undefined; activeCampaign=[]; userNotificationConsent=undefined; did=undefined; browserPush=undefined; _ga_85PWSDVDF7=GS1.1.1614160467.6.0.1614160467.0; CoreID6=71809247743216147703348&ci=90413877; _gcl_au=1.1.1691611894.1617252022; RTAppTime=Tue May 04 2021 12:23:58 GMT+0400 (Gulf Standard Time); RTVersionNumber=10; _gcl_aw=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gcl_dc=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gac_UA-138425541-4=1.1621853590.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; userProfile=undefined; mmapi.store.p.0=%7B%22mmparams.d%22%3A%7B%7D%2C%22mmparams.p%22%3A%7B%22pd%22%3A%221655197591438%7C%5C%22Ne8tdDftnFgidSB01-eQac0Gri5ORVBu5GD41ZoF5Yw%3D%7CLAAAAApDH4sIAAAAAAAEAGNhuBIzqVND5KAxA3NBRgWjEAOjE8Ndz4DdkgwC68o2C-vf9HBU2PjL8dINDwYg-A8FDPzl5eV6qSWZxYk5iSV6ialM80QYgfJMIEVwVSDFYAEGBkZXAJ4efrZqAAAA%5C%22%22%2C%22bid%22%3A%221623662191058%7C%5C%22prodphxcgeu04%5C%22%22%2C%22srv%22%3A%221655197591448%7C%5C%22prodphxcgeu04%5C%22%22%7D%7D; _gaexp=GAX1.2._AJEGFqmQjSAB9DwyZD-VQ.18881.1; CMS-cookie=!5BHt1vWiuMnwy9gxoj7/E5h0ZWiW940xt9cq5Dn4D7NG/eiDfeZ9RMJ/DM3Wuk7aI4EeybtAouPx+Y0=; _hjTLDTest=1; ADRUM=s=1623901845111&r=https%3A%2F%2Fwww.etisalat.ae%2Fen%2Findex.jsp%3F0; _gid=GA1.2.575971874.1624167671; sid=undefined; hiddenFlag=undefined; _sctr=1|1624132800000; session_timestamp=1624167681; userPrefLanguage=en_AE; ADRUM_BT2=R:24|i:720; SameSite=None; ADRUM_BTa=R:24|g:b974ddd3-55be-4aeb-8ac7-b8d90d43f8b5; ADRUM_BT1=R:24|i:720; BIGipServerb2cprod_443_pool=449065738.26395.0000; userData={\\"userProfile\\":[],\\"competingApps\\":[],\\"InboxData\\":[],\\"activeTransCampaigns\\":\\"\\",\\"activeCampaigns\\":[{\\"_id\\":\\"xxxxx\\",\\"tid\\":\\"xxxxx\\",\\"t\\":\\"FEEDBACK\\",\\"sd\\":1624173070000000,\\"ed\\":1626765070929,\\"st\\":1624172890929}],\\"getConfigUrl\\":\\"https://gccapi.appice.io/i/v1/getConfig\\",\\"result\\":[{\\"v\\":\\"1.0.1\\"},{\\"v\\":\\"1.0.11\\"}]}; XJSESSIONID=AhsoRsvOHrg6KkrZQmPbBlfvRgwsG8LKUijzyen8gk0F4S7VlFRG!1570160687; SameSite=None; myAppLocaleCookie=en; B2CJSESSIONID=M_ooXfno_FDO2eXAv8d2F8sBMsnBNZJJHNKIElmwPYugGcQARGBS!1197876252; TS0196bc3e=012b7f183cc6bdfd0817807e5f36dc61c694550a0b6496efb61318d359afe11e52157e462468b138c06bb202603738546b6fc6c536; _ga=GA1.1.1674731765.1613022195; JSESSIONID=arsoXgD-3LgGAbhfjovExTd7I_O781MZba7o1u7Qd2ZEmudInPeq!-804075655; TS0144ff4c=012b7f183c0c51952b48c15cf1664971aa7ebb59367722a14ee9b028d43d3ba14b3dc32a11e0853152154584a7c7430519c5ec4228f570ac4fdc5b1d0fd4851cbe80ca6008e9d48549b28921f3ddd649bf5434b0063d33f29c93e021f4cd9218525d35c8a75857e7de1ad32af0f40a4d1deb8591e3a1119e304cb4e4a7a2d2e1e4019a14ad55503b2e8d551267eda24d1f3a241343; _ga_BPWBRZB9JK=GS1.1.1624174886.79.0.1624174909.0',
            },
            encode: true,
          })
            .done(renderTabItems)
            .fail(submitErrorResponse);
        };

        //Check search list item dataType
        var checkType = function (item, required) {
          if (item.attributes["record.source"][0] === "ProductCatalog") {
            if (
              item.attributes["sku.type"] !== undefined &&
              item.attributes["sku.type"][0] === "mobilePlanSku" &&
              item.attributes["sku.productType"] !== undefined &&
              item.attributes["sku.productType"][0] === "MOBILE_PREPAID"
            ) {
              return required === "class" ? "prepaid" : "PREPAID PLANS";
            }
            if (
              item.attributes["sku.type"] !== undefined &&
              item.attributes["sku.type"][0] === "mobilePlanSku" &&
              item.attributes["sku.productType"] !== undefined &&
              item.attributes["sku.productType"][0] === "MOBILE_POSTPAID"
            ) {
              return required === "class" ? "postpaid" : "POSTPAID PLANS";
            }
            if (item.attributes["sku.type"][0] === "etsElifeSku") {
              return required === "class" ? "elife" : "ELIFE";
            }
            if (item.attributes["sku.type"][0] === "mobileDevicesSku") {
              return required === "class" ? "device" : "DEVICES";
            }
            if (item.attributes["sku.type"][0] === "mobileAddonsSku") {
              return required === "class" ? "addon" : "ADD-ONS";
            }
          }
          if (item.attributes["record.source"][0] === "SUPPORT") {
            return required === "class" ? "faq" : "FAQ";
          }
          return required === "class" ? "learnmore" : document.documentElement.lang === "ar" ? learMoreText : "LEARN MORE";
        };

        //Check search list item and return redirect URL
        var getURL = function (item) {
          var deviceConfigUrl = {
            postpaid: "https://www.etisalat.ae/b2c/eshop/postpaidLine?productId=",
            prepaid: "https://www.etisalat.ae/b2c/eshop/prepaidLine?productId=",
            elife: "https://www.etisalat.ae/b2c/eshop/elifePlanConfiguration?productId=",
            device: "https://www.etisalat.ae/b2c/eshop/device-configuration?productId=",
          };

          if (item.attributes["record.source"][0] === "ProductCatalog") {
            if (
              item.attributes["sku.type"] !== undefined &&
              item.attributes["sku.type"][0] === "mobilePlanSku" &&
              item.attributes["sku.productType"] !== undefined &&
              item.attributes["sku.productType"][0].toLowerCase() === "mobile_prepaid"
            ) {
              return deviceConfigUrl.prepaid + item.attributes["product.repositoryId"][0];
            }
            if (
              item.attributes["sku.type"] !== undefined &&
              item.attributes["sku.type"][0] === "mobilePlanSku" &&
              item.attributes["sku.productType"] !== undefined &&
              item.attributes["sku.productType"][0].toLowerCase() === "mobile_postpaid"
            ) {
              return deviceConfigUrl.postpaid + item.attributes["product.repositoryId"][0];
            }
            if (item.attributes["sku.type"][0] === "etsElifeSku") {
              return deviceConfigUrl.elife + item.attributes["product.repositoryId"][0];
            }
            if (item.attributes["sku.type"][0] === "mobileDevicesSku") {
              return deviceConfigUrl.device + item.attributes["product.repositoryId"][0];
            }
          }
          return deviceConfigUrl.device + item.attributes["product.repositoryId"][0];
        };

        //Render Tabs items
            var renderTabItems = function (json, statusText, xhr) {
            var tabsBodyItemData = "";
            var tabsBodyItemHTML = "";
            var totalRecords = "";
            var firstRecord = "";
            var lastRecord = "";
            var doc = document;
            if (json.success === true && statusText === "success" && json.response !== undefined && json.response.MainContent[0].totalNumRecs !== 0) {
              loadFilters(json);
              tabsBodyItemData = json.response.MainContent[0].records;
              for (var i = 0; i < tabsBodyItemData.length; i++) {
                if (
                  tabsBodyItemData[i].attributes["record.source"][0].toLowerCase() === "support" ||
                  tabsBodyItemData[i].attributes["record.source"][0].toLowerCase() === "web" ||
                  tabsBodyItemData[i].attributes["record.source"][0].toLowerCase() === "faq"
                ) {
                  tabsBodyItemHTML += '<div class="results-media ' + checkType(tabsBodyItemData[i], "class") + '">';

                  tabsBodyItemHTML +=
                    '<a data-maxlength="' + MaxTextLimit + '" href="' + tabsBodyItemData[i].attributes["record.id"][0] + '" class="media-body">';
                  if (tabsBodyItemData[i].attributes["document.title"] !== undefined) {
                    tabsBodyItemHTML += '<h5 class="media-heading">' + tabsBodyItemData[i].attributes["document.title"][0] + "</h5>";
                  }
                  if (tabsBodyItemData[i].attributes["document.text"] !== undefined) {
                    tabsBodyItemHTML += '<div class="media-description">' + tabsBodyItemData[i].attributes["document.text"][0] + "</div>";
                  }
                  tabsBodyItemHTML +=
                    "</a>" +
                    '<div class="learn-more-wrap search-rm">' +
                    '<a href="' +
                    tabsBodyItemData[i].attributes["record.id"][0] +
                    '" class="btn-text btn-green learn-more">' +
                    checkType(tabsBodyItemData[i], "name") +
                    "</a>" +
                    "</div>" +
                    "</div>";
                } else {
                  tabsBodyItemHTML += '<div class="results-media ' + checkType(tabsBodyItemData[i], "class") + '">';
                  if (tabsBodyItemData[i].attributes["sku.largeImage"] !== undefined) {
                    tabsBodyItemHTML +=
                      '<div class="media-left">' + '<img class="media-object" src="' + tabsBodyItemData[i].attributes["sku.largeImage"][0] + '">' + "</div>";
                  }
                  if (tabsBodyItemData[i].attributes["product.templateUrl"] !== undefined) {
                    tabsBodyItemHTML +=
                      '<a data-maxlength="' + MaxTextLimit + '" href="' + tabsBodyItemData[i].attributes["product.templateUrl"][0] + '" class="media-body">';
                  } else {
                    tabsBodyItemHTML += '<a data-maxlength="' + MaxTextLimit + '" href="' + getURL(tabsBodyItemData[i]) + '" class="media-body">';
                  }

                  if (tabsBodyItemData[i].attributes["sku.displayName"] !== undefined) {
                    tabsBodyItemHTML += '<h5 class="media-heading">' + tabsBodyItemData[i].attributes["sku.displayName"][0] + "</h5>";
                  }
                  if (tabsBodyItemData[i].attributes["sku.longDescription"] !== undefined) {
                    tabsBodyItemHTML += '<div class="media-description">' + tabsBodyItemData[i].attributes["sku.longDescription"][0] + "</div>";
                  }
                  if (tabsBodyItemData[i].attributes["product.templateUrl"] !== undefined) {
                    tabsBodyItemHTML += "</a>";
                  } else {
                    tabsBodyItemHTML += "</a>";
                  }
                  tabsBodyItemHTML += '<div class="action-wrapper">';
                  if (tabsBodyItemData[i].attributes["product.templateUrl"] !== undefined) {
                    tabsBodyItemHTML +=
                      '<a href="' +
                      tabsBodyItemData[i].attributes["product.templateUrl"][0] +
                      '" class="media-action">' +
                      checkType(tabsBodyItemData[i], "name") +
                      "</a>";
                  } else {
                    tabsBodyItemHTML += '<a href="' + getURL(tabsBodyItemData[i]) + '" class="media-action">' + checkType(tabsBodyItemData[i], "name") + "</a>";
                  }

                  tabsBodyItemHTML += "</div>" + "</div>";
                }
              }
              document.querySelector(".search-results-wrapper-4-0 .search-4-0-component .container").innerHTML = tabsBodyItemHTML;
              firstRecord = json.response.MainContent[0].firstRecNum !== undefined ? json.response.MainContent[0].firstRecNum : 0;
              lastRecord = json.response.MainContent[0].lastRecNum !== undefined ? json.response.MainContent[0].lastRecNum : 0;
              totalRecords = json.response.MainContent[0].totalNumRecs;
              renderPagination(firstRecord, lastRecord, totalRecords, recordsNum);
              paragraphTextLimit();
              return true;
            } else {
              var suggestions = {};
              if (typeof json.response.MainContent[1] !== "undefined" && typeof json.response.MainContent[1].suggestedSearches !== "undefined") {
                suggestions = json.response.MainContent[1].suggestedSearches[guidedSearchText][0];
              } else {
                suggestions.label = guidedSearchText;
                doc.querySelector(".search-filter-wrap").classList.add("d-none");
                doc.querySelector(".search-no-result-suggession-4-0").classList.add("d-none");
                doc.querySelector(".not-found-wrapper-4-0 .notFoundTerm").innerText = guidedSearchText;
                doc.querySelector(".not-found-wrapper-4-0").classList.remove("d-none");
                doc.querySelector(".search-items-wrapper-4-0.result-default-view").classList.remove("d-none");
                doc.querySelector(".search-result-content .search-result-headings strong").classList.remove("d-none");
                doc.querySelector(".search-result-content .search-result-headings strong").innerText = "'" + guidedSearchText + "'";
                doc.querySelector(".search-results-wrapper-4-0 .container").innerHTML = "";
                console.log("guidedSearchText on else no data-", guidedSearchText);
                return false;
              }
              searchRelatedKeywords(suggestions.label);
              //doc.querySelector('.search-no-result-suggession-4-0').classList.remove('d-none');
              doc.querySelector(".not-found-wrapper-4-0 .notFoundTerm").innerText = guidedSearchText;
              doc.querySelector(".not-found-wrapper-4-0 .did-you-mean-result").innerText = suggestions.label;
              doc.querySelector(".not-found-wrapper-4-0").classList.remove("d-none");
              doc.querySelector(".search-items-wrapper-4-0.result-default-view").classList.remove("d-none");
              doc.querySelector(".search-result-content .search-result-headings strong").classList.remove("d-none");
              doc.querySelector(".search-result-content .search-result-headings strong").innerText = "'" + guidedSearchText + "'";
              doc.querySelector(".search-results-wrapper-4-0 .container").innerHTML = "";

              //google analyticss starts
              if (typeof window.dataLayer !== "undefined") {
                window.dataLayer.push({
                  event: "search",
                  eventCategory: "search",
                  eventAction: "result_not_found",
                });
              }
              //google analyticss ends
              return true;
            }
          };

        //seach for suggession
        var searchRelatedKeywords = function (searchText) {
          console.log("searchRelatedKeywords start", searchText);
          //google analyticss ends
          var doc = document;

          var dataWithPayload = { Ntt: searchText };

          var dataObjJSON = JSON.stringify(dataWithPayload, null, 2);

          $.ajax({
            type: "POST",
            url: searchCallUrl,
            data: dataObjJSON,
            dataType: "json",
            // xhrFields: {
            //      withCredentials: true
            // },
            crossDomain: true,
            headers: {
              "content-type": "application/json",
              cookie:
                '_fbp=fb.1.1569735054625.157762004; RTVisitorGuid=b7dede7c-a6f2-45e6-907a-13256bb7d062; _scid=56f7bdd3-3cd4-4dd8-bcc7-aaae00561581; _hjid=b5e10904-89d4-4892-9748-89d7e0249e24; _ga_J3ZF3NC5CP=GS1.1.1598864737.2.1.1598865538.0; eventQueue=undefined; requestQueue=undefined; activeCampaign=[]; userNotificationConsent=undefined; did=undefined; browserPush=undefined; _ga_85PWSDVDF7=GS1.1.1614160467.6.0.1614160467.0; CoreID6=71809247743216147703348&ci=90413877; _gcl_au=1.1.1691611894.1617252022; RTAppTime=Tue May 04 2021 12:23:58 GMT+0400 (Gulf Standard Time); RTVersionNumber=10; _gcl_aw=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gcl_dc=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gac_UA-138425541-4=1.1621853590.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; userProfile=undefined; mmapi.store.p.0=%7B%22mmparams.d%22%3A%7B%7D%2C%22mmparams.p%22%3A%7B%22pd%22%3A%221655197591438%7C%5C%22Ne8tdDftnFgidSB01-eQac0Gri5ORVBu5GD41ZoF5Yw%3D%7CLAAAAApDH4sIAAAAAAAEAGNhuBIzqVND5KAxA3NBRgWjEAOjE8Ndz4DdkgwC68o2C-vf9HBU2PjL8dINDwYg-A8FDPzl5eV6qSWZxYk5iSV6ialM80QYgfJMIEVwVSDFYAEGBkZXAJ4efrZqAAAA%5C%22%22%2C%22bid%22%3A%221623662191058%7C%5C%22prodphxcgeu04%5C%22%22%2C%22srv%22%3A%221655197591448%7C%5C%22prodphxcgeu04%5C%22%22%7D%7D; _gaexp=GAX1.2._AJEGFqmQjSAB9DwyZD-VQ.18881.1; CMS-cookie=!5BHt1vWiuMnwy9gxoj7/E5h0ZWiW940xt9cq5Dn4D7NG/eiDfeZ9RMJ/DM3Wuk7aI4EeybtAouPx+Y0=; _hjTLDTest=1; ADRUM=s=1623901845111&r=https%3A%2F%2Fwww.etisalat.ae%2Fen%2Findex.jsp%3F0; _gid=GA1.2.575971874.1624167671; sid=undefined; hiddenFlag=undefined; _sctr=1|1624132800000; session_timestamp=1624167681; userPrefLanguage=en_AE; ADRUM_BT2=R:24|i:720; SameSite=None; ADRUM_BTa=R:24|g:b974ddd3-55be-4aeb-8ac7-b8d90d43f8b5; ADRUM_BT1=R:24|i:720; BIGipServerb2cprod_443_pool=449065738.26395.0000; userData={\\"userProfile\\":[],\\"competingApps\\":[],\\"InboxData\\":[],\\"activeTransCampaigns\\":\\"\\",\\"activeCampaigns\\":[{\\"_id\\":\\"xxxxx\\",\\"tid\\":\\"xxxxx\\",\\"t\\":\\"FEEDBACK\\",\\"sd\\":1624173070000000,\\"ed\\":1626765070929,\\"st\\":1624172890929}],\\"getConfigUrl\\":\\"https://gccapi.appice.io/i/v1/getConfig\\",\\"result\\":[{\\"v\\":\\"1.0.1\\"},{\\"v\\":\\"1.0.11\\"}]}; XJSESSIONID=AhsoRsvOHrg6KkrZQmPbBlfvRgwsG8LKUijzyen8gk0F4S7VlFRG!1570160687; SameSite=None; myAppLocaleCookie=en; B2CJSESSIONID=M_ooXfno_FDO2eXAv8d2F8sBMsnBNZJJHNKIElmwPYugGcQARGBS!1197876252; TS0196bc3e=012b7f183cc6bdfd0817807e5f36dc61c694550a0b6496efb61318d359afe11e52157e462468b138c06bb202603738546b6fc6c536; _ga=GA1.1.1674731765.1613022195; JSESSIONID=arsoXgD-3LgGAbhfjovExTd7I_O781MZba7o1u7Qd2ZEmudInPeq!-804075655; TS0144ff4c=012b7f183c0c51952b48c15cf1664971aa7ebb59367722a14ee9b028d43d3ba14b3dc32a11e0853152154584a7c7430519c5ec4228f570ac4fdc5b1d0fd4851cbe80ca6008e9d48549b28921f3ddd649bf5434b0063d33f29c93e021f4cd9218525d35c8a75857e7de1ad32af0f40a4d1deb8591e3a1119e304cb4e4a7a2d2e1e4019a14ad55503b2e8d551267eda24d1f3a241343; _ga_BPWBRZB9JK=GS1.1.1624174886.79.0.1624174909.0',
            },
            encode: true,
          })
            .done(relatedKeywordsSuccess)
            .fail(relatedKeywordsError);
        };
        /**
         * Callback for successfull ajax related keywords
         */
        var relatedKeywordsSuccess = function (json, statusText, xhr) {
          var relatedKeywordsHTML = "";
          var relatedKeywordsData = "";
          var doc = document;
          if (json.success === true && statusText === "success" && json.response.contents[0].autoSuggest[0].dimensionSearchGroups.length > 0) {
            doc.querySelector(".not-found-wrapper-4-0 .search-no-result-suggession-4-0").classList.remove("d-none");
            $(".did-you-mean-text .did-you-mean-result")
              .off("click")
              .on("click", function (e) {
                e.preventDefault();
                guidedSearchText = e.target.innerText;
                updateRecentSearch(guidedSearchText);
                guidedSearch(guidedSearchText, navigationStateString, "0", recordsNum);
              });

            relatedKeywordsData = json.response.contents[0].autoSuggest[0].dimensionSearchGroups[0].dimensionSearchValues;
            if (json.response.contents[0].autoSuggest[0].dimensionSearchGroups[0] === undefined) {
              doc.querySelector(".search-related-keywords .search-related-keywords-list").classList.add("d-none");
              return false;
            }
            for (var i = 0; i < relatedKeywordsData.length && i < 3; i++) {
              relatedKeywordsHTML += '<li><a href="#" class="search-related-keywords-list-item">' + relatedKeywordsData[i].label + "</a></li>";
            }

            doc.querySelector(".search-related-keywords .search-related-keywords-list").innerHTML = relatedKeywordsHTML;

            $(".search-related-keywords .search-related-keywords-list")
              .off("click")
              .on("click", function (e) {
                e.preventDefault();
                guidedSearchText = e.target.innerText;
                updateRecentSearch(guidedSearchText);
                guidedSearch(guidedSearchText, navigationStateString, "0", recordsNum);
              });

            return true;
          } else {
            doc.querySelector(".not-found-wrapper-4-0 .search-no-result-suggession-4-0").classList.add("d-none");
          }

          // in case of failure show a message
          // var errorText = json ? json.message : statusText;
          // showErrorMessage(errorText);
          //
          // loadingContainer.addClass("hidden");
          return true;
        };

        /**
         * Callback for ajax submit with related keywords
         * @param jqXHR
         * @param textStatus
         * @param error
         */
        var relatedKeywordsError = function (jqXHR, textStatus, error) {
          console.log("relatedKeywordsError", jqXHR, textStatus, error);
          var errorText = (jqXHR.responseJSON && jqXHR.responseJSON.message) || error;
        };

        function renderPagination(firstRecord, lastRecord, totalRecords, recordsPerPpage) {
          var doc = document;
          var paginationLength = Math.ceil(totalRecords / recordsPerPpage);
          var currentPage = Math.floor((lastRecord * paginationLength) / totalRecords);
          var lastPage = currentPage + 3 > paginationLength ? paginationLength : currentPage + 3;
          var startPage = currentPage + 3 > lastPage ? lastPage - 3 : currentPage;
          startPage = startPage < 1 ? 1 : startPage;
          var paginationTemplate = "";

          for (var i = startPage; i <= lastPage; i++) {
            if (i !== currentPage) {
              paginationTemplate += '<li class="item-page"><a class="pagination-link" data-link-type="link" href="#">' + i + "</a></li>";
            } else {
              paginationTemplate += '<li class="item-page active"><a class="pagination-link" data-link-type="link" href="#">' + i + "</a></li>";
            }
          }
          doc.querySelector(".pages-list .pagination-list").innerHTML = paginationTemplate;
          doc.querySelector(".search-pagination-4-0 .current-page").innerHTML = isNaN(currentPage) === true ? 0 : currentPage;
          doc.querySelector(".search-pagination-4-0 .total-pages").innerHTML = paginationLength;

          doc.querySelector(".search-pagination-4-0").classList.remove("d-none");
          doc.querySelector(".search-result-content .search-result-headings > span").classList.remove("d-none");
          doc.querySelector(".search-result-content .first-rec").innerHTML = firstRecord;
          doc.querySelector(".search-result-content .last-rec").innerHTML = lastRecord;
          doc.querySelector(".search-result-content .total-rec").innerHTML = totalRecords;
          sessionStorage.setItem("firstRecNum", firstRecord);
          sessionStorage.setItem("lastRecNum", lastRecord);
          sessionStorage.setItem("totalRecNum", totalRecords);
          sessionStorage.setItem("currentPage", currentPage);
          doc.querySelector(".search-result-content .search-result-headings strong").classList.remove("d-none");
          doc.querySelector(".search-result-content .search-result-headings strong").innerText = "'" + guidedSearchText + "'";
          var paginationArray = doc.querySelectorAll(".search-pagination-4-0 .pagination-link");

          paginationArray.forEach(function (elem) {
            elem.addEventListener("click", paginationCall);
          });
        }

        function paginationCall(event) {
          event.preventDefault();
          var firstRecord = sessionStorage.getItem("firstRecNum");
          var lastRecord = sessionStorage.getItem("lastRecNum");
          var totalRecords = sessionStorage.getItem("totalRecNum");
          var currentPage = sessionStorage.getItem("currentPage");

          if (this.dataset.linkType === "link") {
            if (this.innerText === currentPage) {
              return;
            }
            var linkNum = this.innerText * recordsNum - recordsNum;
            //linkNum = linkNum < recordsPerPpage ?  recordsPerPpage : linkNum;
            if (linkNum < parseInt(totalRecords)) {
              guidedSearch(guidedSearchText, navigationStateString, linkNum, recordsNum);
            }
          }
          if (this.dataset.linkType === "next") {
            var nextNum = parseInt(lastRecord);
            if (nextNum < parseInt(totalRecords)) {
              guidedSearch(guidedSearchText, navigationStateString, nextNum, recordsNum);
            }
          }
          if (this.dataset.linkType === "prev") {
            var prevNum = parseInt(firstRecord) - recordsNum - 1;
            if (prevNum >= 0) {
              guidedSearch(guidedSearchText, navigationStateString, prevNum, recordsNum);
            }
          }
        }

        /**
         * Callback for ajax submit with error
         * @param jqXHR
         * @param textStatus
         * @param error
         */
        var submitErrorResponse = function (jqXHR, textStatus, error) {
          var errorText = (jqXHR.responseJSON && jqXHR.responseJSON.message) || error;
        };

        //update Recent Search
        function updateRecentSearch(searchText) {
          if (recentSearch.indexOf(searchText) === -1) {
            recentSearch.unshift(searchText);
          } else {
            recentSearch.splice(recentSearch.indexOf(searchText), 1);
            recentSearch.unshift(searchText);
          }
          if (recentSearch.length > 5) {
            recentSearch.length = 5;
          }
          localStorage.setItem("eti_recentSearch", JSON.stringify(recentSearch));
        }
        //load Recent Search
        function loadRecentSearch() {
          var stroreRecentSearch = JSON.parse(localStorage.getItem("eti_recentSearch"));
          var recentItemMarkup = "";
          if (stroreRecentSearch !== null) {
            recentSearch = stroreRecentSearch;
          }
        }

        function getParameterByName(name, href) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regexS = "[\\?&]" + name + "=([^&#]*)";
          var regex = new RegExp(regexS);
          var results = regex.exec(href);
          if (results == null) return "";
          else return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var stroreRecentSearch = JSON.parse(localStorage.getItem("eti_recentSearch"));
        //var guidedSearchText = getParameterByName("term", window.location.href);
        if(stroreRecentSearch){
          var guidedSearchText = stroreRecentSearch[0];
          guidedSearch(guidedSearchText, navigationStateString, "0", recordsNum);
        }


        function paragraphTextLimit() {
          // Paragraph Character Text Limit on Search Result
          $(".media-description, .media-description p, .media-description ul li").text(function (index, currentText) {
            var maxLength = $(this).closest(".media-body").attr("data-maxlength");
            if (currentText.length >= maxLength) {
              return currentText.substr(0, maxLength) + "...";
            } else {
              return currentText;
            }
          });
        }

        //quick liks google analytics
          var quickLinks = $(".result-default-view .list.quick-links ul");
          if (quickLinks.length > 0) {
            quickLinks = quickLinks.children;
            for (var i = 0; i < quickLinks.length; i++) {
              quickLinks[i].addEventListener("click", function (e) {
                //google analyticss starts
                if (typeof window.dataLayer !== "undefined") {
                  window.dataLayer.push({
                    event: "navigation",
                    eventCategory: "navigation",
                    eventAction: "left",
                    eventLabel: "need_assistance", // replace space with "_"
                    Link: this.innerText.trim().replace(/ /g, "_"), // replace space with "_"
                  });
                }
                //google analyticss ends
              });
            }
          }
      });
   
