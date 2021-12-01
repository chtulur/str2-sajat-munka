import validators from "./validators.js";
import callToast from "./toast.js";
import { activateListeners, warningHandler } from "./main.js";
import assets from "./assets.js";

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

  modal.style.display = "none";
  modalBg.style.display = "none";
};

const clearModalInputs = () => {
  document
    .querySelectorAll(".modal-input-info-fields input")
    .forEach((field) => (field.value = ""));
};

const addNewUserToServer = (arr) => {
  return axios
    .post(`${assets.usersURL}`, {
      name: arr[0],
      emailAddress: arr[1],
      address: arr[2],
    })
    .then((response) => {
      if (response.status) {
        let newID = response.data.id;
        addNewUserToDOM(arr, newID);
      }
      handlePostAddUserStuff();
    })
    .catch((err) => {
      console.error(err.message);
      assets.html.getAttribute("lang") === "en"
        ? callToast(
            "error",
            "User was not added to list due to bad server stuff"
          )
        : callToast(
            "error",
            "Felhasználó nem lett a listához adva rendszerhiba miatt"
          );
    });
};

const addNewUserToDOM = (arr, newID) => {
  let newRow = document.createElement("tr");
  assets.tbody.insertBefore(newRow, assets.tbody.firstChild);
  newRow.innerHTML += `
  <td title="${newID}">${newID}</td>
  <td title="${arr[0]}">${arr[0]}</td>
  <td title="${arr[1]}">${arr[1]}</td>
  <td title="${arr[2]}">${arr[2]}</td>
  <td class="btns">
    <button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
    <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>
  </td>
 `;
};

const validateNewUser = () => {
  const modalInputs = Array.from(
    document.querySelectorAll(".modal-input-info-fields input")
  );
  const [name, email, address] = modalInputs.map((el) => el.value);
  const arr = [name, email, address];
  validators.nameTest.test(name) &&
  validators.emailTest.test(email) &&
  validators.addressTest.test(address)
    ? addNewUserToServer(arr)
    : warningHandler(arr);
};

const enterListener = (ev) => {
  if (ev.keyCode === 13) {
    validateNewUser();
  }
};

const addNewUserModal = () => {
  modal.style.display = "flex";
  modalBg.style.display = "flex";
  document
    .querySelector(".modal-cancel-btn")
    .addEventListener("click", closeModal);
  document
    .querySelector(".modal-confirm-btn")
    .addEventListener("click", validateNewUser);
  document
    .querySelectorAll(".modal-input-info-fields input")
    .forEach((input) => input.addEventListener("keypress", enterListener));
};

const handlePostAddUserStuff = () => {
  clearModalInputs();
  closeModal();
  activateListeners();
  assets.html.getAttribute("lang") === "en"
    ? callToast("success", "User has been added!")
    : callToast("success", "Felhasználó hozzáadása sikeres!");
};

export default addNewUserModal;
