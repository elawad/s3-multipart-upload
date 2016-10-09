(function () {
  'use strict';

  document.getElementById("uploadFile").onchange = function () {
    var length = this.files.length;
    // Show file names
    var names = '';
    for (var i = 0; i < length; i++) {
      names += this.files[i].name + '\n';
    }
    names = names.trim();
    document.getElementById("fileList").value = names;

    // Toggle button if form has files
    var button = document.getElementById("submitButton");
    if (length > 0) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  };

  // Toggle form submit; multi or regular upload
  document.getElementById("isMultiPart").onchange = function () {
    var label = document.getElementById("isMultiPart-label");
    var isChecked = !label.classList.contains("is-checked");
    var formAction = isChecked ? "/upload-multi" : "/upload-regular";

    document.getElementById("uploadForm").action = formAction;
  };

})();
