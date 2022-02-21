const arabicPage = window.location.href.indexOf("/ar/") != -1;
const currentDate = new Date();

// function to return hours
function returnSeconds(fDate, cDate) {
  var diffMs = fDate - cDate;
  var diffDays = Math.floor(diffMs / 86400000); // days
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  var secondsToPass = parseInt(diffMins * 60);
  var hoursToPass = parseInt(diffHrs * 3600);
  var daystoPass = parseInt(diffDays * 24 * 3600);
  var hoursCount = secondsToPass + hoursToPass + daystoPass;
  return hoursCount;
}

$(document).ready(function () {
  $(document)
    .find(".greenfriday input.green-friday-hidden")
    .each(function (index) {
      let id = $(this).attr("id");
      let customInputDate = new Date($(this).val());
      let hoursToPass = currentDate > customInputDate ? 0 : returnSeconds(customInputDate, currentDate);

      if (arabicPage) {
        let clock = $("." + id).FlipClock(hoursToPass, {
          clockFace: "DailyCounter",
          countdown: true,
          language: "ar-ar",
        });
      } else {
        let clock = $("." + id).FlipClock(hoursToPass, {
          clockFace: "DailyCounter",
          countdown: true,
        });
      }
    });
});
