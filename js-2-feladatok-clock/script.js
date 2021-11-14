//Solution II

// const getLocalTimeInfo = new Intl.DateTimeFormat().resolvedOptions();
// let nowArr;

// const now = (date) => {
//   nowArr = new Intl.DateTimeFormat(getLocalTimeInfo["locale"], {
//     localeMatcher: "best fit",
//     hour12: false,
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//   })
//     .format(date)
//     .split(":");
// };

// const assignValues = () => {
//   document.querySelector("#hours").innerHTML = nowArr[0];
//   document.querySelector("#minutes").innerHTML = nowArr[1];
//   document.querySelector("#seconds").innerHTML = nowArr[2];
// };

// setInterval(() => {
//   const date = new Date();
//   now(date);
//   assignValues();
// }, 1000);

// const Initdate = new Date();
// now(Initdate);
// assignValues();

//Solution I

const theCLockIsTicking = () => {
  let now = new Date();
  return (digits = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  });
};

const assignValues = () => {
  document.querySelector("#hours").innerHTML = digits.hours;
  document.querySelector("#minutes").innerHTML = digits.minutes;
  document.querySelector("#seconds").innerHTML = digits.seconds;
};

setInterval(() => {
  theCLockIsTicking();
  assignValues();
}, 1000);

theCLockIsTicking();
assignValues();
