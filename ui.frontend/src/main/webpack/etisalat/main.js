import "./js/forms";
import "./js/custom-components/*.js";
import "../global/js/components/**/*.js";

import { VIEW_MORE_TOGGLE } from "./js/overview-section";
import { GUIDE_TOUR_POPUP } from "./js/guide-tour";

document.addEventListener("DOMContentLoaded", () => {
  VIEW_MORE_TOGGLE();
  GUIDE_TOUR_POPUP();
});

// Stylesheets
import "./main.scss";
