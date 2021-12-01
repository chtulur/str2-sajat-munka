import assets from "./assets.js";

const eng = {
  title: "Closing JS Project",
  modalHeader: "Add new user",
  name: "Name",
  email: "E-mail",
  address: "Address",
  modalConfirmBtn: "Confirm",
  modalCancelBtn: "Cancel",
  newUserSpan: "Add new user",
  chooseLanguageSpan: "Choose language",
  thID: "ID",
  thName: "Name",
  thEmail: "Email",
  thAddress: "Address",
};
const hu = {
  title: "Záró Projekt",
  modalHeader: "Új felhasználó",
  name: "Név",
  email: "E-mail",
  address: "Lakcím",
  modalConfirmBtn: "Elfogad",
  modalCancelBtn: "Mégsem",
  newUserSpan: "Új felhasználó hozzáadása",
  chooseLanguageSpan: "Nyelv",
  thID: "ID",
  thName: "Név",
  thEmail: "Email",
  thAddress: "Lakcím",
};

let pageElements = Array.from(
  document.querySelectorAll("[data-translation-key]")
);

const buttonTitleLgChanger = () => {
  let editTitles = Array.from(document.querySelectorAll(".edit-btn"));
  let deleteTitles = Array.from(document.querySelectorAll(".delete-btn"));
  if (assets.html.getAttribute("lang") === "en") {
    editTitles.map((btn) => btn.setAttribute("title", "Edit user"));
    deleteTitles.map((btn) => btn.setAttribute("title", "Delete user"));
  } else {
    editTitles.map((btn) =>
      btn.setAttribute("title", "Felhasználó szerkesztése")
    );
    deleteTitles.map((btn) => btn.setAttribute("title", "Felhasználó törlése"));
  }
};

const confirmUndoBtnTitleLg = () => {
  let confirmTitle = document.querySelector(".confirm-btn");
  let undoTitle = document.querySelector(".undo-btn");
  if (assets.html.getAttribute("lang") === "en") {
    confirmTitle.setAttribute("title", "Confirm");
    undoTitle.setAttribute("title", "Undo edit");
  } else {
    confirmTitle.setAttribute("title", "Elfogadás");
    undoTitle.setAttribute("title", "Mégsem");
  }
};

const printEng = (eng) => {
  buttonTitleLgChanger();
  if (document.querySelector(".undo-btn")) {
    confirmUndoBtnTitleLg();
  }
  for (let translate of Object.keys(eng)) {
    pageElements
      .filter((el) => el.dataset.translationKey === translate)
      .pop().textContent = eng[translate];
  }
};

const printHu = (hu) => {
  buttonTitleLgChanger();
  if (document.querySelector(".undo-btn")) {
    confirmUndoBtnTitleLg();
  }
  for (let translate of Object.keys(hu)) {
    pageElements
      .filter((el) => el.dataset.translationKey === translate)
      .pop().textContent = hu[translate];
  }
};

const switchAndPrint = () => {
  assets.html.getAttribute("lang") === "en"
    ? assets.html.setAttribute("lang", "hu")
    : assets.html.setAttribute("lang", "en");

  assets.html.getAttribute("lang") === "en" ? printEng(eng) : printHu(hu);
};

const storeToStorage = (lg) => {
  lg === "en"
    ? localStorage.setItem("Language", "en")
    : localStorage.setItem("Language", "hu");
};

const switchToHun = () => {
  storeToStorage("hu");
  if (assets.html.getAttribute("lang") === "hu") return;
  switchAndPrint();
};
const switchToEng = () => {
  storeToStorage("en");
  if (assets.html.getAttribute("lang") === "en") return;
  switchAndPrint();
};

document.querySelector(".hun").addEventListener("click", switchToHun);
document.querySelector(".eng").addEventListener("click", switchToEng);

export { confirmUndoBtnTitleLg, switchToHun, switchToEng };
