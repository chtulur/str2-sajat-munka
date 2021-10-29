//queryselectors
const modalBtns = [
  document.querySelector(`.modal__okayBtn`),
  document.querySelector(`.modal__cancelBtn`),
];
const openModalBtn = document.querySelector(`.openModalBtn`);
const body = document.querySelector(`body`);
const modal = document.querySelector(`.modal__main`);

//Open and Close
const closeModal = () => {
  modal.classList.add(`fadeOut`);
  setTimeout(() => {
    modal.style.display = `none`;
    openModalBtn.style.display = `block`;
    body.style.backgroundColor = `white`;
  }, 500);
};

const openModal = () => {
  openModalBtn.style.display = `none`;
  body.style.backgroundColor = `rgba(0, 0, 0, 0.7)`;
  modal.style.display = `block`;
  modal.classList.remove(`fadeOut`);
  modal.classList.add(`fadeIn`);
};

//Event Listeners
modalBtns.forEach((btn) => btn.addEventListener(`click`, closeModal));

openModalBtn.addEventListener(`click`, openModal);

document.addEventListener(`click`, (event) => {
  if (!modal.contains(event.target) && !openModalBtn.contains(event.target)) {
    closeModal();
  }
});
