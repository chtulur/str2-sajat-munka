import callToast from "./toast.js";

const nameTest =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,50}$/iu;
const emailTest =
  /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const addressTest =
  /^\d+ [0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöőõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{0,50}$/iu;

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

const undoEdit = (currentRow) => {
  resetBtns(currentRow);
  resetEdit(currentRow, savedData);
  deactivateIllegalListeners();
  activateListeners();
  removeEditClassFromRow(currentRow);
};

const isItTheSame = (currentRow) => {
  let currentFieldArray = [];
  let input = Array.from(currentRow.querySelectorAll(".edit-input"));
  input.forEach((input) => currentFieldArray.push(input.value));
  return currentFieldArray.sort().join(",") === savedData.sort().join(",")
    ? true
    : false;
};

const warningHandler = () => {
  console.log("wrong");
  callToast("warning", "invalid name format");
  callToast("warning", "invalid email address");
  callToast("warning", "invalid address (start with postal code)");
};

const changeDOMandServer = (inputs) => {
  console.log(inputs);
};

const validateData = (currentRow) => {
  const [name, email, address] = Array.from(
    currentRow.querySelectorAll(".edit-input")
  ).map((el) => el.value);
  nameTest.test(name) && emailTest.test(email) && addressTest.test(address)
    ? changeDOMandServer(inputs)
    : warningHandler();
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
