const grid = document.querySelector(".playArea");
let layout = [
	2, 1, 3, 0, 3, 1, 3, 2, 3, 4, 0, 1, 0, 4, 0, 2, 3, 1, 0, 4, 2, 4, 4, 1, 2,
];

//Draw PlayArea
const balloonsForPlayArea = [];
domForField();
generatePlayArea();

function domForField() {
	for (let i = 0; i < layout.length; i++) {
		const square = document.createElement("div");
		grid.appendChild(square);
		balloonsForPlayArea.push(square);
	}
}

function generatePlayArea() {
	for (let i = 0; i < layout.length; i++) {
		if (layout[i] === 0) {
			balloonsForPlayArea[i].classList.add("redBalloon", "balloon");
		} else if (layout[i] === 1) {
			balloonsForPlayArea[i].classList.add("blueBalloon", "balloon");
		} else if (layout[i] === 2) {
			balloonsForPlayArea[i].classList.add("purpleBalloon", "balloon");
		} else if (layout[i] === 3) {
			balloonsForPlayArea[i].classList.add("goldenBalloon", "balloon");
		} else if (layout[i] === 4) {
			balloonsForPlayArea[i].classList.add("crimsonBalloon", "balloon");
		}
	}
}

//EventListener on Bloons

document.addEventListener("DOMContentLoaded", () => {
	let elements = document.querySelectorAll(".balloon");
	elements.forEach((el) => {
		el.addEventListener("click", clicked);
	});
});

//Pop BLOONS

function addListenerToEveryone() {
	let elements = document.querySelectorAll(".balloon");
	elements.forEach((el) => {
		el.addEventListener("click", clicked);
	});
}

function clicked(ev) {
	let elem = document.elementFromPoint(ev.x, ev.y);
	elem.classList.add("clicked");
	soundPop();
	elem.removeEventListener("click", clicked);
}

//AUDIO

function soundPop() {
	let allAudio = document.querySelectorAll(".audio");
	allAudio.forEach((aud) => {
		aud.pause();
		aud.currentTime = 0;
	});
	switch (Math.floor(Math.random() * 4)) {
		case 0:
			document.querySelector("#audioI").play();
			break;
		case 1:
			document.querySelector("#audioII").play();
			break;
		case 2:
			document.querySelector("#audioIII").play();
			break;
		case 3:
			document.querySelector("#audioIV").play();
			break;
	}
}

//Generate new layout
document.querySelector(".btnI").addEventListener("click", generateNew);

function generateNew() {
	randomizeBubbles();
	removeClasses();
	generatePlayArea();
	addListenerToEveryone();
}

function removeClasses() {
	balloonsForPlayArea.forEach((element) => (element.className = ""));
}

function randomizeBubbles() {
	layout = [];
	for (i = 0; i < balloonsForPlayArea.length; i++) {
		layout.push(Math.floor(Math.random() * 5));
	}
}
