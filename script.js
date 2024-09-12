$(document).ready(function () {
  var headings = [];
  var subHeadings = {};

  $("#save-button").on("click", function () {
    var heading = $("#message-text").val();
    var headingId = `heading-${headings.length}`;
    $("#display-heading").append(`<h1 id="${headingId}">${heading}</h1>`);
    $("#Heading").modal("hide");
    headings.push({ id: headingId, text: heading });
    console.log(heading, "####################3");
  });

  $("#Sub-Heading").on("show.bs.modal", function () {
    var selectHeading = $("#select-heading");
    selectHeading.empty();
    $.each(headings, function (index, heading) {
      selectHeading.append(
        `<option value="${heading.id}">${heading.text}</option>`
      );
    });
  });

  $("#save-sub-heading").on("click", function () {
    var selectedHeadingId = $("#select-heading").val();
    var subHeading = $("#sub-heading-text").val();
    $(`#${selectedHeadingId}`).append(`<h2>${subHeading}</h2>`);
    $("#Sub-Heading").modal("hide");

    if (!subHeadings[selectedHeadingId]) {
      subHeadings[selectedHeadingId] = [];
    }
    subHeadings[selectedHeadingId].push(subHeading);
  });

  $("#Form").on("show.bs.modal", function () {
    var selectHeading = $("#select-heading-3"); 
    selectHeading.empty();
    $.each(headings, function (index, heading) {
      selectHeading.append(
        `<option value="${heading.id}">${heading.text}</option>`
      );
    });

    $("#select-heading-3").trigger("change");
  });

  $("#select-heading-3").on("change", function () {
    var selectedHeadingId = $(this).val();
    var selectSubHeading = $("#select-sub-heading");
    selectSubHeading.empty();
    if (subHeadings[selectedHeadingId]) {
      $.each(subHeadings[selectedHeadingId], function (index, subHeading) {
        selectSubHeading.append(
          `<option value="${subHeading}">${subHeading}</option>`
        );
      });
    }
  });

  $("#save-sub-heading-details").on("click", function () {
    var selectedHeadingId = $("#select-heading").val();
    var selectedSubHeading = $("#select-sub-heading").val();
    console.log(
      `Selected Heading: ${selectedHeadingId}, Selected Sub-Heading: ${selectedSubHeading}`
    );
    $("#Form").modal("hide");
  });
});
