const playArea = document.querySelector(`.playArea`);
let startingPlayer = Math.round(Math.random());
let drawTrigger;

const addMark = (ev) => {
  startingPlayer === 1
    ? (ev.target.textContent = `X`)
    : (ev.target.textContent = `O`);
  checkWin();
  startingPlayer ^= 1;
  console.log(startingPlayer);
};

function createBoard() {
  for (let i = 0; i < 9; i++) {
    let cells = document.createElement(`div`);
    playArea.appendChild(cells);
    cells.classList.add(`cell`);
  }
}
createBoard();

const grid = document.querySelectorAll(`.cell`);
const gridArray = Array.from(grid);
gridArray.forEach((cell) =>
  cell.addEventListener(`click`, addMark, { once: true })
);

function endGame(drawTrigger) {
  document.querySelector(`#body`).style.backgroundColor = `rgba(0, 0, 0, 0.7`;
  document.querySelector(`#endScreen`).style.display = `flex`;
  document.querySelector(`.restart__btn`).style.display = `block`;
  startingPlayer === 1
    ? (document.querySelector(`.winner`).textContent = "X")
    : (document.querySelector(`.winner`).textContent = "O");
  if (drawTrigger === 1) {
    document.querySelector(`#endScreen h2`).textContent = "It's a Draw!";
  }
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

//Tóth Gábor's beauty of a solution
function checkWin() {
  if (
    winConditions.some(
      (cond) =>
        cond.every((e) => e.textContent === "X") ||
        cond.every((e) => e.textContent === "O")
    )
  ) {
    endGame(0);
  } else if (gridArray.every((cell) => cell.textContent !== "")) {
    endGame(1);
  }
}
