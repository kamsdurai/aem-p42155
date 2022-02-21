export const SCROLL_TO_URL = () => {
  if (window.location.hash) {
    let hash = window.location.hash;
    if (document.querySelector(hash).length) {
      document.querySelector(document.querySelector(hash)).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }
};

export const DEBOUNCE = (func, wait) => {
  let timeout;
  return  (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};
