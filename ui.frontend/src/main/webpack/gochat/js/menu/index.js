export const MAIN_NAVIGATION = () => {
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector("nav");
  const navMenu = document.querySelector("nav .menu");
  var lastId;
  var topMenu = $("header");
  var topMenuHeight = topMenu.outerHeight() + 15;
  // var menuItems = topMenu.find(".menu li a");
  // const footerLinks = document.querySelectorAll("footer ul li a");

  var menuItems = $("header, footer, .page-scroll").find("ul li a, .btn-primary");

  var scrollItems = menuItems.map(function () {
    if ($(this).attr("href").indexOf("/") === -1) {
      let item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    }
  });

  // toggle mobile menu on hamburger click
  const menuToggle = () => {
    mainNav.classList.toggle("nav--overlay");
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("hamburger--close");
  };
  hamburger.addEventListener("click", menuToggle);

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    e.preventDefault();
    let href = $(this).attr("href");
    if (href.indexOf("/") === -1) {
      // $(hash).offset().top - 90;
      $(".main-nav__item").removeClass("active");

      $(this).parent().addClass("active");
      let offsetTop = href === "#" ? 0 : $(href).offset().top - 90;
      $("html, body").stop().animate(
        {
          scrollTop: offsetTop,
        },
        800,
      );
    } else {
      window.location = href;
    }
    mainNav.classList.remove("nav--overlay");
    navMenu.classList.remove("active");
    hamburger.classList.remove("hamburger--close");
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active");
    }
  });
};
