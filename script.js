$(document).ready(function () {
  $(".heading-form").on("submit", function (e) {
    e.preventDefault();
    const newHeading = $(".heading-input").val().trim();
    if (newHeading) {
      $(".heading").modal("hide");
      $(".heading-select, .heading-form-select").append(
        `<option value="${newHeading}">${newHeading}</option>`
      );
      $(".main-content").append(
        `<div class="heading-container"><h1>${newHeading}</h1></div>`
      );
      $(".heading-input").val("");
      console.log(newHeading,"<<<<<<<<<<<")
    }
  });

  $(".subheading-form").on("submit", function (e) {
    e.preventDefault();
    const selectedHeading = $(".heading-select").val();
    const newSubheading = $(".subheading-input").val().trim();
    if (selectedHeading && newSubheading) {
      $(".subheading").modal("hide");
      $(`h1:contains('${selectedHeading}')`).after(
        `<div class="subheading-container"><h3  style="margin-left:30px;">${newSubheading}</h3></div>`
      );
      $(".subheading-input").val("");
      $(".heading-select").val("");
    }
  });

  $(".heading-form-select").on("change", function () {
    const selectedHeading = $(this).val();
    const subheadings = $(`h1:contains('${selectedHeading}')`)
      .nextAll(".subheading-container")
      .map(function () {
        return $(this).find("h3").text();
      })
      .get();
    const $subheadingSelect = $(".subheading-form-select")
      .empty()
      .append($(`h2:contains('${subheadings}')`));
    $.each(subheadings, function (index, subheading) {
      $subheadingSelect.append(
        `<option value="${subheading}">${subheading}</option>`
      );
    });
  });

  $(".form-inputs").on("submit", function (e) {
    e.preventDefault();
    const selectedHeading = $(".heading-form-select").val();
    const selectedSubheading = $(".subheading-form-select").val();
    const inputType = $(".choose-input-type").val();
    const attributes = {
      type: $(".input-type").val(),
      class: $(".input-class").val(),
      label: $(".input-label").val(),
      placeholder: $(".input-placeholder").val(),
      value: $(".input-value").val(),
      option: $(".input-option").val(),
      readonly: $(".input-readonly").prop("checked") ? "readonly" : "",
      disabled: $(".input-disabled").prop("checked") ? "disabled" : "",
    };
    if (selectedHeading && selectedSubheading && inputType) {
      $(".form").modal("hide");
      let inputHTML = "";
      switch (inputType) {
        case "input":
          inputHTML = `<input type="${attributes.type}" class="${attributes.class}" placeholder="${attributes.placeholder}" value="${attributes.value}" ${attributes.readonly} ${attributes.disabled}>`;
          break;
        case "textarea":
          inputHTML = `<textarea class="${attributes.class}" placeholder="${attributes.placeholder}" ${attributes.readonly}  ${attributes.disabled}>${attributes.value}</textarea>`;
          break;
        case "select":
          inputHTML = `<select class="${attributes.class}" ${
            attributes.readonly
          }  ${attributes.disabled}>${attributes.option
            .split(",")
            .map((opt) => `<option value="${opt}">${opt}</option>`)
            .join("")}</select>`;
          break;
        case "checkbox":
        case "radio_button":
          inputHTML = `<div class="form-check">${attributes.option
            .split(",")
            .map(
              (opt) => `
                        <input type="${
                          inputType === "checkbox" ? "checkbox" : "radio"
                        }" name="${
                inputType === "radio_button" ? "radio-group" : ""
              }" class="${attributes.class}" value="${opt}" ${
                attributes.readonly
              }  ${attributes.disabled}>
                        <label class="form-check-label">${opt}</label>`
            )
            .join("")}</div>`;
          break;
        case "button":
          inputHTML = `<button type="button" class="${attributes.class}" ${attributes.readonly} ${attributes.disabled}>${attributes.value}</button>`;
          break;
      }
      $(`h1:contains('${selectedHeading}')`)
        .nextAll(".subheading-container")
        .find(`h3:contains('${selectedSubheading}')`)
        .after(
          `<div class="input-container"><label>${$(
            ".input-label"
          ).val()}</label>${inputHTML}</div>`
        );
      $(
        ".heading-form-select, .subheading-form-select, .choose-input-type, .input-type, .input-class,.input-placeholder, .input-value, .input-option, .input-readonly, .input-disabled, .input-label"
      ).val("");
    }
  });
});
