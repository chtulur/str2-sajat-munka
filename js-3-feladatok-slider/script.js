let picInFocus = 0;
let imageCounter = 0;
let carouselInterval;

const container = document.querySelector(".carousel-container");
const imageContainer = container.querySelector(".image-container");
const counter = document.querySelector(".counter-number");

const picturesURL = "http://localhost:3000/pictures";

const rightArrow = document.querySelector(".fa-angle-right");
const leftArrow = document.querySelector(".fa-angle-left");

const circles = Array.from(document.querySelectorAll(".fa-circle"));
let images;

circles[picInFocus].style.color = "rgb(78, 88, 241)";

const getPictures = async () => {
  try {
    return await axios.get(picturesURL).then((response) => response.data);
  } catch (err) {
    console.error(err);
  }
};

const collectPictures = () => {
  images = Array.from(document.querySelectorAll(".image"));
};

const printPics = (picsumURL) => {
  imageCounter++;
  let newPic = document.createElement("img");
  newPic.src = picsumURL;
  newPic.alt = `carousel-image${imageCounter}`;
  newPic.classList.add(`img-random${imageCounter}`, "image");
  if (imageCounter === 1) {
    newPic.classList.add("showImage");
  }
  imageContainer.appendChild(newPic);
};

const prepareForPrintingPics = () => {
  getPictures().then((response) => {
    let pics = response.pop();
    console.log(pics);
    for (let pic in pics) {
      let picsumURL = pics[pic];
      printPics(picsumURL);
    }
    collectPictures();
    startInterval();
  });
};
prepareForPrintingPics();

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

const startInterval = () => {
  carouselInterval = setInterval(scrollRight, 3000);
};

rightArrow.addEventListener("click", scrollRight);
leftArrow.addEventListener("click", scrollLeft);
circles.forEach((circle) => circle.addEventListener("click", selectPicture));
container.addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});
container.addEventListener("mouseleave", startInterval);
