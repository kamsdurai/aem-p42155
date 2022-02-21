$(document).ready(function () {
  $(".ewallet-chat-button").on("click", function () {
    var iframeSrc =
      "https://communicate-chat.etisalat.ae/chat-ui/#/ewallet/ewalletapp?language=EN";
    if ($(".ewallet-chat-panel").find("iframe").attr("src") == "") {
      $(".ewallet-chat-panel").find("iframe").attr("src", iframeSrc);
    }
    $(".ewallet-chat-button").hide();
    $(".ewallet-chat-panel").fadeIn();
  });
  $(".minAI").on("click", function () {
    $(".ewallet-chat-button").fadeIn();
    $(".ewallet-chat-panel").hide();
  });
});
