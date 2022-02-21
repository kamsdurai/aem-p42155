import { SCROLL_TO_URL, DEBOUNCE } from "./js/utils";
import { DYNAMIC_COPYRIGHT } from "./js/footer";
import { STICKY_HEADER } from "./js/header";
import { MAIN_NAVIGATION } from "./js/menu";

document.addEventListener("DOMContentLoaded", () => {
  SCROLL_TO_URL();
  DYNAMIC_COPYRIGHT();
  MAIN_NAVIGATION();
});

window.addEventListener("scroll", DEBOUNCE(STICKY_HEADER, 16));

// Stylesheets
import "./main.scss";
