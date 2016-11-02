function xhrUpload(callback) {
  NProgress.configure({
    minimum: 0,
    trickle: false,
    parent: '#actionsContainer',
  });
  NProgress.start();

  var xhr = new XMLHttpRequest();
  var form = document.getElementById("uploadForm");
  var formAction = form.action;
  var formData = new FormData(form);

  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", function(evt) {
    uploadComplete(evt, callback);
  }, false);

  // xhr.addEventListener("error", uploadFailed, false);
  // xhr.addEventListener("abort", uploadCanceled, false);

  xhr.open("POST", formAction, true);
  xhr.send(formData);
};

function uploadProgress(evt) {
  var progress = Math.round(evt.loaded / evt.total * 100) / 100; // 0.57
  NProgress.set(progress);
  console.log(progress);
};

function uploadComplete(evt, callback) {
  var { status, response } = evt.target;
  var error = null;
  if (status !== 200) {
    var response = JSON.parse(response);
    error = 'Error: ' + (response.message || 'Unable to upload files.');
  }
  NProgress.done();
  callback(error);
};
