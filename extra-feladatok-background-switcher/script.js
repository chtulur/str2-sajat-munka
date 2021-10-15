document.addEventListener("DOMContentLoaded", () => {
	let circles = document.querySelectorAll(".circle");
	circles.forEach((cir) => {
		cir.addEventListener("click", switchBackground);
	});
});
function switchBackground(ev) {
	let circleColor = getComputedStyle(
		document.elementFromPoint(ev.x, ev.y)
	).backgroundColor;
	document.body.style.backgroundColor = circleColor;
}
