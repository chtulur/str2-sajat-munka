const playArea = document.querySelector(`.playArea`);
let startingPlayer = Math.round(Math.random());

const addMark = (ev) => {
  startingPlayer === 1
    ? (ev.target.innerHTML = `X`)
    : (ev.target.innerHTML = `O`);
  checkWin();
  startingPlayer === 1 ? (startingPlayer = 0) : (startingPlayer = 1);
};

function createBoard() {
  for (let i = 0; i < 9; i++) {
    let cells = document.createElement(`div`);
    playArea.appendChild(cells);
    cells.classList.add(`cell`);
  }
}
createBoard();

let grid = document.querySelectorAll(`.cell`);
const gridArray = Array.from(grid);
grid.forEach((cell) => cell.addEventListener(`click`, addMark, { once: true }));

function winCondition() {
  document.querySelector(`#body`).style.backgroundColor = `rgba(0, 0, 0, 0.7`;
  document.querySelector(`#endScreen`).style.display = `flex`;
  document.querySelector(`.restart__btn`).style.display = `block`;
  startingPlayer === 1
    ? (document.querySelector(`.winner`).innerHTML = "X")
    : (document.querySelector(`.winner`).innerHTML = "O");
}

const winConditions = [
  gridArray.slice(0, 3),
  gridArray.slice(3, 6),
  gridArray.slice(6, 9),
  gridArray.filter((_, index) => index % 3 === 0),
  gridArray.filter((_, index) => index % 3 === 1),
  gridArray.filter((_, index) => index % 3 === 2),
  gridArray.filter((_, index) => index % 4 === 0),
  gridArray.filter((_, index) => index % 2 === 0 && index > 0 && index < 8),
];

function checkWin() {
  for (let i = 0; i < winConditions.length; i++) {
    let xCounter = 0;
    let oCounter = 0;
    for (let j = 0; j < winConditions[i].length; j++) {
      if (winConditions[i][j].textContent === `X`) {
        xCounter++;
      }
      if (winConditions[i][j].textContent === `O`) {
        oCounter++;
      }
    }
    if (xCounter === 3 || oCounter === 3) {
      winCondition();
    }
  }
}
