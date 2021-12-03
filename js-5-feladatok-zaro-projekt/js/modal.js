import validators from "./validators.js";
import toastHandler from "./toast.js";
import { activateListeners, warningHandler } from "./main.js";
import assets from "./assets.js";
import serialize from "./serialize.js";

const closeModalRemoveListeners = () => {
  assets.modalCancel.removeEventListener("click", closeModal);
  assets.modalConfirm.removeEventListener("click", validateNewUser);
  assets.modalInputs.forEach((input) =>
    input.removeEventListener("keypress", enterListener)
  );
  assets.modalInputs.forEach((input) =>
    input.removeEventListener("keyup", (ev) => realTimeValidation(ev))
  );
};

const closeModal = () => {
  closeModalRemoveListeners();
  clearModalInputs();
  assets.modalInputs.forEach((input) =>
    input.classList.remove("valid", "invalid")
  );
  assets.modal.style.display = "none";
  assets.modalBg.style.display = "none";
};

const clearModalInputs = () => {
  assets.modalInputs.forEach((field) => (field.value = ""));
};

const addNewUserToServer = (serializedArr, arr) => {
  return axios
    .post(`${assets.usersURL}`, {
      [serializedArr[0][0]]: arr[0],
      [serializedArr[1][0]]: arr[1],
      [serializedArr[2][0]]: arr[2],
    })
    .then((response) => {
      let newID = [serializedArr, response.data.id, arr];
      addNewUserToDOM(...newID);
      handlePostAddUserStuff();
    })
    .catch((err) => {
      console.error(err.message);
      toastHandler("AddError");
    });
};

const addNewUserToDOM = (serializedArr, ID, arr) => {
  let newRow = document.createElement("tr");
  assets.tbody.insertBefore(newRow, assets.tbody.firstChild);
  newRow.innerHTML += `
  <td title="${ID}">${ID}</td>
  <td  title="${serializedArr[0][0]}">${arr[0]}</td>
  <td  title="${serializedArr[1][0]}">${arr[1]}</td>
  <td  title="${serializedArr[2][0]}">${arr[2]}</td>
  <td class="btns">
    <button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
    <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>
  </td>
 `;
};

const validateNewUser = () => {
  let serializedArr = serialize(assets.modalInputs);
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
  if (ev.target === assets.modalInputs[0]) {
    isClassHandlerValid(validators.nameTest.test(ev.target.value), ev);
  } else if (ev.target === assets.modalInputs[1]) {
    isClassHandlerValid(validators.emailTest.test(ev.target.value), ev);
  } else if (ev.target === assets.modalInputs[2]) {
    isClassHandlerValid(validators.addressTest.test(ev.target.value), ev);
  }
};

const enterListener = (ev) => {
  if (ev.keyCode === 13) {
    validateNewUser();
  }
};

const addNewUserModal = () => {
  assets.modal.style.display = "flex";
  assets.modalBg.style.display = "flex";
  assets.modalCancel.addEventListener("click", closeModal);
  assets.modalConfirm.addEventListener("click", validateNewUser);

  assets.modalInputs.forEach((input) =>
    input.addEventListener("keypress", enterListener)
  );
  assets.modalInputs.forEach((input) =>
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
