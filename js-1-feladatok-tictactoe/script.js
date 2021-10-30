const layout = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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
  for (let i = 0; i < layout.length; i++) {
    let cells = document.createElement(`div`);
    playArea.appendChild(cells);
  }
  const genGrid = document.querySelectorAll(`.playArea div`);
  genGrid.forEach((cell) => cell.classList.add(`cell`));
}

createBoard();
let grid = document.querySelectorAll(`.cell`);
grid.forEach((cell) => cell.addEventListener(`click`, addMark, { once: true }));

function winCondition() {
  document.querySelector(`#body`).style.backgroundColor = `rgba(0, 0, 0, 0.7`;
  document.querySelector(`#endScreen`).style.display = `flex`;
  document.querySelector(`.restart__btn`).style.display = `block`;
  startingPlayer === 1
    ? (document.querySelector(`.winner`).innerHTML = "X")
    : (document.querySelector(`.winner`).innerHTML = "O");
}

function checkWin() {
  if (
    grid[0].textContent === `X` &&
    grid[1].textContent === `X` &&
    grid[2].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[3].textContent === `X` &&
    grid[4].textContent === `X` &&
    grid[5].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[6].textContent === `X` &&
    grid[7].textContent === `X` &&
    grid[8].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[0].textContent === `X` &&
    grid[4].textContent === `X` &&
    grid[8].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[2].textContent === `X` &&
    grid[4].textContent === `X` &&
    grid[6].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[0].textContent === `X` &&
    grid[3].textContent === `X` &&
    grid[6].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[1].textContent === `X` &&
    grid[4].textContent === `X` &&
    grid[7].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[2].textContent === `X` &&
    grid[5].textContent === `X` &&
    grid[8].textContent === `X`
  ) {
    winCondition();
  } else if (
    grid[0].textContent === `O` &&
    grid[1].textContent === `O` &&
    grid[2].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[3].textContent === `O` &&
    grid[4].textContent === `O` &&
    grid[5].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[6].textContent === `O` &&
    grid[7].textContent === `O` &&
    grid[8].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[0].textContent === `O` &&
    grid[4].textContent === `O` &&
    grid[8].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[2].textContent === `O` &&
    grid[4].textContent === `O` &&
    grid[6].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[0].textContent === `O` &&
    grid[3].textContent === `O` &&
    grid[6].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[1].textContent === `O` &&
    grid[4].textContent === `O` &&
    grid[7].textContent === `O`
  ) {
    winCondition();
  } else if (
    grid[2].textContent === `O` &&
    grid[5].textContent === `O` &&
    grid[8].textContent === `O`
  ) {
    winCondition();
  }
}
