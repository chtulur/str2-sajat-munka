import assets from "./assets.js";

const getToasts = async () => {
  try {
    return await axios.get(assets.toastsURL).then((response) => response.data);
  } catch (err) {
    console.error(err);
  }
};

const toastObject = await getToasts();

const toastLanguageDecider = () => {
  if (assets.html.getAttribute("lang") === "en") {
    return "messageEN";
  } else {
    return "messageHU";
  }
};

const toastHandler = (event) => {
  callToast(
    toastObject[event]["type"],
    toastObject[event][`${toastLanguageDecider()}`]
  );
};

const callToast = (type, message, timeout = 5000) => {
  let toastDiv = document.createElement("div");
  toastDiv.classList.add(`toast-${type}`, "toast");
  toastDiv.textContent = `${message}`;
  document.querySelector(".toast-container").appendChild(toastDiv);
  setTimeout(() => {
    toastDiv.remove();
  }, timeout);
  toastDiv.addEventListener("click", () => {
    toastDiv.remove();
  });
};

export default toastHandler;
