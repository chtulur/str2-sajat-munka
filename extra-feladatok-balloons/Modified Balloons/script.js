document.addEventListener("DOMContentLoaded", () => {
	let balloons = document.querySelectorAll(".balloon");
	balloons.forEach((bloon) => {
		bloon.addEventListener("mouseover", pop);
	});
});
let globalPopCount = 0;
function pop(ev) {
	let currentBloon = document.elementFromPoint(ev.x, ev.y);
	document.elementFromPoint(ev.x, ev.y).style.backgroundColor = "transparent";
	document.elementFromPoint(ev.x, ev.y).innerHTML = "Pop!";
	currentBloon.removeEventListener("mouseover", pop);
	console.log("me");
	globalPopCount++;
	if (globalPopCount === 24) {
		document
			.querySelector(".wrapper")
			.removeChild(document.querySelector("#balloon-gallery"));
		document.querySelector("#yay-no-balloons").style.display = "block";
	}
}
