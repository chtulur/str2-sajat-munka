const usersJson = "http://localhost:3000/users";
const body = document.querySelector("body");
const tbody = document.querySelector("tbody");
const toastContainer = document.querySelector(".toast-container");

let savedData = [];

const createTable = ({ id, name, emailAddress, address }) => {
  tbody.innerHTML += `<tr>
    <td title="${id}">${id}</td>
    <td title="${name}">${name}</td>
    <td title="${emailAddress}">${emailAddress}</td>
    <td title="${address}">${address}</td>
    <td title="" class="btns">
      <button class="edit-btn btn"><i class="fa fa-cog"></i></button>
      <button class="delete-btn btn"><i class="fa fa-trash"></i></button>
    </td>
   </tr>`;
};

const getUsers = async () => {
  try {
    let arr = await fetch(usersJson).then((response) => response.json());
    for (let i = 0; i < arr.length; i++) {
      let user = arr[i];
      createTable(user);
    }
    activateListeners();
  } catch (err) {
    console.error(err);
  }
};
getUsers();

const editListenerHandlers = (currentElement) => {
  deactivateListeners();
  activateEditListeners(currentElement);
  activateIllegalListeners();
};

const openEditMode = (ev) => {
  currentElement = ev.target.parentNode;
  currentRow = ev.target.parentNode.parentNode;
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

// const callToast = (type, message, timeout = 5000) => {
//   let toastDiv = document.createElement("div");
//   toastDiv.classList.add(`toast-${type}`, "toast");
//   toastDiv.textContent = `${message}`;
//   toastContainer.appendChild(toastDiv);
//   setTimeout(() => {
//     toastDiv.remove();
//   }, timeout);
//   toastDiv.addEventListener("click", () => {
//     toastDiv.remove();
//   });
// };

const addEditBtns = (ev) => {
  ev.target.parentNode.innerHTML = `<button class="confirm-btn btn"><i class="fa fa-check"></i></button>
  <button class="undo-btn btn"><i class="fa fa-rotate-left"></i></button>`;
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
  currentRow.children[4].innerHTML = `<button class="edit-btn btn"><i class="fa fa-cog"></i></button>
   <button class="delete-btn btn"><i class="fa fa-trash"></i></button>`;
};

const undoEdit = (ev) => {
  currentRow = ev.target.parentNode.parentNode;
  resetBtns(currentRow);
  resetEdit(currentRow, savedData);
  deactivateIllegalListeners();
  activateListeners();
  removeEditClassFromRow(currentRow);
};

const confirmEdit = (ev) => {
  console.log("hi");
};

const deleteUser = (ev) => {
  console.log("hi");
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
