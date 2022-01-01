const navbar = document.querySelector(".navbar");
const navLinks = navbar.querySelectorAll(".nav-link");
const navbarBrand = navbar.querySelector(".navbar-brand");

const scrolled = () => {
  if (window.scrollY !== 0) {
    navbar.style.backgroundColor = "white";
    navLinks.forEach((link) => {
      link.classList.remove("text-white-50");
      link.classList.add("scrolled");
    });
    navbarBrand.classList.add("scrolled");
  } else {
    navbar.style.backgroundColor = "transparent";
    navLinks.forEach((link) => {
      link.classList.add("text-white-50");
      link.classList.remove("scrolled");
    });
    navbarBrand.classList.remove("scrolled");
  }
};

scrolled();

window.addEventListener("scroll", scrolled);
