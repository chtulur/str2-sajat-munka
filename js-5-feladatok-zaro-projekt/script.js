import callToast from "./toast.js";

const usersURL = "http://localhost:3000/users";
const tbody = document.querySelector("tbody");

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
    return await axios.get(usersURL).then((response) => response.data);
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

const editListenerHandlers = (currentElement) => {
  deactivateListeners();
  activateEditListeners(currentElement);
  activateIllegalListeners();
};

const openEditMode = (ev) => {
  let currentElement = ev.target.parentNode;
  let currentRow = ev.target.parentNode.parentNode;
  addEditClassToRow(currentRow);
  addEditBtns(ev);
  addInputFields(currentRow);
  editListenerHandlers(currentElement);
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
  handleSavedData();
};

const handleSavedData = () => {
  const inputs = document.querySelectorAll(".edit-input");
  for (let i = 0; i < savedData.length; i++) {
    inputs[i].value = `${savedData[i]}`;
  }
};

const resetEdit = (currentRow) => {
  const inputFields = currentRow.children;
  for (let i = 1; i < inputFields.length - 1; i++) {
    inputFields[i].innerHTML = `${savedData[i - 1]}`;
  }
  savedData = [];
};

const resetBtns = (currentRow) => {
  currentRow.children[4].innerHTML = `<button title="Edit user" class="edit-btn btn"><i class="fa fa-cog"></i></button>
   <button title="Delete user" class="delete-btn btn"><i class="fa fa-trash"></i></button>`;
};

const undoEdit = (ev) => {
  let currentRow = ev.target.parentNode.parentNode;
  resetBtns(currentRow);
  resetEdit(currentRow, savedData);
  deactivateIllegalListeners();
  activateListeners();
  removeEditClassFromRow(currentRow);
};

const confirmEdit = (ev) => {
  console.log("hi");
};

const deleteUserFromDOM = (currentRow) => {
  currentRow.remove();
};

const deleteUserFromJSON = (currentRow) => {
  getList().then((response) => {
    response.filter((user) => user.id == currentRow.children[0].textContent);
  });
};

const deleteUser = (ev) => {
  let currentRow = ev.target.parentNode.parentNode;
  deleteUserFromDOM(currentRow);
  deleteUserFromJSON(currentRow);
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
    .addEventListener("click", confirmEdit);
  currentElement.querySelector(".undo-btn").addEventListener("click", undoEdit);
};
