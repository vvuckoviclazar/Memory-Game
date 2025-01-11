"use strict";

const middle = document.querySelector(".middle");
const clickedNum = document.querySelector(".clickedNum");
const itemsNumber = document.querySelector(".itemsNumber");
const gridButtons = document.querySelectorAll(".gridButtons");

let gridItems;

function gameCreator() {
  let gridData = [];
  let number = 0;

  const setItemsNumber = () => {
    return gridData.length;
  };

  const getItemsNumber = () => {
    return gridData.length;
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
    gridData = [];
    for (let i = 0; i < size; i++) {
      addSquare(squareCreator());
    }
  };

  const getIsClicked = (id) => {
    const item = gridData.find((item) => item.getId() === id);
    return item ? item.getIsClicked() : false;
  };

  const addSquare = (square) => {
    gridData.push(square);
  };

  const getGridData = () => {
    return gridData;
  };

  function checkWinner() {
    const allClicked = gridData.every((item) => item.getIsClicked());
    if (allClicked) {
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
    getGridData,
    addSquare,
  };
}

function squareCreator() {
  let id = crypto.randomUUID();
  let color = generateRandomColor();
  let isClicked = false;

  const getId = () => {
    return id;
  };

  const getIsClicked = () => {
    return isClicked;
  };

  const setIsClicked = (value) => {
    isClicked = value;
  };

  const getColor = () => {
    return color;
  };

  return {
    getId,
    getIsClicked,
    setIsClicked,
    getColor,
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

  shuffle(game.getGridData());

  middle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  middle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  updateGrid();
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

  const currentSquare = game
    .getGridData()
    .find((square) => square.getId() === clickedId);
  currentSquare.setIsClicked(true);
  game.increaseScore();
  clickedNum.textContent = game.getScore();
  game.checkWinner();

  shuffle(game.getGridData());
  updateGrid();
}

function updateGrid() {
  middle.innerHTML = "";

  game.getGridData().forEach((square) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.style.backgroundColor = square.getColor();
    gridItem.dataset.id = square.getId();
    middle.appendChild(gridItem);
  });

  gridItems = middle.querySelectorAll(".grid-item");
}

middle.addEventListener("click", handleGridClick);

gridButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const size = parseInt(button.dataset.size);
    createGrid(size, size);
    itemsNumber.textContent = game.setItemsNumber();
    game.setScore();
    clickedNum.textContent = game.getScore();
  });
});

createGrid(3, 3);
