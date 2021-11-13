const arr =
  "cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV".split(
    " "
  );
let arrayCopy;
const playArea = document.querySelector("#playArea");
let flipCounter = 0;
const startingMinutes = 0;
let time = startingMinutes / 60;
let timeTrigger = true;
let timerInterval;

const seconds = () => {
  return time < 10 ? "0" + (time % 60) : time % 60;
};

const initTimer = () => {
  if (!timeTrigger === true) return;
  timeTrigger = false;
  startTimer();
  timerInterval = setInterval(startTimer, 1000);
};

const startTimer = () => {
  const minutes = Math.floor(time / 60);
  document.querySelector("#timer").textContent = `${minutes}:${seconds()}`;
  time++;
};

const generateArray = () => {
  arrayCopy = arr.map((card) => card);
  return arrayCopy;
};
generateArray();

const patternGen = () => {
  return arrayCopy.splice(Math.floor(Math.random() * arrayCopy.length), 1);
};

const generatePlayArea = () => {
  for (let i = 0; i < 10; i++) {
    playArea.innerHTML += `<div class="card"><div class="cardInner"><div class="cardFront"></div><div class="cardBack"><div class="${patternGen()}"></div></div></div></div>`;
  }
};
generatePlayArea();

const cards = document.querySelectorAll(".cardInner");
const cardsArr = Array.from(cards);
cardsArr.forEach((card) => card.addEventListener("click", flipOver));

const resetPattern = () => {
  document.querySelector("#timer").textContent = "0:00";
  const cards = document.querySelectorAll(".cardBack div");
  setTimeout(() => {
    cards.forEach((card) => (card.className = ""));
    generateArray();
    cards.forEach((card) => card.classList.add(patternGen()));
  }, 500);
};

const resetGame = () => {
  cardsArr.map((card) => {
    card.style.transform = "rotateY(0)";
    card.classList.remove("matched");
  });
  time = 0;
  timeTrigger = true;
  resetPattern();
};

const checkForWin = () => {
  if (cardsArr.every((card) => card.classList.contains("matched"))) {
    clearInterval(timerInterval);
    setTimeout(resetGame, 5000);
  }
};

const isFLipped = () => {
  return cardsArr.filter(
    (card) =>
      card.style.transform === "rotateY(180deg)" &&
      !card.classList.contains("matched")
  );
};

function flipOver(ev) {
  flipCounter++;
  ev.currentTarget.style.transform = "rotateY(180deg)";
  initTimer();
  if (flipCounter === 2) {
    checkForMatches(isFLipped());
    checkForWin();
  }
}

turnCardsBack = (flipped) => {
  setTimeout(() => {
    flipped.map((card) => {
      card.style.transform = "rotateY(0)";
      cardsArr.map((card) => (card.style.pointerEvents = "auto"));
    });
  }, 600);
};

const keepCardsFaceUp = (flipped) => {
  cardsArr.map((card) => (card.style.pointerEvents = "auto"));
  flipped.map((card) => card.classList.add("matched"));
};

const checkForMatches = (flipped) => {
  cardsArr.map((card) => (card.style.pointerEvents = "none"));
  flipCounter = 0;
  flipped[0].lastChild.firstChild.className ===
  flipped[1].lastChild.firstChild.className
    ? keepCardsFaceUp(flipped)
    : turnCardsBack(flipped);
};
