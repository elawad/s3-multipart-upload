(function () {
  "use strict";

  document.getElementById("uploadFile").onchange = function () {
    // Clear table body rows
    var table = document.getElementById("fileTable");
    while(table.rows.length) { table.deleteRow(0); }

    var length = this.files.length;
    for (var i = 0; i < length; i++) {
      // Create table row
      var row   = table.insertRow();
      var tdData = createRowData(
        this.files[i].name, this.files[i].type,
        formatSize(this.files[i].size)
      );
      // Insert row data
      row.innerHTML = tdData;
    }

    // Toggle submit button if form has files
    var button = document.getElementById("submitButton");
    if (length > 0) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  };

  // Change form action on toggle; multi or regular upload
  document.getElementById("isMultiPart").onchange = function () {
    var label = document.getElementById("isMultiPart-label");
    var isChecked = !label.classList.contains("is-checked");
    var formAction = isChecked ? "/upload-multi" : "/upload-regular";

    document.getElementById("uploadForm").action = formAction;
  };

  function createRowData(name, type, size) {
    var strClass = "mdl-data-table__cell--non-numeric";
    var tdData = `
      <td class="mdl-data-table__cell--non-numeric">${name}</td>
      <td class=${strClass}>${type}</td>
      <td>${size}</td>
    `;
    return tdData;
  };

  function formatSize(size) {
    var fileSize = '';
    if (size > 1024 * 1024) {
      fileSize = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + ' Mb';
    } else {
      fileSize = (Math.round(size * 100 / 1024) / 100).toString() + ' Kb';
    }
    return fileSize;
  };

})();
