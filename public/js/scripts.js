(function () {
  'use strict';

  document.getElementById("uploadFile").onchange = function () {
    // Show file names
    var names = '';
    for (let i = 0; i < this.files.length; i++) {
      names += this.files[i].name + '\n';
    }
    document.getElementById("fileList").value = names;

    // Toggle button if form has files
    var button = document.getElementById("submitButton");
    if (this.files.length > 0) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "disabled");
    }
  };

  // Toggle form submit; multi or regular upload
  document.getElementById("isMultiPart").onchange = function () {
    var label = document.getElementById("isMultiPart-label");
    var isChecked = !label.classList.contains("is-checked");
    var formAction = isChecked ? "/upload-multi" : "/upload-regular"
    document.getElementById("uploadForm").action = formAction;
  };

})();
