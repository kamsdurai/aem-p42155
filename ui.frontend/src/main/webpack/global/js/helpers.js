export const IsMediaQuery = {
  xs: window.matchMedia("(min-width: 576px)"),
  sm: window.matchMedia("(min-width: 768px)"),
  md: window.matchMedia("(min-width: 992px)"),
  lg: window.matchMedia("(min-width: 1200px)"),
};

export const isMobile = {
  Android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: () => {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  },
};
