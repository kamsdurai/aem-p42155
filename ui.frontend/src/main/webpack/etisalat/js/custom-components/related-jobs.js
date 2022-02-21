$(document).ready(function () {
if ($(".related-jobs").length <= 0) {
  return false;
}
// execute this script only if the page contains "related job"
    var responseData;
    var apiSettings = {
      async: true,
      url: "https://hrconnect.etisalat.ae/etisalatcareerswebservices/job/getAllOpenJobs",
      method: "GET",
      navigationState: "",
      No: "0",
      Nrpp: "100",
    };

    $.ajax(apiSettings)
      .done(function (json, statusText, xhr) {
        responseData = json;
        if (typeof responseData === "string") {
          responseData = JSON.parse(responseData);
        }
        // render the slides into page
        var htmlCards = renderSlides(responseData.list);
        var htmlCardsPlaceholder = $(".dynamic-cards");

        htmlCardsPlaceholder.html(htmlCards);
      })
      .fail(function (jqXHR, textStatus, error) {
        console.log("fail");
      });

    // render html slides
    var renderSlides = function (data) {
      var jobCards = data;
      var html = "";
      for (var i = 0; i < 3 && i < jobCards.length; i++) {
        var jcard = jobCards[i];

        html +=
          '<div class="col-md-4">' +
          '<a href="https://hrconnect.etisalat.ae/career-portal/#/job-detail?id=' +
          jcard.vacancyId +
          '">' +
          '<div class="related-jobs-card">' +
          '<div class="related-jobs-card-detail">' +
          '<span class="bookmark"></span>' +
          "<h5>" +
          jcard.postedDaysAgo +
          " days ago</h5>" +
          "<h3>" +
          jcard.title +
          "</h3>" +
          "<p>" +
          jcard.department +
          "</p>" +
          "</div>" +
          '<div class="related-jobs-card-actions">' +
          "<span>" +
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
          '<g fill="none" fill-rule="evenodd">' +
          '<path d="M0 0H24V24H0z" transform="translate(-138.000000, -825.000000) translate(1.000000, 501.000000) translate(121.000000, 179.000000) translate(16.000000, 145.000000)"/>' +
          '<g stroke-linecap="round" stroke-linejoin="round">' +
          '<path stroke="#777E86" d="M11.75 14.04c1.675-1.78 3.237-4.046 3.237-6.296C14.987 3.742 11.745.5 7.744.5S.5 3.743.5 7.744c0 4.842 7.244 9.76 7.244 9.76" transform="translate(-138.000000, -825.000000) translate(1.000000, 501.000000) translate(121.000000, 179.000000) translate(16.000000, 145.000000) translate(5.000000, 3.000000)"/>' +
          '<path stroke="#8BBD29" d="M7.744 10.985c-1.657 0-3-1.344-3-3 0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.656-1.343 3-3 3z" transform="translate(-138.000000, -825.000000) translate(1.000000, 501.000000) translate(121.000000, 179.000000) translate(16.000000, 145.000000) translate(5.000000, 3.000000)"/>' +
          "</g>" +
          "</g>" +
          "</svg>" +
          "</span> <span> " +
          jcard.location +
          " </span>" +
          "</div>" +
          "</div>" +
          "</a>" +
          "</div>";
      }
      return html;
    };
  });
