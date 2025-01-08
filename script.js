"use strict";

const easyBtn = document.querySelector(".easyBtn");
const mediumBtn = document.querySelector(".mediumBtn");
const hardBtn = document.querySelector(".hardBtn");
const middle = document.querySelector(".middle");
const clickedNum = document.querySelector(".clickedNum");
const itemsNumber = document.querySelector(".itemsNumber");

function gameCreator() {
  let gridData = [];
  let number = 0;
  let itemsNumber;

  const setItemsNumber = (number) => {
    itemsNumber = number;
  };

  const getItemsNumber = () => {
    return itemsNumber;
  };

  const setScore = () => {
    number = 0;
  };

  const increaseScore = () => {
    number += 1;
  };

  const getScore = () => {
    return number;
  };

  const initializeGridData = (size) => {
    gridData = Array.from({ length: size }, () => ({
      color: generateRandomColor(),
      isClicked: false,
    }));
  };

  const getIsClicked = (id) => {
    if (!gridData[id]) return false;
    if (gridData[id].isClicked) return true;
    gridData[id].isClicked = true;
    return false;
  };

  function checkWinner() {
    const totalItems = game.getItemsNumber();
    const clickedItems = game.getScore();

    if (clickedItems === totalItems) {
      setTimeout(() => {
        alert("You Won! All grid items clicked correctly.");
      }, 200);
    }
  }

  return {
    initializeGridData,
    getIsClicked,
    setScore,
    increaseScore,
    getScore,
    setItemsNumber,
    getItemsNumber,
    checkWinner,

    get gridData() {
      return gridData;
    },
  };
}

const game = gameCreator();

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGrid(rows, cols) {
  const size = rows * cols;
  game.initializeGridData(size);
  shuffle(game.gridData);

  middle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  middle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  middle.innerHTML = "";

  game.gridData.forEach((data, i) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = data.color;
    gridItem.dataset.id = i;
    middle.appendChild(gridItem);
  });
}

function handleGridClick(event) {
  const clickedId = event.target.dataset.id;
  if (!clickedId) return;

  const isClicked = game.getIsClicked(clickedId);

  if (isClicked) {
    alert("Game Over! You've clicked this square before.");
    createGrid(3, 3);
    return;
  }

  game.increaseScore();
  clickedNum.textContent = game.getScore();
  game.checkWinner();

  shuffle(game.gridData);
  updateGrid();
}

function updateGrid() {
  const gridItems = middle.querySelectorAll(".grid-item");
  gridItems.forEach((item, index) => {
    item.style.backgroundColor = game.gridData[index].color;
  });
}

middle.addEventListener("click", handleGridClick);

easyBtn.addEventListener("click", (e) => {
  createGrid(3, 3);

  game.setItemsNumber(9);
  itemsNumber.textContent = game.getItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});
mediumBtn.addEventListener("click", (e) => {
  createGrid(4, 4);

  game.setItemsNumber(16);
  itemsNumber.textContent = game.getItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});
hardBtn.addEventListener("click", (e) => {
  createGrid(5, 5);

  game.setItemsNumber(25);
  itemsNumber.textContent = game.getItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});

createGrid(3, 3);
