document.querySelector("#button").addEventListener("click", calculation);
function calculation() {
	let upperValue = document.querySelector("#feet").value;
	let lowerValue = document.querySelector("#inches").value;
	let cm = parseFloat(upperValue) * 30.48 + parseFloat(lowerValue) * 2.54;
	document.querySelector("#results").innerHTML = cm.toFixed(2) + " cm";
}
