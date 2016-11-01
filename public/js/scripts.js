// List file info on table
document.getElementById("uploadFile").onchange = function () {
  clearTable();
  var files = this.files;

  // Generate row for each file
  addFilesToTable(this.files);

  // Toggle submit button if form has files
  if (files.length > 0) enableSubmit();
  else enableSubmit(false);
};

// Change form action on toggle; multi or regular upload
document.getElementById("isMultiPart").onchange = function () {
  var label = document.getElementById("isMultiPart-label");
  var isChecked = !label.classList.contains("is-checked");
  var formAction = isChecked ? "/upload-multi" : "/upload-regular";

  document.getElementById("uploadForm").action = formAction;
};

// Submit form with progress
document.getElementById("uploadForm").onsubmit = function(e) {
  e.preventDefault();

  var fileCount = document.getElementById("uploadFile").files.length;

  if (fileCount < 1) return false;

  enableSubmit(false);

  xhrUpload(function(error) {
    resetForm();
    showToast(error, fileCount);
  });
};

function resetForm() {
  clearTable();
  enableSubmit(false);

  document.getElementById("uploadForm").reset();
};

function enableSubmit(enabled = true) {
  var button = document.getElementById("submitButton");
  if (enabled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "disabled");
  }
};

function showToast(error, fileCount) {
  var notification = document.getElementById("toastMessage");
  var s = (fileCount > 1) ? 's' : '';
  var msg = error ? error : `${fileCount} file${s} uploaded.`;
  var data = { message: msg };

  notification.MaterialSnackbar.showSnackbar(data);
}

function clearTable() {
  var table = document.getElementById("fileTable");
  while(table.rows.length) {
    table.deleteRow(0);
  }
};

function addFilesToTable(files) {
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
