import toastHandler from "./toast.js";
import addNewUserModal from "./modal.js";
import validators from "./validators.js";
import assets from "./assets.js";
import { confirmUndoBtnTitleLg, switchToHun, switchToEng } from "./language.js";

let savedData = [];

//GET AND PRINT

const appendRow = ({ id, name, emailAddress, address }) => {
  assets.tbody.innerHTML += `<tr>
    <td title="${id}">${id}</td>
    <td title="${name}">${name}</td>
    <td title="${emailAddress}">${emailAddress}</td>
    <td title="${address}">${address}</td>
    <td class="btns">
      <button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
      <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>
    </td>
   </tr>`;
};

const checkLanguage = () => {
  localStorage.getItem("Language") === "en" ? switchToEng() : switchToHun();
};

const getList = async () => {
  try {
    return await axios
      .get(assets.usersURL + "?_sort=id&_order=desc")
      .then((response) => response.data);
  } catch (err) {
    console.error(err);
  }
};

const getUsers = () => {
  getList().then((response) => {
    for (let user of response) {
      appendRow(user);
    }
    activateListeners();
    checkLanguage();
  });
};
getUsers();

//EDIT MODE

const openEditMode = (ev) => {
  let currentElement = ev.target.parentNode;
  let currentRow = ev.target.parentNode.parentNode;
  addEditClassToRow(currentRow);
  addEditBtns(ev);
  addInputFields(currentRow);
  editListenerHandlers(currentElement);
  confirmUndoBtnTitleLg();
};

const editListenerHandlers = (currentElement) => {
  deactivateListeners();
  activateEditListeners(currentElement);
  activateIllegalListeners();
};

const addEditClassToRow = (currentRow) => {
  currentRow.classList.add("being-edited");
};

const removeEditClassFromRow = (currentRow) => {
  currentRow.classList.remove("being-edited");
};

const deactivateIllegalListeners = () => {
  document
    .querySelectorAll(".edit-btn, .delete-btn")
    .forEach((btn) => btn.removeEventListener("click", displayWarning));
};

const activateIllegalListeners = () => {
  document
    .querySelectorAll(".edit-btn, .delete-btn")
    .forEach((btn) => btn.addEventListener("click", displayWarning));
};

const displayWarning = (ev) => {
  if (ev.target) {
    toastHandler("StopEditing");
  }
};

const addEditBtns = (ev) => {
  ev.target.parentNode.innerHTML = `<button title="Confirm" class="confirm-btn btn"><i class="fa fa-check"></i></button>
  <button title="Undo edit" class="undo-btn btn"><i class="fa fa-rotate-left"></i></button>`;
};

const addInputFields = (currentRow) => {
  const inputFields = currentRow.children;
  for (let i = 1; i < inputFields.length - 1; i++) {
    savedData.push(inputFields[i].textContent);
    inputFields[i].innerHTML = `<input class="edit-input" type="text"></input>`;
  }
  showEditableDataInInputs();
};

const showEditableDataInInputs = () => {
  const inputs = document.querySelectorAll(".edit-input");
  for (let i = 0; i < savedData.length; i++) {
    inputs[i].value = `${savedData[i]}`;
  }
};

const resetEdit = (currentRow) => {
  let inputFields = currentRow.children;
  for (let i = 1; i < inputFields.length - 1; i++) {
    inputFields[i].innerHTML = `${savedData[i - 1]}`;
  }
  savedData = [];
};

const resetBtns = (currentRow) => {
  currentRow.children[4].innerHTML = `<button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
   <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>`;
};

const editListenerHandlersOff = (currentRow) => {
  deactivateIllegalListeners();
  activateListeners();
  removeEditClassFromRow(currentRow);
};

const undoEdit = (currentRow) => {
  resetBtns(currentRow);
  resetEdit(currentRow, savedData);
  editListenerHandlersOff(currentRow);
};

const isItTheSame = (currentRow) => {
  let currentFieldArray = [];
  let input = Array.from(currentRow.querySelectorAll(".edit-input"));
  input.forEach((input) => currentFieldArray.push(input.value));
  return currentFieldArray.join(",") === savedData.join(",") ? true : false;
};

