"use strict";

const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

renderTableBreed(breedArr);

// Thêm sự kiện vào nút submit
submitBtn.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  const validate = validateData(data);
  if (validate) {
    breedArr.push(data);
    clearInput();
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
  }
});

// Hàm validate
function validateData(data) {
  let isValidate = true;
  if (data.breed.trim() === "") {
    alert("Please input for breed!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }
  return isValidate;
}

// Hàm hiển thị bảng breed
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${i + 1}</th>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>   
    <td>
	<button class="btn btn-danger" onclick="deleteBreed('${
    breedArr[i].breed
  }')">Delete</button>
</td>`;
    tableBodyEl.appendChild(row);
  }
}

// Hàm xoá dữ liệu nhập trên form
function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

// Hàm xoá breed
function deleteBreed(breed) {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
