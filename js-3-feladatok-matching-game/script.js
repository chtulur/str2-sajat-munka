const playArea = document.querySelector("#playArea");
let flipCounter = 0;
const startingMinutes = 0;
let time = startingMinutes / 60;
let timeTrigger = true;
let timerInterval;

const arr =
  "cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV".split(
    " "
  );
let arrayCopy;
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

const seconds = () => {
  if (time < 10) {
    return "0" + (time % 60);
  }
  {
    return time % 60;
  }
};

const startTimer = () => {
  const minutes = Math.floor(time / 60);
  document.querySelector("#timer").textContent = `${minutes}:${seconds()}`;
  time++;
};

const initTimer = () => {
  startTimer();
  timerInterval = setInterval(startTimer, 1000);
};

const resetPattern = () => {
  const cards = document.querySelectorAll(".cardBack div");
  setTimeout(() => {
    cards.forEach((card) => (card.className = ""));
    generateArray();
    cards.forEach((card) => card.classList.add(patternGen()));
  }, 500);
};

const resetGame = () => {
  document.querySelector("#timer").textContent = "0:00";
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

function flipOver(ev) {
  flipCounter++;
  ev.currentTarget.style.transform = "rotateY(180deg)";
  if (timeTrigger === true) {
    timeTrigger = false;
    initTimer();
  }
  const flipped = cardsArr.filter(
    (card) =>
      card.style.transform === "rotateY(180deg)" &&
      !card.classList.contains("matched")
  );
  if (flipCounter === 2) {
    checkForMatches(flipped);
    checkForWin();
  }
}

const checkForMatches = (flipped) => {
  cardsArr.map((card) => (card.style.pointerEvents = "none"));
  flipCounter = 0;
  if (
    flipped[0].lastChild.firstChild.className ===
    flipped[1].lastChild.firstChild.className
  ) {
    cardsArr.map((card) => (card.style.pointerEvents = "auto"));
    flipped.map((card) => card.classList.add("matched"));
  } else {
    setTimeout(() => {
      flipped.map((card) => {
        card.style.transform = "rotateY(0)";
        cardsArr.map((card) => (card.style.pointerEvents = "auto"));
      });
    }, 600);
  }
};
