export const STICKY_HEADER = () => {
  const HEADER = document.querySelector("header");
  const DOC = document.documentElement;
  const LOGO = document.querySelector(".logo");
  const LOGO_STICKY = document.querySelector(".logo--sticky");

  let currScrollTop = (window.pageYOffset || DOC.scrollTop) - (DOC.clientTop || 0);
  
  if (currScrollTop >= 100) {
    HEADER.classList.add("header--sticky");
    LOGO_STICKY.setAttribute("style", "display: block !important");
    LOGO.style.display = "none";
  } else {
    HEADER.classList.remove("header--sticky");
    LOGO_STICKY.setAttribute("style", "display: none !important");
    LOGO.style.display = "block";
  }
};
