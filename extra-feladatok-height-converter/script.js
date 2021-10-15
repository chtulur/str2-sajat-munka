document.querySelector(".btn").addEventListener("click", swapConversion);
document.querySelector(".convertButton").addEventListener("click", calculation);

let state = "Imperial";
function swapConversion() {
	if (
		document.querySelector(".conversionDirection").innerHTML ===
		"Imperial to Metric"
	) {
		document.querySelector(".conversionDirection").innerHTML =
			"Metric to Imperial";
		document.querySelector(".incrementsFeetOrMeters").innerHTML = "Meters";
		document.querySelector(".incrementsInchesOrCentimeters").innerHTML =
			"Centimeters";
		state = "Metric";
		document.querySelector("#currentExchange").innerHTML = " Imperial";
	} else if (
		document.querySelector(".conversionDirection").innerHTML ===
		"Metric to Imperial"
	) {
		document.querySelector(".conversionDirection").innerHTML =
			"Imperial to Metric";
		document.querySelector(".incrementsFeetOrMeters").innerHTML = "Feet";
		document.querySelector(".incrementsInchesOrCentimeters").innerHTML =
			"Inches";
		state = "Imperial";
		document.querySelector("#currentExchange").innerHTML = " Metric";
	}
}

function calculation() {
	if (state === "Imperial") {
		let upperValue = document.querySelector(".feetOrMeters").value;
		let lowerValue = document.querySelector(".inchesOrCentimeters").value;
		if (upperValue == "") {
			upperValue = 0;
		}
		if (lowerValue == "") {
			lowerValue = 0;
		}
		let cm = parseFloat(upperValue) * 30.48 + parseFloat(lowerValue) * 2.54;
		document.querySelector(".solutionBox").innerHTML = cm.toFixed(2) + " cm";
		checkIfMore();
	} else if (state === "Metric") {
		let upperValue = document.querySelector(".feetOrMeters").value;
		let lowerValue = document.querySelector(".inchesOrCentimeters").value;
		if (upperValue == "") {
			upperValue = 0;
		}
		if (lowerValue == "") {
			lowerValue = 0;
		}
		let feet =
			parseFloat(upperValue) * 3.2808399 + parseFloat(lowerValue) * 0.032808399;
		document.querySelector(".solutionBox").innerHTML =
			feet.toFixed(2) + " feet";
		checkIfMoar();
	}
}

function checkIfMore() {
	let solution = parseFloat(document.querySelector(".solutionBox").innerHTML);
	if (solution >= 200) {
		let meters = Math.floor(solution / 100);
		cm = solution % 100;
		document.querySelector(".solutionBox").innerHTML =
			meters + " m, " + cm.toFixed(2) + " cm";
	}
}

function checkIfMoar() {
	let solution = parseFloat(document.querySelector(".solutionBox").innerHTML);
	if (solution % 1 !== 0) {
		document.querySelector(".solutionBox").innerHTML =
			Math.floor(solution) +
			" feet, " +
			((solution % 1) * 12).toFixed(2) +
			" inches";
	}
}
