import validators from "./validators.js";
import toastHandler from "./toast.js";
import { activateListeners, warningHandler } from "./main.js";
import assets from "./assets.js";
import serialize from "./serialize.js";

const modal = document.querySelector(".modal-container");
const modalBg = document.querySelector(".modal-grey-background");

const closeModal = () => {
  let inputs = document.querySelectorAll(".modal-input-info-fields input");
  document
    .querySelector(".modal-cancel-btn")
    .removeEventListener("click", closeModal);
  document
    .querySelector(".modal-confirm-btn")
    .removeEventListener("click", validateNewUser);
  inputs.forEach((input) => (input.value = ""));
  inputs.forEach((input) =>
    input.removeEventListener("keypress", enterListener)
  );
  inputs.forEach((input) => input.classList.remove("valid", "invalid"));
  modal.style.display = "none";
  modalBg.style.display = "none";
};

const clearModalInputs = () => {
  document
    .querySelectorAll(".modal-input-info-fields input")
    .forEach((field) => (field.value = ""));
};

const addNewUserToServer = (serializedArr, arr) => {
  return axios
    .post(`${assets.usersURL}`, {
      [serializedArr[0][0]]: arr[0],
      [serializedArr[1][0]]: arr[1],
      [serializedArr[2][0]]: arr[2],
    })
    .then((response) => {
      let newID = response.data.id;
      addNewUserToDOM(serializedArr, newID, arr);
      handlePostAddUserStuff();
    })
    .catch((err) => {
      console.error(err.message);
      toastHandler("AddError");
    });
};

const addNewUserToDOM = (serializedArr, newID, arr) => {
  let newRow = document.createElement("tr");
  assets.tbody.insertBefore(newRow, assets.tbody.firstChild);
  newRow.innerHTML += `
  <td title="${newID}">${newID}</td>
  <td title="${serializedArr[0][0]}">${arr[0]}</td>
  <td title="${serializedArr[1][0]}">${arr[1]}</td>
  <td title="${serializedArr[2][0]}">${arr[2]}</td>
  <td class="btns">
    <button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
    <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>
  </td>
 `;
};

const validateNewUser = () => {
  let serializedArr = serialize();
  const arr = [serializedArr[0][1], serializedArr[1][1], serializedArr[2][1]];
  const [name, email, address] = arr;
  validators.nameTest.test(name) &&
  validators.emailTest.test(email) &&
  validators.addressTest.test(address)
    ? addNewUserToServer(serializedArr, arr)
    : warningHandler(arr);
};

const isClassHandlerValid = (bool, ev) => {
  if (bool) {
    ev.target.classList.add("valid");
    ev.target.classList.remove("invalid");
  } else {
    ev.target.classList.add("invalid");
    ev.target.classList.remove("valid");
  }
};

const realTimeValidation = (ev) => {
  const modalInputs = Array.from(
    document.querySelectorAll(".modal-input-info-fields input")
  );
  if (ev.target === modalInputs[0]) {
    isClassHandlerValid(validators.nameTest.test(ev.target.value), ev);
  } else if (ev.target === modalInputs[1]) {
    isClassHandlerValid(validators.emailTest.test(ev.target.value), ev);
  } else if (ev.target === modalInputs[2]) {
    isClassHandlerValid(validators.addressTest.test(ev.target.value), ev);
  }
};

const enterListener = (ev) => {
  if (ev.keyCode === 13) {
    validateNewUser();
  }
};

const addNewUserModal = () => {
  const modalInputs = document.querySelectorAll(
    ".modal-input-info-fields input"
  );
  modal.style.display = "flex";
  modalBg.style.display = "flex";
  document
    .querySelector(".modal-cancel-btn")
    .addEventListener("click", closeModal);
  document
    .querySelector(".modal-confirm-btn")
    .addEventListener("click", validateNewUser);

  modalInputs.forEach((input) =>
    input.addEventListener("keypress", enterListener)
  );
  modalInputs.forEach((input) =>
    input.addEventListener("keyup", (ev) => realTimeValidation(ev))
  );
};

const handlePostAddUserStuff = () => {
  clearModalInputs();
  closeModal();
  activateListeners();
  toastHandler("UserAdded");
};

export default addNewUserModal;
