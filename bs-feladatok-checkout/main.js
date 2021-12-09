const select = document.querySelector(".custom-select");
const stateselect = document.querySelector(".state-select");

const states =
  "Choose..., Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, PennsylvaniaRhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming".split(
    ", "
  );

const counties =
  "Choose..., Baranya, Bács-Kiskun, Békés, Borsod-Abaúj-Zemplén, Budapest, Csongrád-Csanád, Fejér, Győr-Moson-Sopron, Hajdú-Bihar, Heves, Jász-Nagykun-Szolnok, Komárom-Esztergom, Nógrád, Pest, Somogy, Szabolcs-Szatmár-Bereg, Tolna, Vas, Veszprém, Zala".split(
    ", "
  );

const printCounties = () => {
  stateselect.innerHTML = "";
  counties.forEach((county) => {
    let newOptionElement = document.createElement("option");
    stateselect.appendChild(newOptionElement).textContent = county;
  });
};
const printStates = () => {
  stateselect.innerHTML = "";
  states.forEach((state) => {
    let newOptionElement = document.createElement("option");
    stateselect.appendChild(newOptionElement).textContent = state;
  });
};

select.addEventListener("click", (ev) => {
  console.log(select.options[select.selectedIndex].text);
  let currentCountry = select.options[select.selectedIndex].text;

  currentCountry === "Hungary" ? printCounties() : printStates();
});
