const playArea = document.querySelector("#playArea");
let flipCounter = 0;
let startingMinutes = 0;
let time = startingMinutes / 60;
let timeTrigger = 1;
let timerInterval;

let arr =
  "cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV cardBackPatternI cardBackPatternII cardBackPatternIII cardBackPatternIV cardBackPatternV".split(
    " "
  );

const patternGen = () => {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

const generatePlayArea = () => {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    const cardInner = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    const cardBackPattern = document.createElement("div");
    playArea.appendChild(card);
    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardBack.appendChild(cardBackPattern);
    card.classList.add("card");
    cardInner.classList.add("cardInner");
    cardFront.classList.add("cardFront");
    cardBack.classList.add("cardBack");
    cardBackPattern.classList.add(patternGen());
  }
};
generatePlayArea();

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
  if (timeTrigger === 1) {
    timeTrigger = 0;
    timerInterval = setInterval(startTimer, 1000);
  }
};

const checkForWin = () => {
  if (cardsArr.every((card) => card.classList.contains("matched"))) {
    clearInterval(timerInterval);
    setTimeout(() => {
      document.querySelector("#timer").textContent = "00:00";
      cardsArr.map((card) => (card.style.transform = "rotateY(0)"));
    }, 5000);
  }
};

const cards = document.querySelectorAll(".cardInner");
const cardsArr = Array.from(cards);
cardsArr.forEach((card) => card.addEventListener("click", flipOver));

function flipOver(ev) {
  flipCounter++;
  ev.currentTarget.style.transform = "rotateY(180deg)";
  initTimer();

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