const warningHandler = (arr) => {
  if (!validators.nameTest.test(arr[0])) {
    toastHandler("InvalidName");
  }
  if (!validators.emailTest.test(arr[1])) {
    toastHandler("InvalidEmail");
  }
  if (!validators.addressTest.test(arr[2])) {
    toastHandler("InvalidAddress");
  }
};

const editDataOnServer = (id, arr, currentRow) => {
  return axios
    .patch(`${assets.usersURL}/${id}`, {
      name: arr[0],
      emailAddress: arr[1],
      address: arr[2],
    })
    .then(() => {
      updateDOMafterEdit(currentRow, arr);
      toastHandler("UpdateUser");
    })
    .catch((err) => {
      console.error(err.message);
      toastHandler("UpdateError");
    });
};

const updateDOMafterEdit = (currentRow, arr) => {
  let inputFields = currentRow.children;
  for (let i = 1; i < inputFields.length - 1; i++) {
    inputFields[i].innerHTML = arr[i - 1];
  }
  savedData = [];
};

const changeDOMandServer = (currentRow, arr) => {
  editDataOnServer(currentRow.children[0].textContent, arr, currentRow);
  resetBtns(currentRow);
  editListenerHandlersOff(currentRow);
};

const validateData = (currentRow) => {
  const inputs = Array.from(currentRow.querySelectorAll(".edit-input"));
  const arr = inputs.map((el) => el.value);
  const [name, email, address] = arr;
  validators.nameTest.test(name) &&
  validators.emailTest.test(email) &&
  validators.addressTest.test(address)
    ? changeDOMandServer(currentRow, arr)
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

const realTimeValidation = (ev, currentRow) => {
  const inputs = Array.from(currentRow.querySelectorAll(".edit-input"));
  if (ev.target === inputs[0]) {
    isClassHandlerValid(validators.nameTest.test(ev.target.value), ev);
  } else if (ev.target === inputs[1]) {
    isClassHandlerValid(validators.emailTest.test(ev.target.value), ev);
  } else if (ev.target === inputs[2]) {
    isClassHandlerValid(validators.addressTest.test(ev.target.value), ev);
  }
};

const confirmEdit = (currentRow) => {
  isItTheSame(currentRow) ? undoEdit(currentRow) : validateData(currentRow);
};

const deleteUserFromDOM = (currentRow) => {
  currentRow.remove();
};

const deleteUserFromServer = (id) => {
  return axios.delete(`${assets.usersURL}/${id}`).catch((err) => {
    console.error(err.message);
    toastHandler("DeleteError");
  });
};

const deleteUser = (ev) => {
  let currentRow = ev.target.parentNode.parentNode;
  let id = currentRow.children[0].textContent;
  deleteUserFromServer(id)
    .then(() => {
      deleteUserFromDOM(currentRow);
      toastHandler("UserDeleted");
    })
    .catch((err) => console.error(err.message));
};

//EVENT LISTENERS

const deactivateListeners = () => {
  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) => btn.removeEventListener("click", openEditMode));
  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => btn.removeEventListener("click", deleteUser));
};

const activateListeners = () => {
  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) => btn.addEventListener("click", openEditMode));
  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => btn.addEventListener("click", deleteUser));
};

const activateEditListeners = (currentElement) => {
  let inputs = document.querySelectorAll(".edit-input");
  currentElement
    .querySelector(".confirm-btn")
    .addEventListener("click", (ev) => {
      let currentRow = ev.target.parentNode.parentNode;
      confirmEdit(currentRow);
    });
  inputs.forEach((input) =>
    input.addEventListener("keypress", (ev) => {
      let currentRow = ev.target.parentNode.parentNode;
      if (ev.keyCode === 13) {
        confirmEdit(currentRow);
      }
    })
  );
  inputs.forEach((input) =>
    input.addEventListener("keyup", (ev) => {
      let currentRow = ev.target.parentNode.parentNode;
      realTimeValidation(ev, currentRow);
    })
  );

  currentElement.querySelector(".undo-btn").addEventListener("click", (ev) => {
    let currentRow = ev.target.parentNode.parentNode;
    undoEdit(currentRow);
  });
};

assets.addUserBtn.addEventListener("click", addNewUserModal);

export { activateListeners, warningHandler };
