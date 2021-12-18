let picInFocus = 0;

const container = document.querySelector(".carousel-container");
const counter = document.querySelector(".counter-number");

const rightArrow = document.querySelector(".fa-angle-right");
const leftArrow = document.querySelector(".fa-angle-left");

const images = Array.from(document.querySelectorAll(".image"));
const circles = Array.from(document.querySelectorAll(".fa-circle"));

circles[picInFocus].style.color = "rgb(78, 88, 241)";

const updateCounter = (picInFocus) => {
  counter.textContent = picInFocus + 1;
};

const updateCircles = (nextPic, picInFocus) => {
  circles[picInFocus].style.color = "";
  circles[nextPic].style.color = "rgb(78, 88, 241)";
};

const switchPicture = (nextPic, picInFocus) => {
  images[picInFocus].classList.remove("showImage");
  images[nextPic].classList.add("showImage");
};

const scrollRight = () => {
  let nextPic;
  picInFocus !== 3 ? (nextPic = picInFocus + 1) : (nextPic = 0);
  updateCircles(nextPic, picInFocus);
  switchPicture(nextPic, picInFocus);
  picInFocus !== 3 ? picInFocus++ : (picInFocus = 0);
  updateCounter(picInFocus);
};

const scrollLeft = () => {
  let nextPic;
  picInFocus !== 0 ? (nextPic = picInFocus - 1) : (nextPic = 3);
  updateCircles(nextPic, picInFocus);
  switchPicture(nextPic, picInFocus);
  picInFocus !== 0 ? picInFocus-- : (picInFocus = 3);
  updateCounter(picInFocus);
};

const selectPicture = (ev) => {
  picInFocus = circles.indexOf(ev.target);
  circles.forEach((circle) => (circle.style.color = ""));
  circles[picInFocus].style.color = "rgb(78, 88, 241)";
  container.querySelector(".showImage").classList.remove("showImage");
  images[picInFocus].classList.add("showImage");
  updateCounter(picInFocus);
};

images[picInFocus].classList.add("showImage");
setInterval(scrollRight, 3000);
rightArrow.addEventListener("click", scrollRight);
leftArrow.addEventListener("click", scrollLeft);
circles.forEach((circle) => circle.addEventListener("click", selectPicture));
