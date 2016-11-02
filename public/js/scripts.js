// List file info on table
document.getElementById("uploadFile").onchange = function () {
  var files = this.files;
  addFilesToTable(files);

  var isDisabled = files.length < 1;
  disableSubmit(isDisabled);
};

// Change form action on toggle; multi or regular upload
document.getElementById("isMultiPart").onchange = function () {
  var label = document.getElementById("isMultiPart-label");
  var isChecked = !label.classList.contains("is-checked");
  var onOff = isChecked ? "On" : "Off";
  var formAction = isChecked ? "/upload-multi" : "/upload-regular";

  document.getElementById("isMultiPart-onOff").innerHTML = onOff;
  document.getElementById("uploadForm").action = formAction;
};

// Submit form with progress
document.getElementById("uploadForm").onsubmit = function(evt) {
  evt.preventDefault();

  var fileCount = document.getElementById("uploadFile").files.length;

  if (fileCount < 1) return false;

  disableSubmit();
  disableFileAdd();

  xhrUpload(function(error) {
    resetForm();
    showToast(error, fileCount);
  });
};

function resetForm() {
  clearTable();
  disableSubmit();
  disableFileAdd(false);
  document.getElementById("uploadForm").reset();
};

function disableSubmit(isDisabled) {
  var button = document.getElementById("submitButton");

  if (isDisabled === false) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
};

function disableFileAdd(isDisabled) {
  var addButton = document.getElementById("addButton");
  var uploadFile = document.getElementById("uploadFile");

  if (isDisabled === false) {
    addButton.removeAttribute("disabled");
    uploadFile.style.display = null;
  } else {
    addButton.setAttribute("disabled", "disabled");
    uploadFile.style.display = "none";
  }
};

function showToast(error, fileCount) {
  var notification = document.getElementById("toastMessage");
  var s = (fileCount > 1) ? 's' : '';
  var msg = error ? error : `${fileCount} file${s} uploaded`;
  var data = { message: msg };

  notification.MaterialSnackbar.showSnackbar(data);
};

function clearTable() {
  var table = document.getElementById("fileTable");

  while(table.rows.length) {
    table.deleteRow(0);
  }
};

function addFilesToTable(files) {
  clearTable();
  var table = document.getElementById("fileTable");

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var row = table.insertRow();
    row.innerHTML = createRowHtml(file);
  }
};

function createRowHtml(file) {
  var name = file.name;
  var type = file.type;
  var size = formatSize(file.size);
  var strClass = "mdl-data-table__cell--non-numeric ellipsis";
  var tdData = `
    <td class="${strClass}">${name}</td>
    <td class="${strClass}">${type}</td>
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
