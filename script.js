$(document).ready(function () {
  const data = JSON.parse(localStorage.getItem('data')) || [];

  if (data.length > 0) {
    data.forEach(heading => {
      $(".heading-select, .heading-form-select").append(
        `<option value="${heading.heading}">${heading.heading}</option>`
      );
      $(".main-content").append(`<div class="heading-container"><h1>${heading.heading}</h1></div>`);
      heading.subheadings.forEach(subheading => {
        $(`h1:contains('${heading.heading}')`).after(`<div class="subheading-container"><h3 style="margin-left:30px;">${subheading.subheading}</h3></div>`);
        subheading.inputs.forEach(input => {
          const inputHTML = getInputHTML(input.type, input.attributes);
          $(`h1:contains('${heading.heading}')`).nextAll(".subheading-container").find(`h3:contains('${subheading.subheading}')`).after(
            `<div style="margin-left:40px;" class="input-container"><label>${input.attributes.label}</label>${inputHTML}</div>`
          );
        });
      });
    });
  }

  $(".heading-form").on("submit", function (e) {
    e.preventDefault();
    const newHeading = $(".heading-input").val().trim();
    if (newHeading) {
      $(".heading").modal("hide");
      $(".heading-select, .heading-form-select").append(`<option value="${newHeading}">${newHeading}</option>`);
      $(".main-content").append(`<div class="heading-container"><h1>${newHeading}</h1></div>`);
      $(".heading-input").val("");
      data.push({ heading: newHeading, subheadings: [] });
      localStorage.setItem('data', JSON.stringify(data));
    }
  });

  $(".subheading-form").on("submit", function (e) {
    e.preventDefault();
    const selectedHeading = $(".heading-select").val();
    const newSubheading = $(".subheading-input").val().trim();
    if (selectedHeading && newSubheading) {
      $(".subheading").modal("hide");
      $(`h1:contains('${selectedHeading}')`).after(`<div style="margin-left:30px;" class="subheading-container"><h3>${newSubheading}</h3></div>`);
      $(".subheading-input").val("");
      $(".heading-select").val("");
      
      const headingIndex = data.findIndex(heading => heading.heading === selectedHeading);
      if (headingIndex !== -1) {
        data[headingIndex].subheadings.push({ subheading: newSubheading, inputs: [] });
      }
      localStorage.setItem('data', JSON.stringify(data));
    }
  });

  $(".heading-form-select").on("change", function () {
    const selectedHeading = $(this).val();
    const subheadings = $(`h1:contains('${selectedHeading}')`).nextAll(".subheading-container").map(function () {
      return $(this).find("h3").text();
    }).get();
    const $subheadingSelect = $(".subheading-form-select").empty();
    $.each(subheadings, function (index, subheading) {
      $subheadingSelect.append(`<option value="${subheading}">${subheading}</option>`);
    });
  });

  $(".form-inputs").on("submit", function (e) {
    e.preventDefault();
    const selectedHeading = $(".heading-form-select").val();
    const selectedSubheading = $(".subheading-form-select").val();
    const inputType = $(".choose-input-type").val();
    const attributes = {
      name: $(".input-name").val(),
      class: $(".input-class").val(),
      label: $(".input-label").val(),
      placeholder: $(".input-placeholder").val(),
      value: $(".input-value").val(),
      option: $(".input-option").val(),
      readonly: $(".input-readonly").prop("checked") ? "readonly" : "",
      disabled: $(".input-disabled").prop("checked") ? "disabled" : "",
      required: $(".input-required").prop("checked") ? "required" : "",
    };

    if (selectedHeading && selectedSubheading && inputType) {
      $(".form").modal("hide");
      const inputHTML = getInputHTML(inputType, attributes);
      $(`h1:contains('${selectedHeading}')`).nextAll(".subheading-container").find(`h3:contains('${selectedSubheading}')`).after(
        `<div style="margin-left:40px;" class="input-container"><label>${attributes.label}</label>${inputHTML}</div>`
      );

      const headingIndex = data.findIndex(heading => heading.heading === selectedHeading);
      const subheadingIndex = data[headingIndex].subheadings.findIndex(subheading => subheading.subheading === selectedSubheading);
      if (headingIndex !== -1 && subheadingIndex !== -1) {
        data[headingIndex].subheadings[subheadingIndex].inputs.push({ type: inputType, attributes });
      }
      localStorage.setItem('data', JSON.stringify(data));
      $(".heading-form-select, .subheading-form-select, .choose-input-type, .input-name, .input-class, .input-placeholder, .input-value, .input-option, .input-readonly, .input-disabled, .input-label, .input-required").val("");
    }
  });
});

function getInputHTML(inputType, attributes) {
  let inputHTML = "";
  switch (inputType) {
    case "text":
    case "password":
    case "url":
    case "email":
    case "search":
    case "number":
    case "tel":
    case "date":
    case "datetime-local":
    case "month":
    case "week":
    case "time":
      inputHTML = `<input type="${inputType}" name="${attributes.name}" class="${attributes.class}" placeholder="${attributes.placeholder}" value="${attributes.value}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>`;
      break;
    case "textarea":
      inputHTML = `<textarea name="${attributes.name}" class="${attributes.class}" placeholder="${attributes.placeholder}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>${attributes.value}</textarea>`;
      break;
    case "select":
      inputHTML = `<select name="${attributes.name}" class="${attributes.class}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>${attributes.option.split(",").map(opt => `<option value="${opt}">${opt}</option>`).join("")}</select>`;
      break;
    case "checkbox":
    case "radio":
      inputHTML = `<div class="form-check">${attributes.option.split(",").map(opt => `
        <input type="${inputType}" name="${inputType === 'radio' ? attributes.name : ''}" class="${attributes.class}" value="${opt}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>
        <label class="form-check-label">${opt}</label>`).join("")}</div>`;
      break;
    case "button":
    case "submit":
      inputHTML = `<button type="${inputType}" class="${attributes.class}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>${attributes.value}</button>`;
      break;
    case "color":
    case "file":
    case "image":
      inputHTML = `<input type="${inputType}" name="${attributes.name}" class="${attributes.class}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>`;
      break;
    case "range":
      inputHTML = `<input type="range" name="${attributes.name}" class="${attributes.class}" value="${attributes.value}" ${attributes.readonly} ${attributes.disabled} ${attributes.required}>`;
      break;
  }
  return inputHTML; 
}
