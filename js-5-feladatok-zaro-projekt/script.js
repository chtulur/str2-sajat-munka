import callToast from "./toast.js";

const nameTest =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,50}$/iu;
const emailTest =
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const addressTest =
  /^\d+ [0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöőõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,50}$/iu;

const usersURL = "http://localhost:3000/users";
const tbody = document.querySelector("tbody");
const addUserBtn = document.querySelector(".add-user-btn");
const modal = document.querySelector(".modal-container");
const modalBg = document.querySelector(".modal-grey-background");

let savedData = [];

const appendRow = ({ id, name, emailAddress, address }) => {
  tbody.innerHTML += `<tr>
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

const getList = async () => {
  try {
    return await axios
      .get(usersURL + "?_sort=id&_order=desc")
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
  });
};
getUsers();

const openEditMode = (ev) => {
  let currentElement = ev.target.parentNode;
  let currentRow = ev.target.parentNode.parentNode;
  addEditClassToRow(currentRow);
  addEditBtns(ev);
  addInputFields(currentRow);
  editListenerHandlers(currentElement);
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
    callToast("warning", "Stop editing first you dum-dum 👿");
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
  if (!nameTest.test(arr[0])) {
    callToast("warning", "Invalid name format");
  }
  if (!emailTest.test(arr[1])) {
    callToast("warning", "Invalid e-mail address");
  }
  if (!addressTest.test(arr[2])) {
    callToast("warning", "Invalid address (start with postal code)");
  }
};

const editDataOnServer = (id, arr, currentRow) => {
  return axios
    .patch(`${usersURL}/${id}`, {
      name: arr[0],
      emailAddress: arr[1],
      address: arr[2],
    })
    .then((response) => {
      if (response.status) {
        updateDOMafterEdit(currentRow, arr);
        callToast("success", "User has been updated!");
      }
    })
    .catch((err) => {
      console.error(err.message);
      callToast("error", "User was not edited due to bad server stuff");
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
  const [name, email, address] = inputs.map((el) => el.value);
  const arr = [name, email, address];
  nameTest.test(name) && emailTest.test(email) && addressTest.test(address)
    ? changeDOMandServer(currentRow, arr)
    : warningHandler(arr);
};

const confirmEdit = (currentRow) => {
  isItTheSame(currentRow) ? undoEdit(currentRow) : validateData(currentRow);
};

const deleteUserFromDOM = (currentRow) => {
  currentRow.remove();
};

const deleteUserFromServer = (id) => {
  return axios.delete(`${usersURL}/${id}`).catch((err) => {
    console.error(err.message);
    callToast("error", "User was not deleted due to bad server stuff");
  });
};

const deleteUser = (ev) => {
  let currentRow = ev.target.parentNode.parentNode;
  let id = currentRow.children[0].textContent;
  deleteUserFromServer(id)
    .then((response) => {
      if (response.status) {
        deleteUserFromDOM(currentRow);
        callToast("success", "User has been deleted!");
      }
    })
    .catch((err) => console.error(err.message));
};

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
  currentElement
    .querySelector(".confirm-btn")
    .addEventListener("click", (ev) => {
      let currentRow = ev.target.parentNode.parentNode;
      confirmEdit(currentRow);
    });
  currentElement.querySelector(".undo-btn").addEventListener("click", (ev) => {
    let currentRow = ev.target.parentNode.parentNode;
    undoEdit(currentRow);
  });
};

const closeModal = () => {
  modal.style.display = "none";
  modalBg.style.display = "none";
};

const clearModalInputs = () => {
  document
    .querySelectorAll(".modal-input-info-fields input")
    .forEach((field) => (field.value = ""));
};

const handlePostAddUserStuff = () => {
  clearModalInputs();
  closeModal();
  activateListeners();
  callToast("success", "User has been added!");
};

const addNewUserToServer = (arr) => {
  return axios
    .post(`${usersURL}`, {
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
      callToast("error", "User was not added to list due to bad server stuff");
    });
};

const addNewUserToDOM = (arr, newID) => {
  let newRow = document.createElement("tr");
  tbody.insertBefore(newRow, tbody.firstChild);
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
  nameTest.test(name) && emailTest.test(email) && addressTest.test(address)
    ? addNewUserToServer(arr)
    : warningHandler(arr);
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
};

addUserBtn.addEventListener("click", addNewUserModal);
