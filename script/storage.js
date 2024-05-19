"use strict";

const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

const breedArr = getFromStorage("breedArr");
const petArr = getFromStorage("petArr");

// Dữ liệu mẫu thú cưng
const data1 = {
  id: "P001",
  name: "Dober Mix",
  age: 3,
  type: "Dog",
  weight: 12,
  length: 87,
  color: "black",
  breed: "Husky",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2023, 2, 1),
};
const data2 = {
  id: "P002",
  name: "Charlie Tux",
  age: 4,
  type: "Cat",
  weight: 4,
  length: 65,
  color: "black",
  breed: "Tabby",
  vaccinated: true,
  dewormed: false,
  sterilized: false,
  date: new Date(2023, 2, 1),
};

// Dữ liệu mẫu Breed
const breed1 = {
  breed: "Tabby",
  type: "Cat",
};
const breed2 = {
  breed: "Mixed Breed",
  type: "Cat",
};
const breed3 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed4 = {
  breed: "Husky",
  type: "Dog",
};
const breed5 = {
  breed: "Domestic Short Hair",
  type: "Cat",
};
const breed6 = {
  breed: "Doberman Pinscher",
  type: "Dog",
};

if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4, breed5, breed6]);
}

// Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
