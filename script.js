"use strict";

const easyBtn = document.querySelector(".easyBtn");
const mediumBtn = document.querySelector(".mediumBtn");
const hardBtn = document.querySelector(".hardBtn");
const middle = document.querySelector(".middle");
const clickedNum = document.querySelector(".clickedNum");
const itemsNumber = document.querySelector(".itemsNumber");

let gridItems;

//napraviti posebnu funkciju squareCreator
//unutar nje sledece metode: getId, getIsclickec, setIsClicked...
//unutar funkcije gameCreator dodati metodu addSquare
//ova metoda addSquare se treba pozivati na sledeci nacin:
//game.addSquare(squareCreator())

function gameCreator() {
  let gridData = [];
  let number = 0;
  let itemsNumber;

  const setItemsNumber = () => {
    return gridData.length;
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
      id: crypto.randomUUID(),
      color: generateRandomColor(),
      isClicked: false,
    }));
  };

  const getIsClicked = (id) => {
    const item = gridData.find((item) => item.id === id);
    console.log(item);
    return item.isClicked;
  };

  function checkWinner() {
    const allClicked = game.getGridData().every((item) => item.isClicked);

    if (allClicked) {
      setTimeout(() => {
        alert("You Won! All grid items clicked correctly.");
      }, 200);
    }
  }

  const getGridData = () => {
    return gridData;
  };

  return {
    initializeGridData,
    getIsClicked,
    setScore,
    increaseScore,
    getScore,
    setItemsNumber,
    getItemsNumber,
    checkWinner,
    getGridData,
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
  console.log(game.getGridData());
  shuffle(game.getGridData());

  middle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  middle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  updateGrid();
}

function handleGridClick(event) {
  const clickedId = event.target.dataset.id;
  if (!clickedId) return;

  const isClicked = game.getIsClicked(clickedId);
  console.log(isClicked);
  if (isClicked) {
    alert("Game Over! You've clicked this square before.");
    createGrid(3, 3);
    return;
  }
  const currentSquare = game
    .getGridData()
    .find((square) => square.id === clickedId);
  currentSquare.isClicked = true;
  game.increaseScore();
  clickedNum.textContent = game.getScore();
  game.checkWinner();

  shuffle(game.getGridData());
  updateGrid();
}

function updateGrid() {
  // gridItems.forEach((item, index) => {
  //   item.style.backgroundColor = game.getGridData()[index].color;
  // });
  middle.innerHTML = "";

  game.getGridData().forEach((square) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = square.color;
    gridItem.dataset.id = square.id;
    middle.appendChild(gridItem);
  });
  gridItems = middle.querySelectorAll(".grid-item");
}

middle.addEventListener("click", handleGridClick);

easyBtn.addEventListener("click", (e) => {
  createGrid(3, 3);
  itemsNumber.textContent = game.setItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});
mediumBtn.addEventListener("click", (e) => {
  createGrid(4, 4);
  itemsNumber.textContent = game.setItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});
hardBtn.addEventListener("click", (e) => {
  createGrid(5, 5);
  itemsNumber.textContent = game.setItemsNumber();
  game.setScore();
  clickedNum.textContent = game.getScore();
});

createGrid(3, 3);
const nekiArray = [1, 2, 3, 4, 5];
console.log(nekiArray);
console.log(nekiArray.length);
