(function () {
  "use strict";

  // Submit form with progress
  document.getElementById("uploadForm").onsubmit = function(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var form = document.getElementById("uploadForm");
    var formAction = form.action;
    var formData = new FormData(form);

    // Move files to end of form
    var files = formData.getAll("uploadFile");
    formData.delete("uploadFile");
    for (var file of files) {
      formData.append("uploadFile[]", file);
    };

    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    // xhr.addEventListener("error", uploadFailed, false);
    // xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", formAction, true);
    xhr.send(formData);
  };

  function uploadProgress(evt) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    console.log(percentComplete.toString() + '%');
  };
  function uploadComplete() {
    console.log('Finished!');
  };

})();
