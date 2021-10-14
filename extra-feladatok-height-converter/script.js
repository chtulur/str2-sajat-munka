document.querySelector('.btn').addEventListener('click', swapConversion)
document.querySelector('.convertButton').addEventListener('click', calculation)

let state = "Imperial"
function swapConversion() {
  if (document.querySelector('.conversionDirection').innerHTML === "Imperial to Metric"){
    document.querySelector('.conversionDirection').innerHTML = "Metric to Imperial"
    document.querySelector('.incrementsFeetOrMeters').innerHTML = "Meters"
    document.querySelector('.incrementsInchesOrCentimeters').innerHTML = "Centimeters"    
    state = "Metric"

  } else if (document.querySelector('.conversionDirection').innerHTML === "Metric to Imperial"){
    document.querySelector('.conversionDirection').innerHTML = "Imperial to Metric"
    document.querySelector('.incrementsFeetOrMeters').innerHTML = "Feet"
    document.querySelector('.incrementsInchesOrCentimeters').innerHTML = "Inches"
    state = "Imperial"    
  }
}

function calculation() {
  if (state ==="Imperial") {
   let cm=(parseFloat(document.querySelector('.feetOrMeters').value)*30.48) + (parseFloat(document.querySelector('.inchesOrCentimeters').value)*2.54);
   document.querySelector('.solutionBox').innerHTML = cm.toFixed(2) + " cm";
   checkIfMore();
  
  } else if (state ==="Metric") {
    let feet =(parseFloat(document.querySelector('.feetOrMeters').value)*3.2808399) + (parseFloat(document.querySelector('.inchesOrCentimeters').value)*0.032808399);
   document.querySelector('.solutionBox').innerHTML = feet.toFixed(2) + " feet";
   checkIfMoar();
  }
}

function checkIfMore() {
  let solution = parseFloat(document.querySelector('.solutionBox').innerHTML)
  if (solution >= 200) {
    let meters = Math.floor(solution / 100)
    cm = solution % 100
    document.querySelector('.solutionBox').innerHTML = meters + " m, " + cm.toFixed(2) + " cm";
  }
}

function checkIfMoar() {
  let solution = parseFloat(document.querySelector('.solutionBox').innerHTML)  
  if (solution % 1 !== 0) {
    document.querySelector('.solutionBox').innerHTML = Math.floor(solution) + " feet, " + (solution % 1 *12).toFixed(2) + " inches";
  }
  }
