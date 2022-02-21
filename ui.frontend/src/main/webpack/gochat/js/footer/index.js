// dynamic year for copyright text
export const DYNAMIC_COPYRIGHT = () => {
  let copyrightElemsCont;
  if (document.querySelector(".cmp-experiencefragment--footer-2")) {
    copyrightElemsCont = document.querySelector(".cmp-experiencefragment--footer-2 > .cmp-container > .aem-Grid");
  } else {
    copyrightElemsCont = document.querySelectorAll(".cmp-experiencefragment--footer-1 > .cmp-container > .aem-Grid > .container")[1];
  }
  const copyrightElems = copyrightElemsCont.querySelector(".cmp-text p");
  copyrightElems.innerHTML = "&copy; " + new Date().getFullYear() + " GoChat";
};
