import assets from "./assets.js";

const getTranslation = async () => {
  try {
    return await axios.get(assets.toastsURL).then((response) => response.data);
  } catch (err) {
    console.error(err);
  }
};
const translationObject = await getTranslation();

const translationLgDecider = () => {
  if (assets.html.getAttribute("lang") === "en") {
    return "messageEN";
  } else {
    return "messageHU";
  }
};

let pageElements = Array.from(
  document.querySelectorAll("[data-translation-key]")
);

const buttonTitleLgChanger = () => {
  Array.from(document.querySelectorAll(".edit-btn")).map((btn) =>
    btn.setAttribute(
      "title",
      `${translationObject["editUserBtn"][translationLgDecider()]}`
    )
  );

  Array.from(document.querySelectorAll(".delete-btn")).map((btn) =>
    btn.setAttribute(
      "title",
      `${translationObject["deleteUserBTN"][translationLgDecider()]}`
    )
  );
};

const confirmUndoBtnTitleLg = () => {
  document
    .querySelector(".confirm-btn")
    .setAttribute(
      "title",
      `${translationObject["confirmBTN"][translationLgDecider()]}`
    );

  document
    .querySelector(".undo-btn")
    .setAttribute(
      "title",
      `${translationObject["undoBTN"][translationLgDecider()]}`
    );
};

const printEng = () => {
  buttonTitleLgChanger();
  if (document.querySelector(".undo-btn")) {
    confirmUndoBtnTitleLg();
  }
  for (let translate of Object.keys(translationObject)) {
    let element = pageElements.filter(
      (el) => el.dataset.translationKey === translate
    );
    if (element.length !== 0) {
      element.pop().textContent =
        translationObject[translate][`${translationLgDecider()}`];
    }
  }
};

const printHu = () => {
  buttonTitleLgChanger();
  if (document.querySelector(".undo-btn")) {
    confirmUndoBtnTitleLg();
  }
  for (let translate of Object.keys(translationObject)) {
    let element = pageElements.filter(
      (el) => el.dataset.translationKey === translate
    );
    if (element.length !== 0) {
      element.pop().textContent =
        translationObject[translate][`${translationLgDecider()}`];
    }
  }
};

const switchAndPrint = () => {
  assets.html.getAttribute("lang") === "en"
    ? assets.html.setAttribute("lang", "hu")
    : assets.html.setAttribute("lang", "en");

  assets.html.getAttribute("lang") === "en" ? printEng() : printHu();
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

export {
  confirmUndoBtnTitleLg,
  switchToHun,
  switchToEng,
  buttonTitleLgChanger,
};
