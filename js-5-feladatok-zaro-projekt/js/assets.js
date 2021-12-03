const assets = {
  usersURL: "http://localhost:3000/users",
  toastsURL: "http://localhost:4000/Toasts",
  toastObj: { Toasts: {} },
  tbody: document.querySelector("tbody"),
  addUserBtn: document.querySelector(".add-user-btn"),
  html: document.querySelector("html"),
  modalInputs: document.querySelectorAll(".modal-input-info-fields input"),
  modal: document.querySelector(".modal-container"),
  modalBg: document.querySelector(".modal-grey-background"),
  modalCancel: document.querySelector(".modal-cancel-btn"),
  modalConfirm: document.querySelector(".modal-confirm-btn"),
};

export default assets;
