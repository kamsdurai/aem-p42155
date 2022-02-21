
   
  
        var getLink = window.location.href;
        if(document.getElementById("linkShareText") != null)
        {
        var linkInput = document.getElementById("linkShareText");
        linkInput.value = getLink;
        }
  
        $('.copyLink').click(function() {
          linkInput.select();
          document.execCommand('copy');
          $('.form-share').addClass('copied');
        });
        var getWindowOptions;
        getWindowOptions = function() {
              var width = 500;
              var height = 350;
              var left = (window.innerWidth / 2) - (width / 2);
              var top = (window.innerHeight / 2) - (height / 2);
  
              return [
                  'resizable,scrollbars,status',
                  'height=' + height,
                  'width=' + width,
                  'left=' + left,
                  'top=' + top,
              ].join();
          };
          var shareLink;
          shareLink = function(title, text, url, target){
            var text = encodeURIComponent(text);
            var shareUrl = url + getLink + '&text=' + text;
            target.href = shareUrl; // 1
  
            var win = window.open(shareUrl, title, getWindowOptions());
            win.opener = null; // 2
          }
          $('.shareFacebookk').click(function(e){
            e.preventDefault();
            shareLink('ShareOnFb','Hey everyone, come & see this link!','https://www.facebook.com/sharer/sharer.php?u=',e.target)
          });
          $('.shareLinkedIn').click(function(e){
            e.preventDefault();
            shareLink('ShareOnLinkedIn','Hey everyone, come & see this link!','http://www.linkedin.com/shareArticle?mini=true&url=',e.target)
          });
          $('.shareTwitter').click(function(e){
            e.preventDefault();
            shareLink('ShareOnTwitter','Hey everyone, come & see this link!','https://twitter.com/intent/tweet?url=',e.target)
          });
    

//JS for Share this Design 
$(function () {
  const PANELS = $(".action.share.fix");

  if(!PANELS.length) {
    return false
  }
  
  const FOOTER_LINKS = $(".quick-links-section");
  const TRUE_CLS = "true";
  const POS = PANELS.offset().top;
  const FOOTER_TOP = FOOTER_LINKS.offset().top;
  const MOBILE_VIEW = $(window).width() <= 768;
  const MOBILE_HW = FOOTER_TOP - (FOOTER_LINKS.height() - 450)
  const DESKTOP_HW = FOOTER_TOP - (FOOTER_LINKS.height());

  $(window).scroll(function () {
    let WINDOW_POS = $(window).scrollTop();
      if (MOBILE_VIEW ? WINDOW_POS >= MOBILE_HW : WINDOW_POS >= DESKTOP_HW) {
        PANELS.removeClass(TRUE_CLS);
      } 
      else if (WINDOW_POS >= POS) {
        PANELS.addClass(TRUE_CLS);
      } 
      else {
        PANELS.removeClass(TRUE_CLS);
      }  
  });
});