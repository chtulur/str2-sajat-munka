///////////////////////////////////////////////////////////////////////
//HANDLING TIME//
const timeDiv = document.querySelector(".time");
const localTime = new Intl.DateTimeFormat().resolvedOptions();
const now = new Date();
let nowArr;

const time = (date) => {
  nowArr = new Intl.DateTimeFormat(localTime["locale"], {
    localeMatcher: "best fit",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(date)
    .split(",");
};
time(now);
timeDiv.innerHTML = `${nowArr[0]}<br>${nowArr[1]} `;
//HANDLING TIME DONE//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//ITEMS//
const noEmptyInput = new RegExp(/^(?!\s*$).+/);
//buttons
const trash = document.querySelector(".fa-trash");
const addBtn = document.querySelector(".add-btn");
const clearAllBtn = document.querySelector(".clear-all");
const showCompletedBtn = document.querySelector(".show-complete");

//Input
const userInput = document.querySelector(".user-input");

//Entry fields
const toDoEntries = document.querySelector(".to-do-field");
const completedEntries = document.querySelector(".completed-task-field");

//Numbers in headers
const pendingItemsCount = document.querySelector(".pending-items");
const completedItems = document.querySelector(".completion-percentage");

//tasnkhandler
const taskhandler = document.querySelector(".taskhandler");

//Both fields
const toDoChildren = Array.from(
  document.querySelectorAll(
    ".taskhandler .to-do-display, .taskhandler .number-of-completed "
  )
);

//Pending Header and Field || Completed Header and Field
const pendingOnly = Array.from(
  document.querySelectorAll(
    ".taskhandler .to-do-display, .taskhandler .to-do-field"
  )
);
const completedOnly = Array.from(
  document.querySelectorAll(
    ".taskhandler .number-of-completed, .taskhandler .completed-task-field"
  )
);

let showCompletedSwitch = false;
let pendingStorageArray = [];
let completedStorageArray = [];
//ITEMS OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//UTILITIES//
const countItems = () => {
  let max = toDoEntries.childElementCount + completedEntries.childElementCount;
  let result = (completedEntries.childElementCount * 100) / max;
  if (Number.isNaN(result)) {
    result = 0;
  }
  completedItems.textContent = `${Math.round(result)}%`;
  pendingItemsCount.textContent = toDoEntries.childElementCount;
};

const animate = () => {
  document
    .querySelector(".entry")
    .animate(
      [
        { transform: "translateX(300px)" },
        { transform: "translateX(100px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 100 }
    );
};

const trashListener = () => {
  Array.from(document.querySelectorAll(".taskhandler .fa-trash")).forEach(
    (trash) => trash.addEventListener("click", deleteItem)
  );
};

generateNewEntryEvents = () => {
  let currentCheckbox = document.querySelectorAll(".entry-pending .checkbox");
  currentCheckbox = Array.from(currentCheckbox);
  currentCheckbox.forEach((item) =>
    item.addEventListener("click", marquesDoneNewEntry)
  );
};

const marquesDoneEvents = () => {
  let currentCheckboxes = document.querySelectorAll(
    ".entry-completed .checkbox"
  );
  currentCheckboxes = Array.from(currentCheckboxes);
  currentCheckboxes.forEach((item) =>
    item.addEventListener("click", addBackToPending)
  );
};

const createChild = (entry) => {
  let div = document.createElement("div");
  div.classList.add("entry-pending", "entry");
  toDoEntries.insertBefore(div, toDoEntries.firstChild);
  document.querySelector(
    ".to-do-field .entry-pending"
  ).innerHTML = `<input type="checkbox" class="checkbox" /><label class="entry-labels label">${entry}</label><i class="fas fa-trash"></i>`;
  document.querySelector(".to-do-field .entry-pending");
};
//UTILITIES OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//MOVE TODOS//
const addBackToPending = (ev) => {
  const entry = ev.target.parentElement.textContent;
  ev.target.parentElement.remove();
  createChild(entry);
  generateNewEntryEvents();
  countItems();
  trashListener();
  isPendingEmpty();
  toLoacalStoragePendingBack(entry);
};

const marquesDoneNewEntry = (ev) => {
  const entry = ev.target.parentElement.textContent;
  ev.target.parentElement.remove();
  completedEntries.innerHTML += `<div class="entry-completed entry"><input type="checkbox" class="checkbox" checked /><label class="completed-labels label">${entry}</label><i class="fas fa-trash"></i></div>`;
  marquesDoneEvents();
  countItems();
  trashListener();
  isPendingEmpty();
  toLocalStorageCompleted(entry);
};

const generateNewEntry = (input) => {
  userInput.value = "";
  createChild(input);
  generateNewEntryEvents();
  countItems();
  isPendingEmpty();
  trashListener();
  animate();
  toLocalStoragePending(input);
};
//MOVE TODOS OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//UTILITIES//
const checkInput = () => {
  if (noEmptyInput.test(userInput.value)) {
    generateNewEntry(userInput.value);
  }
};

const isPendingEmpty = () => {
  if (!toDoEntries.hasChildNodes()) {
    youCanRestNow();
    showCompletedSwitch = true;
    switchShowCompleted();
  } else {
    pendingOnly.forEach((item) => (item.style.visibility = "visible"));
    document.querySelector(".rest-now").style.visibility = "hidden";
  }
};
//UTILITIES OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//CLEAR ALL//
const clearLoop = () => {
  completedEntries;
  while (toDoEntries.firstChild) {
    toDoEntries.removeChild(toDoEntries.lastChild);
  }
};

const clearAll = () => {
  clearLoop();
  countItems();
  isPendingEmpty();
  removeFromPendingOnClearAll();
};
//CLEAR ALL OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//SHOW COMPLETED BUTTON//
const youCanRestNow = () => {
  document.querySelector(".rest-now").style.visibility = "visible";
  toDoChildren.forEach((item) => (item.style.visibility = "hidden"));
  showCompletedBtn.textContent = "Show Completed";
};

const showCompletedON = () => {
  document.querySelector(".rest-now").style.visibility = "hidden";
  completedOnly.forEach((item) => (item.style.visibility = "visible"));
  completedOnly.forEach((item) => taskhandler.appendChild(item));
  marquesDoneEvents();
  trashListener();
  showCompletedBtn.textContent = "Hide Completed";
};

const showCompletedOFF = () => {
  completedOnly.forEach((item) => (item.style.visibility = "hidden"));
  completedOnly.forEach((item) => item.remove());
  showCompletedBtn.textContent = "Show Completed";
  if (!toDoEntries.hasChildNodes()) {
    document.querySelector(".rest-now").style.visibility = "visible";
  }
};

const switchShowCompleted = () => {
  showCompletedSwitch = showCompletedSwitch ? false : true;
  if (showCompletedSwitch) {
    showCompletedON();
  } else {
    showCompletedOFF();
  }
};
//SHOW COMPLETED BUTTON OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//DELETE//
const deleteItem = (ev) => {
  ev.target.parentElement
    .animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(100px)" },
        { transform: "translateX(300px)" },
      ],
      { duration: 100 }
    )
    .finished.then(() => {
      ev.target.parentElement.remove();
      countItems();
      if (
        ev.target.parentElement.classList.contains("entry-completed") &&
        completedEntries.childElementCount >= 1
      ) {
      } else {
        isPendingEmpty();
      }
      removeFromLocalStorageOnDelete(ev.target.parentElement);
    });
};
//DELETE OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//LOCAL STORAGE STORAGE xD//
const toLocalStoragePending = (input) => {
  pendingStorageArray.push(input);
  localStorage.setItem("Pending", pendingStorageArray);
};
const toLocalStorageCompleted = (input) => {
  completedStorageArray.push(input);
  const positionOfInput = pendingStorageArray.indexOf(input);
  pendingStorageArray.splice(positionOfInput, 1);
  localStorage.setItem("Pending", pendingStorageArray);
  localStorage.setItem("Completed", completedStorageArray);
};

const toLoacalStoragePendingBack = (input) => {
  pendingStorageArray.push(input);
  const positionOfInput = completedStorageArray.indexOf(input);
  completedStorageArray.splice(positionOfInput, 1);
  localStorage.setItem("Completed", completedStorageArray);
  localStorage.setItem("Pending", pendingStorageArray);
};

const removeFromLocalStorageOnDelete = (input) => {
  if (input.classList.contains("entry-pending")) {
    const positionOfInput = pendingStorageArray.indexOf(input.textContent);
    pendingStorageArray.splice(positionOfInput, 1);
    localStorage.setItem("Pending", pendingStorageArray);
  } else if (input.classList.contains("entry-completed")) {
    const positionOfInput = completedStorageArray.indexOf(input.textContent);
    completedStorageArray.splice(positionOfInput, 1);
    localStorage.setItem("Completed", completedStorageArray);
  }
};

const removeFromPendingOnClearAll = () => {
  localStorage.setItem("Pending", "");
  pendingStorageArray = [];
};
//LOCAL STORAGE STORAGE OVER//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//LOCAL STORAGE LOAD//
const loadPendingArrayFromStorage = () => {
  if (localStorage.getItem("Pending")) {
    pendingStorageArray = [...localStorage.getItem("Pending").split(",")];
  }
  fillOutPendingToDo(pendingStorageArray);
};

const loadCompletedArrayFromStorage = () => {
  if (localStorage.getItem("Completed")) {
    completedStorageArray = [...localStorage.getItem("Completed").split(",")];
  }
  fillOutCompletedToDo(completedStorageArray);
};

const completedGenerateFromStorage = (entry) => {
  completedEntries.innerHTML += `<div class="entry-completed entry"><input type="checkbox" class="checkbox" checked /><label class="completed-labels label" >${entry}</label><i class="fas fa-trash"></i></div>`;
  marquesDoneEvents();
  countItems();
  trashListener();
  isPendingEmpty();
};

const generateNewEntryFromStorage = (input) => {
  userInput.value = "";
  createChild(input);
  generateNewEntryEvents();
  countItems();
  isPendingEmpty();
  trashListener();
  animate();
};

const fillOutPendingToDo = (arr) => {
  if (arr !== undefined) {
    arr.forEach((item) => generateNewEntryFromStorage(item));
  }
};

const fillOutCompletedToDo = (arr) => {
  if (arr !== undefined) {
    arr.forEach((item) => completedGenerateFromStorage(item));
  }
};

loadPendingArrayFromStorage();
loadCompletedArrayFromStorage();
//LOCAL STORAGE LOAD DONE//
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//JUST SOME EVENT LISTENERS//
addBtn.addEventListener("click", checkInput);
userInput.addEventListener("keypress", (ev) => {
  if (ev.keyCode === 13) {
    checkInput();
  }
});
clearAllBtn.addEventListener("click", clearAll);
showCompletedBtn.addEventListener("click", switchShowCompleted);
