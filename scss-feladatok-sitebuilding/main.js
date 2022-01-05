const menuBtn = document.querySelector(".nav-menu__btn");
const navMenu = document.querySelector(".nav .menu-nav");
const nav = document.querySelector(".nav");
const brand = document.querySelector(".nav__brand");
const menuLinks = document.querySelectorAll(".menu-nav__link");

// modals
const privacy = document.querySelector("#privacy-modal");
const terms = document.querySelector("#terms-modal");
const FAQ = document.querySelector("#FAQ-modal");

// buttons opening modals
const privacyBtn = document.querySelector(".open-privacy");
const termsBtn = document.querySelector(".open-terms");
const faqBtn = document.querySelector(".open-faq");

// buttons inside modal
const closeModalBtn = document.querySelectorAll(".close-modal");

const openMenuBtn = () => {
  if (window.innerWidth < 992 && menuBtn.classList.contains("opened")) {
    menuBtn.classList.remove("opened");
    navMenu.style.display = "none";
  } else if (!menuBtn.classList.contains("opened")) {
    menuBtn.classList.add("opened");
    navMenu.style.display = "flex";
  }
};

let flickASwitch = true;
const checkScreenWidth = () => {
  if (window.innerWidth >= 992) {
    if (flickASwitch === false) {
      flickASwitch = true;
    }
    navMenu.style.display = "flex";
    navMenu.classList.add("menu-nav__normal-screen");
    navMenu.classList.remove("menu-nav__mobile");
  } else if (window.innerWidth < 992) {
    if (flickASwitch) {
      menuBtn.classList.remove("opened");
      navMenu.style.display = "none";
      flickASwitch = false;
    }
    navMenu.classList.add("menu-nav__mobile");
    navMenu.classList.remove("menu-nav__normal-screen");
  }
};

const checkScreenHeight = () => {
  if (window.scrollY !== 0) {
    nav.style.backgroundColor = "white";
    menuLinks.forEach((link) => link.classList.add("scrolled"));
    brand.classList.add("scrolled");
  } else if (window.scrollY === 0 && window.innerWidth >= 992) {
    nav.style.backgroundColor = "transparent";
    menuLinks.forEach((link) => link.classList.remove("scrolled"));
    brand.classList.remove("scrolled");
  } else if (window.scrollY === 0 && window.innerWidth < 992) {
    nav.style.backgroundColor = "white";
  }
};

checkScreenHeight();
checkScreenWidth();

menuBtn.addEventListener("click", openMenuBtn);
window.addEventListener("resize", checkScreenWidth);
window.addEventListener("resize", checkScreenHeight);
window.addEventListener("scroll", checkScreenHeight);

//modals

const openModal = (modal) => {
  modal.classList.remove("hidden");
};

const checkModal = (ev) => {
  const buttons = {
    "open-privacy": privacy,
    "open-terms": terms,
    "open-faq": FAQ,
  };
  openModal(buttons[ev.target.classList[0]]);
};

const closeModal = (ev) => {
  ev.target.parentNode.parentNode.parentNode.parentNode.classList.add("hidden");
};

privacyBtn.addEventListener("click", checkModal);
termsBtn.addEventListener("click", checkModal);
faqBtn.addEventListener("click", checkModal);
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
