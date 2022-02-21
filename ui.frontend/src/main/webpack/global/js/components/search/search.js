
      function debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
            args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }
      // register the event handlers
      $(document).ready(function () {
        if( $(".search-input").length <= 0 ){
          return false;
        }
        var instannceNum = 0;
        var doc = document;
        var searchInput = doc.querySelectorAll(".search-input");

        var searchCallUrl = doc.getElementById("searchForm") &&  doc.getElementById("searchForm").action;
        // https://www.etisalat.ae/b2c/autoSuggest.service?locale=en-AE
        var guidedSearchCall = doc.getElementById("searchForm") && doc.getElementById("searchForm").getAttribute("data-secondary-search");
        // https://qacms-uat.etisalat.ae/b2c/guidedSearchRequest.service?locale=en-AE
        var resultPageRedirect = doc.getElementById("searchForm") && doc.getElementById("searchForm").getAttribute("data-redirect-url");
        var guidedSearchText = "";
        var guidedSearchWraper = "";
        var resultPageURL = window.location.origin + resultPageRedirect;
        var topResult = "Top results";
        var learMoreText = "LEARN MORE";
        var viewAll = "view all results";
        var recentSearch = [];
        const searchCookieKey =
          '_fbp=fb.1.1569735054625.157762004; RTVisitorGuid=b7dede7c-a6f2-45e6-907a-13256bb7d062; _scid=56f7bdd3-3cd4-4dd8-bcc7-aaae00561581; _hjid=b5e10904-89d4-4892-9748-89d7e0249e24; _ga_J3ZF3NC5CP=GS1.1.1598864737.2.1.1598865538.0; eventQueue=undefined; requestQueue=undefined; activeCampaign=[]; userNotificationConsent=undefined; did=undefined; browserPush=undefined; _ga_85PWSDVDF7=GS1.1.1614160467.6.0.1614160467.0; CoreID6=71809247743216147703348&ci=90413877; _gcl_au=1.1.1691611894.1617252022; RTAppTime=Tue May 04 2021 12:23:58 GMT+0400 (Gulf Standard Time); RTVersionNumber=10; _gcl_aw=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gcl_dc=GCL.1621853589.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; _gac_UA-138425541-4=1.1621853590.Cj0KCQjwna2FBhDPARIsACAEc_Wrcktzu2-yRzrwPzanl8H4p-1OLqvRYLS70WggiHrzwYexkCPvwdYaAt7sEALw_wcB; userProfile=undefined; mmapi.store.p.0=%7B%22mmparams.d%22%3A%7B%7D%2C%22mmparams.p%22%3A%7B%22pd%22%3A%221655197591438%7C%5C%22Ne8tdDftnFgidSB01-eQac0Gri5ORVBu5GD41ZoF5Yw%3D%7CLAAAAApDH4sIAAAAAAAEAGNhuBIzqVND5KAxA3NBRgWjEAOjE8Ndz4DdkgwC68o2C-vf9HBU2PjL8dINDwYg-A8FDPzl5eV6qSWZxYk5iSV6ialM80QYgfJMIEVwVSDFYAEGBkZXAJ4efrZqAAAA%5C%22%22%2C%22bid%22%3A%221623662191058%7C%5C%22prodphxcgeu04%5C%22%22%2C%22srv%22%3A%221655197591448%7C%5C%22prodphxcgeu04%5C%22%22%7D%7D; _gaexp=GAX1.2._AJEGFqmQjSAB9DwyZD-VQ.18881.1; CMS-cookie=!5BHt1vWiuMnwy9gxoj7/E5h0ZWiW940xt9cq5Dn4D7NG/eiDfeZ9RMJ/DM3Wuk7aI4EeybtAouPx+Y0=; _hjTLDTest=1; ADRUM=s=1623901845111&r=https%3A%2F%2Fwww.etisalat.ae%2Fen%2Findex.jsp%3F0; _gid=GA1.2.575971874.1624167671; sid=undefined; hiddenFlag=undefined; _sctr=1|1624132800000; session_timestamp=1624167681; userPrefLanguage=en_AE; ADRUM_BT2=R:24|i:720; SameSite=None; ADRUM_BTa=R:24|g:b974ddd3-55be-4aeb-8ac7-b8d90d43f8b5; ADRUM_BT1=R:24|i:720; BIGipServerb2cprod_443_pool=449065738.26395.0000; userData={\\"userProfile\\":[],\\"competingApps\\":[],\\"InboxData\\":[],\\"activeTransCampaigns\\":\\"\\",\\"activeCampaigns\\":[{\\"_id\\":\\"xxxxx\\",\\"tid\\":\\"xxxxx\\",\\"t\\":\\"FEEDBACK\\",\\"sd\\":1624173070000000,\\"ed\\":1626765070929,\\"st\\":1624172890929}],\\"getConfigUrl\\":\\"https://gccapi.appice.io/i/v1/getConfig\\",\\"result\\":[{\\"v\\":\\"1.0.1\\"},{\\"v\\":\\"1.0.11\\"}]}; XJSESSIONID=AhsoRsvOHrg6KkrZQmPbBlfvRgwsG8LKUijzyen8gk0F4S7VlFRG!1570160687; SameSite=None; myAppLocaleCookie=en; B2CJSESSIONID=M_ooXfno_FDO2eXAv8d2F8sBMsnBNZJJHNKIElmwPYugGcQARGBS!1197876252; TS0196bc3e=012b7f183cc6bdfd0817807e5f36dc61c694550a0b6496efb61318d359afe11e52157e462468b138c06bb202603738546b6fc6c536; _ga=GA1.1.1674731765.1613022195; JSESSIONID=arsoXgD-3LgGAbhfjovExTd7I_O781MZba7o1u7Qd2ZEmudInPeq!-804075655; TS0144ff4c=012b7f183c0c51952b48c15cf1664971aa7ebb59367722a14ee9b028d43d3ba14b3dc32a11e0853152154584a7c7430519c5ec4228f570ac4fdc5b1d0fd4851cbe80ca6008e9d48549b28921f3ddd649bf5434b0063d33f29c93e021f4cd9218525d35c8a75857e7de1ad32af0f40a4d1deb8591e3a1119e304cb4e4a7a2d2e1e4019a14ad55503b2e8d551267eda24d1f3a241343; _ga_BPWBRZB9JK=GS1.1.1624174886.79.0.1624174909.0';

        // switch js between mobile and desktop UI
        if (window.outerWidth <= 991) {
          instannceNum = 1;
        }
        if (doc.documentElement.lang === "ar") {
          topResult = "أفضل النتائج";
          learMoreText = "اعرف المزيد";
          viewAll = "عرض جميع النتائج";
        }
        loadRecentSearch();
        searchInput[instannceNum].value = "";
        if (doc.querySelectorAll(".getMore").length) {
          doc.querySelectorAll(".getMore")[instannceNum].id = document.querySelectorAll(".getMore")[instannceNum].id + instannceNum;
        }
        var keyupSearchFunc = debounce(function (event) {
          if (event.isComposing || event.keyCode === 229) {
            //keycode 229 for Android browser fix to prevent placeholder value
            return;
          }
          var searchText = searchInput[instannceNum].value.trim();
          if (searchText.length > 2) {
            searchTerm(searchText);
          } else {
            doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.remove("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").classList.add("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".mobile-head").classList.add("d-none");
            doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.add("d-none"); // refactor
          }
        }, 500);
        doc.querySelectorAll("form[name=searchForm]")[instannceNum].addEventListener(
          "submit",
          function (e) {
            //search(document.getElementById('searchText'));
            e.preventDefault();
            var searchText = searchInput[instannceNum].value.trim();
            if (searchText.length > 2) {
              updateRecentSearch(searchText);
              //window.location.href = encodeURI(resultPageURL+'?term='+searchText);
              window.location.href = resultPageURL;
            }
          },
          false,
        );
        searchInput[instannceNum].addEventListener("keyup", keyupSearchFunc);
        //render Recent Search
        function loadRecentSearch() {
          try {
            var stroreRecentSearch = JSON.parse(localStorage.getItem("eti_recentSearch"));
            var recentItemMarkup = "";
            if (stroreRecentSearch !== null) {
              recentSearch = stroreRecentSearch;
              for (var i = 0; i < recentSearch.length; i++) {
                recentItemMarkup += '<li class="list-item"><a href="#">' + recentSearch[i] + "</a></li>";
              }
              doc.querySelectorAll(".search-items-wrapper-4-0 .search-items-wrapper")[0].classList.add("recent-wrapper");
              doc.querySelectorAll(".list.recent")[instannceNum].classList.remove("d-none");
              doc.querySelectorAll(".recentItemList")[instannceNum].innerHTML = recentItemMarkup;
              var listItems = doc.querySelectorAll(".recentItemList")[instannceNum].children;
              for (var i = 0; i < listItems.length; i++) {
                listItems[i].addEventListener("click", function (e) {
                  e.preventDefault();
                  doc.querySelectorAll(".search-input")[instannceNum].value = this.innerText.trim();
                  searchTerm(this.innerText.trim());
                });
              }
            }
          } catch (error) {
            console.log("some error in the loadRecentSearch");
          }
        }
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
          loadRecentSearch();
        }
        //seach for suggession
        var searchTerm = function (searchText) {
          console.log("On typeahead api call");
          //google analyticss starts
          if (typeof window.dataLayer !== "undefined") {
            window.dataLayer.push({
              event: "search",
              eventCategory: "search",
              eventAction: searchText,
            });
          }
          //google analyticss ends
          var doc = document;
          var loadertemplate =
            '<div class="search-result-loader-4-0 sr-left">' +
            '<div class="ph-item">' +
            '<div class="row"><div class="col-xs-6"><div class="ph-fill ph-big"></div></div></div>' +
            '<div class="row"><div class="col-xs-8"><div class="ph-fill ph-big"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill ph-big"></div></div></div>' +
            '<div class="row"><div class="col-xs-7"><div class="ph-fill ph-big"></div></div></div>' +
            '<div class="row"><div class="col-xs-12"><div class="ph-fill ph-big"></div></div></div>' +
            "</div>" +
            "</div>";
          doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.add("d-none"); // refactor
          doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.add("d-none");
          doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").innerHTML = loadertemplate;
          doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").classList.remove("d-none");
          var dataWithPayload = { Ntt: searchText };

          var dataObjJSON = JSON.stringify(dataWithPayload, null, 2);
          console.log("send request data on debounce-normal-", dataObjJSON);
          $.ajax({
            type: "POST",
            url: searchCallUrl,
            data: dataObjJSON,
            dataType: "json",
            xhrFields: { withCredentials: true },
            // xhrFields: {
            //      withCredentials: true
            // },
            crossDomain: true,
            headers: {
              "content-type": "application/json",
              Cookie: searchCookieKey,
            },
            encode: true,
          })
            .done(successResponseHandler)
            .fail(errorResponseHandler);
        };

        // guided seach once click on suggession links
        var guidedSearch = function (searchText, target) {
          console.log("on enter click search...");
          var loadertemplate =
            '<div class="search-result-loader-4-0 sr-right">' +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-8">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-8">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            //item
            '<div class="ph-item">' +
            '<div class="row">' +
            '<div class="col-xs-3 col-sm-2">' +
            '<div class="ph-avatar"></div>' +
            "</div>" +
            '<div class="col-xs-9 col-sm-8">' +
            '<div class="row"><div class="col-xs-8"><div class="ph-big ph-fill"></div></div><div class="col-xs-4"><div class="ph-empty"></div></div></div>' +
            '<div class="row"><div class="col-xs-10"><div class="ph-fill"></div></div><div class="col-xs-1"><div class="ph-empty"></div></div></div>' +
            "</div>" +
            '<div class="col-xs-2 ph-button-wrapper">' +
            '<div class="ph-fill ph-button"></div>' +
            "</div>" +
            "</div>" +
            '<div class="ph-separator"></div>' +
            "</div>" +
            "</div>";

          guidedSearchWraper = target;
          guidedSearchText = searchText;
          document.getElementById(guidedSearchWraper).innerHTML = loadertemplate;
          //{"Ntt":"Prepaid & Postpaid Play OnDemand - T&Cs","N":"","No":"3","Nrpp":"8"}
          var dataWithPayload = { Ntt: searchText, N: "", No: "0", Nrpp: "4" };

          var dataObjJSON = JSON.stringify(dataWithPayload, null, 2);
          console.log("send request data", dataObjJSON);
          $.ajax({
            type: "POST",
            url: guidedSearchCall,
            data: dataObjJSON,
            dataType: "json",
            xhrFields: { withCredentials: true },
            // xhrFields: {
            //      withCredentials: true
            // },
            crossDomain: true,
            headers: {
              "content-type": "application/json",
              Cookie: searchCookieKey,
            },
            encode: true,
          })
            .done(renderTabItems)
            .fail(errorResponseHandler);
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
          if (json.success === true && statusText === "success" && json.response !== undefined) {
            tabsBodyItemData = json.response.MainContent[0].records;
            for (var i = 0; i < tabsBodyItemData.length && i < 3; i++) {
              if (
                tabsBodyItemData[i].attributes["record.source"][0].toLowerCase() === "support" ||
                tabsBodyItemData[i].attributes["record.source"][0].toLowerCase() === "web"
              ) {
                tabsBodyItemHTML += '<div class="results-media ' + checkType(tabsBodyItemData[i], "class") + '">';

                tabsBodyItemHTML += '<a href="' + tabsBodyItemData[i].attributes["record.id"][0] + '" class="media-body">';
                if (tabsBodyItemData[i].attributes["document.title"] !== undefined) {
                  tabsBodyItemHTML += '<h5 class="media-heading">' + tabsBodyItemData[i].attributes["document.title"][0] + "</h5>";
                }
                if (tabsBodyItemData[i].attributes["document.text"] !== undefined) {
                  tabsBodyItemHTML += '<div class="media-description">' + tabsBodyItemData[i].attributes["document.text"][0] + "</div>";
                }
                tabsBodyItemHTML +=
                  "</a>" +
                  '<div class="action-wrapper">' +
                  '<a href="' +
                  tabsBodyItemData[i].attributes["record.id"][0] +
                  '" class="media-action">' +
                  checkType(tabsBodyItemData[i], "name") +
                  "</a>" +
                  "</div>" +
                  "</div>";
              } else {
                tabsBodyItemHTML += '<div class="results-media ' + checkType(tabsBodyItemData[i], "class") + '">';
                if (tabsBodyItemData[i].attributes["sku.largeImage"] !== undefined) {
                  tabsBodyItemHTML += '<div class="media-left">';
                  if (tabsBodyItemData[i].attributes["product.templateUrl"] !== undefined) {
                    tabsBodyItemHTML += '<a href="' + tabsBodyItemData[i].attributes["product.templateUrl"][0] + '" class="">';
                  } else {
                    tabsBodyItemHTML += '<a  href="' + getURL(tabsBodyItemData[i]) + '" class="">';
                  }
                  tabsBodyItemHTML += '<img class="media-object" src="' + tabsBodyItemData[i].attributes["sku.largeImage"][0] + '">';

                  tabsBodyItemHTML += "</a>" + "</div>";
                }
                if (tabsBodyItemData[i].attributes["product.templateUrl"] !== undefined) {
                  tabsBodyItemHTML += '<a href="' + tabsBodyItemData[i].attributes["product.templateUrl"][0] + '" class="media-body">';
                } else {
                  tabsBodyItemHTML += '<a  href="' + getURL(tabsBodyItemData[i]) + '" class="media-body">';
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
            if (tabsBodyItemData.length >= 3) {
              tabsBodyItemHTML +=
                '<div class="col-xs-12 mt-30 mb-20 text-center">' +
                '<a href="' +
                resultPageURL +
                '" class="btn-text btn-green no-arrow">' +
                viewAll +
                "</a>" +
                "</div>";
            }
            document.getElementById(guidedSearchWraper).innerHTML = tabsBodyItemHTML;
            return true;
          } else {
            tabsBodyItemHTML +=
              '<div class="results-media">' + '<div class="media-body">' + '<div class="media-description">No Record Found</div>' + "</div>" + "</div>";
            document.getElementById(guidedSearchWraper).innerHTML = tabsBodyItemHTML;
            return true;
          }
        };

        /**
         * Callback for successfull ajax submit
         */
        var successResponseHandler = function (json, statusText, xhr) {
          var tabsHeadHTML = "";
          var tabsBodyHTML = "";
          var tabHeadData = "";
          var doc = document;
          console.log("successResponseHandler init");
          console.log("successResponseHandler init", json.success, statusText, json.response.contents[0].autoSuggest[0].dimensionSearchGroups.length);
          if (json.success === true && statusText === "success" && json.response.contents[0].autoSuggest[0].dimensionSearchGroups.length > 0) {
            doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.add("d-none"); // refactor
            tabHeadData = json.response.contents[0].autoSuggest[0].dimensionSearchGroups[0].dimensionSearchValues;
            //for(var i=0; i<tabHeadData.length; i++){
            for (var i = 0; i < tabHeadData.length && i < 5; i++) {
              tabsHeadHTML +=
                '<a data-toggle="collapse" class="' +
                (i > 0 ? "collapsed" : "") +
                '" data-parent="#getMore' +
                instannceNum +
                '" href="#collapse1' +
                i +
                '">  ' +
                tabHeadData[i].label +
                " </a>";
              tabsBodyHTML +=
                '<div id="collapse1' +
                i +
                '" class="panel-collapse collapse fade ' +
                (i > 0 ? "" : "in") +
                '"> <div class="desktop-body">' +
                i +
                " </div> </div>";
            }
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").innerHTML = tabsHeadHTML;
            doc.querySelectorAll(".tabsPanes-wrapper")[instannceNum].innerHTML =
              '<div class="tabs-expansion-title-wrap"> <h4>' + topResult + "</h4> </div>" + tabsBodyHTML;
            doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.add("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".mobile-head").classList.remove("d-none");
            guidedSearch(tabHeadData[0].label, "collapse10");
            updateRecentSearch(tabHeadData[0].label);
            $(".tabs-expansion-section .desktop-head a")
              .off("click")
              .on("click", function (e) {
                $(".tabs-expansion-section .desktop-head a").addClass();
                var attr = $(this).attr("href");
                var text = $(this).text().trim();
                var divRef = $(this).parents(".tabs-expansion-section").find(".mobile-head").find(attr);

                if (divRef.hasClass("in")) {
                  e.stopPropagation();
                  e.preventDefault();
                  return;
                }
                guidedSearch(text, attr.substring(1));
                updateRecentSearch(text);
              });
            return true;
          } else {
            console.log("error in api call - not found.");
            doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.remove("d-none");
            //doc.querySelectorAll('.notFoundTerm')[instannceNum].innerText = searchInput[instannceNum].value;
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").classList.add("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".mobile-head").classList.add("d-none");
            doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.remove("d-none"); // refactor
          }

          // in case of failure show a message
          // var errorText = json ? json.message : statusText;
          // showErrorMessage(errorText);
          //
          // loadingContainer.addClass("hidden");
          return true;
        };

        /**
         * Callback for ajax submit with error
         * @param jqXHR
         * @param textStatus
         * @param error
         */
        var errorResponseHandler = function (jqXHR, textStatus, error) {
          var doc = document;
          var errorText = (jqXHR?.responseJSON && jqXHR?.responseJSON?.message) || error || "Something Went wrong!";
          console.log("err responseJSON is-", jqXHR?.responseJSON, "err jqXHR text is-", jqXHR?.responseJSON?.message, "-Error is-", error);
          // refactor. search component only need to test on search-result-page
          //doc.querySelectorAll('.notFoundTerm')[instannceNum].innerText = searchInput[instannceNum].value;
          // to display error message 
          // doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.remove("d-none");
          // doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").classList.add("d-none");
          // doc.querySelectorAll(".getMore")[instannceNum].querySelector(".mobile-head").classList.add("d-none");
          // doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.remove("d-none");
          // doc.querySelectorAll(".search-not-found-4-0 .text")[instannceNum].innerHTML = errorText;
        };
        document.querySelectorAll(".clearSearch")[instannceNum].addEventListener("click", clearSearch);

        // clear search
        function clearSearch() {
          var doc = document;
          if (doc.querySelectorAll(".search-input")[instannceNum].value.length > 0) {
            doc.querySelectorAll(".search-input")[instannceNum].value = "";
            doc.querySelectorAll(".search-items-wrapper")[instannceNum].classList.remove("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".desktop-head").classList.add("d-none");
            doc.querySelectorAll(".getMore")[instannceNum].querySelector(".mobile-head").classList.add("d-none");
            doc.querySelectorAll(".search-not-found-4-0")[instannceNum].classList.add("d-none"); // refactor
          }
        }

        // close search box when hover on other list items.
        $(".main-mega-menu-desktop .navbar-items .navbar-nav > li:not(.icon-link)").mouseover(function (e) {
          if ($(".main-mega-menu-desktop").hasClass("backdrop-search-4-0")) {
            $(".mega-dropdown.search-4-0.open").removeClass("open");
            $(".main-mega-menu-desktop").removeClass("backdrop-search-4-0");
             $(".main-mega-menu-desktop").css("height", 100 + "%");
          }
        });
        $(".search-link-cms .mega-menu-link")
          .off("click")
          .on("click", function (e) {
            var target = $(this).next(".mega-dropdown");
            if ($(target).hasClass("open")) {
              $(".main-mega-menu-desktop").removeClass("backdrop-search-4-0");
              $(".main-mega-menu-desktop").css("height", 100 + "%");

              $(target).removeClass("open");
              clearSearch();
            } else {
              var $backdropHeight = $(".main-mega-menu-desktop");
              var body = document.body,
                html = document.documentElement;
              var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

              $backdropHeight.addClass("backdrop-search-4-0");
              $backdropHeight.css("height", height);
              $backdropHeight.css("z-index", 999);
              $(target).addClass("open");
            }

            $(".backdrop-search-4-0")
              .off("click")
              .on("click", function (e) {
                if (e.target.classList.contains("backdrop-search-4-0") || e.target.classList.contains("mega-menu-navbar")) {
                  $(".mega-dropdown.search-4-0.open").removeClass("open");
                  $(".main-mega-menu-desktop").removeClass("backdrop-search-4-0");
                  $(".main-mega-menu-desktop").css("height", 100 + "%");
                  //  return false;
                }
              });
          });

        //quick liks google analytics
        var quickLinks = doc.querySelectorAll(".search-items .list.quick-links ul")[instannceNum].children || "";
        for (var i = 0; i < quickLinks.length; i++) {
          quickLinks[i].addEventListener("click", function (e) {
            //google analyticss starts
            if (typeof window.dataLayer !== "undefined") {
              window.dataLayer.push({
                event: "navigation",
                eventCategory: "navigation",
                eventAction: "top",
                eventLabel: "quick_links", // replace space with "_"
                Link: this.innerText.trim().replace(/ /g, "_"), // replace space with "_"
              });
            }
            //google analyticss ends
          });
        }
        //trending liks google analytics
        var trendingLinksParent = doc.querySelectorAll(".search-items .list.trends .menu-brand-wrapper")[instannceNum] || "";
        var trendingLinks = trendingLinksParent.querySelectorAll(".content") || "";
        for (var i = 0; i < trendingLinks.length; i++) {
          trendingLinks[i].addEventListener("click", function (e) {
            //google analyticss starts
            if (typeof window.dataLayer !== "undefined") {
              window.dataLayer.push({
                event: "navigation",
                eventCategory: "navigation",
                eventAction: "top",
                eventLabel: "trending_search",
                Link: this.children[0].innerText.trim().replace(/ /g, "_"), // replace space with "_"
              });
            }
            //google analyticss ends
          });
        }
      });

      // Paragraph Character Text Limit on Search Result
      $(".media-description p").text(function (index, currentText) {
        var maxLength = $(this).parent().attr("data-maxlength");
        if (currentText.length >= maxLength) {
          return currentText.substr(0, maxLength) + "...";
        } else {
          return currentText;
        }
      });