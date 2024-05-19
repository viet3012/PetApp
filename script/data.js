"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Thêm sự kiện vào nút export
btnExport.addEventListener("click", function () {
  const isExport = confirm("Are you sure ?");
  if (isExport) {
    saveStaticDataToFile();
  }
});
// Hàm export dữ liệu
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
}

// Hàm import dữ liệu
btnImport.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Please choose your file !");
  } else {
    const isImport = confirm("Are you sure ?");
    if (isImport) {
      let reader = new FileReader();
      reader.readAsText(fileInput.files[0]);
      reader.onload = function (e) {
        let contentJson = e.target.result;
        if (contentJson.trim().length === 0) return;
        let contentToObject = JSON.parse(contentJson);
        contentToObject.forEach((el, i) => {
          let index = petArr.findIndex((pet) => pet.id === el.id);
          if (index < 0) petArr.push(el);
          else petArr[index] = el;
        });
        saveToStorage("petArr", petArr);
      };
      alert("Import file thành công !");
      fileInput.value = "";
    }
  }
});
