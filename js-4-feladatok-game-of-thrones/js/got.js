const characters = document.querySelector(".character-container");
const characterInfoPanel = document.querySelector(".char-info-panel");
const searchBar = document.querySelector(".serach-container input");
let characterArray;
let GoTCharacters;

const generateCharacterPortraits = async () => {
  generateGrid();
  characterArray = await getCharacters();
  GoTCharacters = characterArray.map((char) => char.name);
  appendCharacterImagesToGrid(characterArray);
  searchBarListener(GoTCharacters);
  searchBarButtonListener(GoTCharacters);
  addListeners();
};

const generateGrid = () => {
  for (let i = 0; i < 48; i++) {
    let newDiv = document.createElement(`div`);
    newDiv.classList.add(`div${i}`, "character");
    characters.appendChild(newDiv);
  }
};

const getCharacters = async () => {
  const result = await fetch("./json/got.json");
  return result
    .json()
    .then((data) =>
      data
        .filter((char) => char.dead !== true)
        .sort((a, b) => a.name.localeCompare(b.name))
    )
    .then();
};

const appendCharacterImagesToGrid = (char) => {
  for (let i = 0; i < 48; i++) {
    document.querySelector(
      `.div${i}`
    ).innerHTML = `<img src="./${char[i].portrait}" alt="${char[i].name}"onerror="this.src ='./assets/placeholder/Game_of_Thrones_title_card.jpg';" class="avatars">${char[i].name}</div>`;
  }
};

const addListeners = () => {
  document
    .querySelectorAll(".character")
    .forEach((char) => char.addEventListener("click", openInfoPanel));
};

const checkForCoatOfArms = (char) => {
  if ("house" in char) {
    return `<img class="house-coat-of-arms" src="./assets/houses/${char.house}.png" onerror="this.src ='./assets/placeholder/Game_of_Thrones_title_card.jpg';">`;
  } else if ("organization" in char === "nightwatch") {
    return `<img class="house-coat-of-arms" src="./assets/houses/${char.organization}.png" onerror="this.src ='./assets/placeholder/Game_of_Thrones_title_card.jpg';">`;
  } else {
    return "";
  }
};

const organizeList = (char) => {
  if ("organization" in char || "house" in char || "alias" in char) {
    return createFinalList(char);
  } else {
    return "";
  }
};

const createFinalList = (char) => {
  return `<ul>
  ${checkForOrg(char)}
  ${checkForHouse(char)}
  ${checkForAlilas(char)}
  </ul>`;
};

const checkForOrg = (char) => {
  if ("organization" in char) {
    return `<li class="org">Member of the <span>${char.organization}</span></li>`;
  } else {
    return "";
  }
};

const checkForHouse = (char) => {
  if ("house" in char) {
    return `<li class="house">House <span>${char.house}</span></li>`;
  } else {
    return "";
  }
};

const checkForAlilas = (char) => {
  if ("alias" in char) {
    return `<li class="alias">Alias: <span class="alias-name">${char.alias}</span></li>`;
  } else {
    return "";
  }
};

const generateInfoPanel = (char) => {
  try {
    characterInfoPanel.innerHTML = `<img src="./${char.picture}" alt="${
      char.name
    }" class="character-picture" onerror="this.src ='./assets/placeholder/Game_of_Thrones_title_card.jpg';"><div class="name-and-coat-of-arms">
    <h2 class="char-name">${char.name}</h2>${checkForCoatOfArms(
      char
    )}</div><br><p class="bio">${
      char.bio
    }<div class="sub-info"><br>${organizeList(char)}</div></p>`;
  } catch (err) {
    console.error(err);
  }
};

const highlightSelectedCharacter = (ev) => {
  const justSelectedChar = document.querySelector(".selected");
  if (justSelectedChar) {
    justSelectedChar.classList.remove("selected");
  }
  ev.target.classList.add("selected");
};

const addSelectedClass = (capitalizeInput) => {
  const searchedChar = Array.from(document.querySelectorAll(".character"))
    .filter((char) => char.textContent === capitalizeInput)
    .pop();
  const prevSelected = document.querySelector(".selected");
  if (prevSelected) {
    prevSelected.classList.remove("selected");
  }
  searchedChar.classList.add("selected");
};

const openInfoPanel = (ev) => {
  highlightSelectedCharacter(ev);
  const clickedChar = characterArray
    .filter((char) => ev.target.textContent === char.name)
    .pop();
  generateInfoPanel(clickedChar);
};

const filterChar = (capitalizeInput) => {
  addSelectedClass(capitalizeInput);
  const searchedChar = characterArray
    .filter((char) => char.name === capitalizeInput)
    .pop();
  generateInfoPanel(searchedChar);
};

const charNotFound = () => {
  alert("Character not found");
};

const checkInput = (chars, capitalizeInput) => {
  chars.some((char) => capitalizeInput === char)
    ? filterChar(capitalizeInput)
    : charNotFound();
};

const convertInput = (ev, chars) => {
  const capitalizeInput = ev
    .split(" ")
    .map((char) => char.toLowerCase())
    .map((char) => char.charAt(0).toUpperCase() + char.slice(1))
    .join(" ");
  checkInput(chars, capitalizeInput);
};

const searchBarListener = (chars) => {
  searchBar.addEventListener("keypress", (ev) => {
    if (ev.keyCode === 13) {
      convertInput(ev.target.value, chars);
    }
  });
};

const searchBarButtonListener = (chars) => {
  document
    .querySelector(".search-field-btn")
    .addEventListener("click", (ev) => {
      convertInput(searchBar.value, chars);
    });
};

generateCharacterPortraits();
