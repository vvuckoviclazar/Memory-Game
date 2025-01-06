"use strict";

"use strict";

const easyBtn = document.querySelector(".easyBtn");
const mediumBtn = document.querySelector(".mediumBtn");
const hardBtn = document.querySelector(".hardBtn");
const middle = document.querySelector(".middle");

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateColorArray(size) {
  const colorArray = [];
  for (let i = 0; i < size; i++) {
    colorArray.push(generateRandomColor());
  }
  return colorArray;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGrid(rows, cols) {
  const size = rows * cols;
  const colors = generateColorArray(size);
  shuffle(colors);
  middle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  middle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  middle.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = colors[i];
    gridItem.dataset.index = i;
    middle.appendChild(gridItem);
  }
}

easyBtn.addEventListener("click", () => createGrid(3, 3));
mediumBtn.addEventListener("click", () => createGrid(4, 4));
hardBtn.addEventListener("click", () => createGrid(5, 5));

createGrid(3, 3);
