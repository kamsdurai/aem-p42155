//JSON added here as temporarily - creating separated json file causes access denied in AEM
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function getProductCard(data) {
  var products = data.products;
  var html = "";
  var featuredTile = $(".product-grid-cms");
  var featuredPosition = 0;

  var promoText = $("#related-products").attr("data-promoPreText") != "" ? $("#related-products").attr("data-promoPreText") : "SPECIAL OFFER ";
  var off = $("#related-products").attr("data-off") != "" ? $("#related-products").attr("data-off") : "% OFF";
  var exclusive = $("#related-products").attr("data-exclusive") != "" ? $("#related-products").attr("data-exclusive") : "Online Exclusive";
  var browserLang = $("html")[0].lang != "" ? $("html")[0].lang : "";
  var urlString = $("#related-products").attr("data-buyNowUrl") != "" ? $("#related-products").attr("data-buyNowUrl") : "";

  if (featuredTile.length) {
    featuredPosition = featuredTile.data("position");
  }

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    if (featuredPosition == i + 1) {
      html += '<div class="swiper-slide col-xs-12 col-sm-6 col-md-4" style="width: 306px;min-width:306px">';
      html += featuredTile.html();
      html += "</div>";
    }

    var classes = "tile-table device-card";

    var redirectUrl = urlString + "?productId=" + product.productId + "&locale=" + browserLang;
    if (product.oldPrice) {
      classes = "tile-table device-card offer";
    }
    html +=
      '<div class="swiper-slide col-xs-12 col-sm-6 col-md-4" style="width: 306px; min-width:306px">' +
      '<div class="' +
      classes +
      '">' +
      '<div class="tile-card effect__click">' +
      '<a href="' +
      redirectUrl +
      '" class="tile">' +
      '<div class="tile-card__front">' +
      '<div class="tiles-box content body-standard">' +
      '<div class="product">';

    html += '<div class="main-loader"></div><img class="product-img swiper-lazy" src="' + product.image + '" alt="device">';

    if (product.onlineOnly == "1") {
      html +=
        '<div class="green-online-exclusive bg-orange with-card">' +
        '<div class="content">' +
        '<div class="icon">' +
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" fill="#fff" xml:space="preserve">' +
        "<g>" +
        "<g>" +
        '<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842 "></polygon>' +
        "</g>" +
        "</g>" +
        "</svg>" +
        "</div>" +
        '<div class="text">' +
        exclusive +
        "</div>" +
        "</div>" +
        "</div>";
    }
    html += "</div>" + '<div class="tiles-box-title">';
    if (product.oldPrice != undefined && product.oldPrice > 0) {
      html += '<div class="special-offer">' + promoText + Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100) + off + "</div>";
    }

    html += '<div class="catagory">' + product.brand + "</div>" + '<h2 dir="ltr">' + product.productName + "</h2>" + '<ul class="colorList">';

    if (product.hasOwnProperty("availableConfgiurations")) {
      var config = product.availableConfgiurations;
      for (var j = 0; j < config.length; j++) {
        if (config[j].type === "COLOR") {
          html += '<li style="background-color:' + config[j].value + '">' + config[j].name + "</li>";
        }
      }
    }
    var buyNowText = $("#related-products").attr("data-buyNowText") != "" ? $("#related-products").attr("data-buyNowText") : "BUY NOW";

    if (product.isPreorder) {
      buyNowText = $("#related-products").attr("data-preOrderText") != "" ? $("#related-products").attr("data-preOrderText") : "Pre-order";
    }
    var aedText = $("#related-products").attr("data-aedtext") != "" ? $("#related-products").attr("data-aedtext") : " AED ";

    var fromText = $("#related-products").attr("data-fromText") != "" ? $("#related-products").attr("data-fromText") : " From ";

    var wasText = $("#related-products").attr("data-wasText") != "" ? $("#related-products").attr("data-wasText") : " was ";

    var vatText = $("#related-products").attr("data-vatText") != "" ? $("#related-products").attr("data-vatText") : " 5% VATVAT included";

    var or = $("#related-products").attr("data-or") != "" ? $("#related-products").attr("data-or") : "or ";
    var smilePoints = $("#related-products").attr("data-smilePoints") != "" ? $("#related-products").attr("data-smilePoints") : " Smiles Points";

    html +=
      "</ul>" +
      "</div>" +
      '<div class="tiles-box-list auto">' +
      '<div class="detail-info-wrap detail-info-wrap-pricetag">' +
      '<div class="detail-price-new">' +
      '<div class="main-part">' +
      '<div dir="ltr" class="from">' +
      fromText +
      "</div>";
    if (product.discountPrice != "" && product.discountPrice > 0) {
      html += '<div dir="ltr" class="price">' + parseFloat(product.discountPrice).toFixed(2) + " </div>";
    } else {
      html += '<div dir="ltr" class="price">' + parseFloat(product.price).toFixed(2) + " </div>";
    }
    html += "<small>" + aedText + "</small>" + "</div>" + "</div>" + "</div>";

    html += '<p class="bottom-text">';
    if (product.oldPrice != "" && product.oldPrice > 0) {
      html +=
        '<span class="before-price-container">' +
        wasText +
        ' <span class="before-price">' +
        parseInt(product.oldPrice).toFixed(2) +
        " " +
        aedText +
        " </span></span>";
    }
    html += vatText + "</p>";

    html += "</div>";
    html +=
      '<div class="smile-points">' +
      or +
      " " +
      numberWithCommas(parseInt(product.price) * 100) +
      " " +
      smilePoints +
      "</div>" +
      '<a href="' +
      redirectUrl +
      '"><div class="read-more select-product-from-grid select-product-from-grid-without-close" data-extra-container=".extra-options-02">' +
      "<span>" +
      buyNowText +
      "</span>" +
      "</div></a>" +
      "</div>" +
      "</div>" +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>";
  }

  return html;
}

function initProductCards() {
  $(".main-loader").show();
  $.ajax({
    // Our sample url to make request
    url: window.location.origin + "/content/dam/etisalat/product-details/mockdata/product.json",

    // Type of Request
    type: "GET",

    // Function to call when to
    // request is ok
    success: function (data) {
      //var x = JSON.stringify(data);

      var htmlCards = getProductCard(data);
      //With Slider
      var htmlCards = getProductCard(data);
      var htmlTrendingCards = getProductCard(data);

      //With LoadMore button
      var htmlsmartTVCards = getProductCard(data);
      $("#products_2gdevices").html(htmlCards);
      $("#products_smartlife").html(htmlTrendingCards);
      $("#products_smarttv").html(htmlsmartTVCards);
      $(".main-loader").hide();
    },

    // Error handling
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}

// register the event handlers
$(document).ready(function () {
  initProductCards();
});
