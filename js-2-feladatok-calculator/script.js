let result;
const display = document.querySelector(".display-text");

const numericProcessor = (ev) => {
  if (display.textContent === "ERROR" || display.textContent === "NaN") {
    display.textContent = "";
  }
  const num = ev.target.textContent;
  display.textContent += num;
};

const operatorProcessor = (ev) => {
  const operator = ev.target.textContent;
  display.textContent += operator;
};

const clearDisplay = () => {
  display.textContent = "";
};

const generateParts = (data) => {
  let parts = [];
  let num = "";
  let isOperatorStart = data.split("");
  let isExtracted = false;
  let extractedOpertaor;
  if (isOperatorStart[0].match(/[-+÷x]/)) {
    extractedOpertaor = isOperatorStart.shift();
    isExtracted = true;
  }
  isOperatorStart.forEach((char) => {
    if (char.match(/[0-9\.]/)) {
      num += char;
    } else {
      parts.push(parseFloat(num));
      num = "";
      parts.push(char);
    }
  });
  parts.push(parseFloat(num));
  isExtracted === true && extractedOpertaor === "-"
    ? (parts[0] *= -1)
    : parts[0];
  if (Number.isNaN(parts[parts.length - 1])) {
    parts.pop();
    parts.pop();
  }
  return parts;
};

const calculate = (numbers, operators) => {
  let a;
  let b;

  operators.forEach((operator) => {
    result === undefined ? (a = numbers.shift()) : (a = result);
    b = numbers.shift();
    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "x":
        result = a * b;
        break;
      case "÷":
        result = a / b;
        break;
    }
  });
  display.textContent = result;
  result = undefined;
};

const extractNumsOperands = (parts) => {
  let operators = parts.filter((_, i) => i % 2 === 2 - 1);
  let numbers = parts.filter((_, i) => i % 2 === 0);
  return calculate(numbers, operators);
};

const calculateResult = (data) => {
  let parts = generateParts(data);
  return extractNumsOperands(parts);
};

const collectData = () => {
  const processable = display.textContent;
  display.textContent = "";
  const regexNotAllowed = new RegExp(/[\+\-x÷]{2}/);
  regexNotAllowed.test(processable)
    ? (display.textContent = "ERROR")
    : calculateResult(processable);
};

const numbers = document.querySelectorAll(".numbers");
const numericArray = Array.from(numbers);
numericArray.forEach((btn) => btn.addEventListener("click", numericProcessor));

const operators = document.querySelectorAll(".operator");
const operatorArray = Array.from(operators);
operatorArray.forEach((btn) =>
  btn.addEventListener("click", operatorProcessor)
);

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);

const equal = document.querySelector(".result-equal");
equal.addEventListener("click", collectData);
