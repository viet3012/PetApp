"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const formEl = document.getElementById("container-form");

renderTableData(petArr);

// Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${new Date(petArr[i].date).toLocaleDateString()}
    </td>
    <td>
	<button style="background-color:#ffc107; color:#000" class="btn btn-danger" onclick="startEditPet('${
    petArr[i].id
  }')">Edit</button>
</td>`;
    tableBodyEl.appendChild(row);
  }
}

// Hàm edit thú cưng
function startEditPet(id) {
  formEl.classList.remove("hide");
  const pet = petArr.find((petItem) => petItem.id === id);
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  renderBreed();
  breedInput.value = `${pet.breed}`;
}

// Hàm hiển thị breed trong form
typeInput.addEventListener("click", renderBreed);
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    // Nếu type là Cat
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Thêm sự kiện vào nút submit
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  const isValidate = validateData(data);
  if (isValidate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

// Hàm validate dữ liệu hợp lệ
function validateData(data) {
  let isValidate = true;
  if (data.name.trim() === "") {
    alert("Please input for name!");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Please input for age!");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Please input for weight!");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Please input for length!");
    isValidate = false;
  }
  if (data.age > 15 || data.age < 1) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  if (data.weight > 15 || data.weight < 1) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  if (data.length > 100 || data.length < 1) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Please select type");
    isValidate = false;
  }
  if (data.type === "Select Breed") {
    alert("Please select breed");
    isValidate = false;
  }
  return isValidate;
}
