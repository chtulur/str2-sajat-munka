const serialize = (inputArray) => {
  let formData = new FormData();
  inputArray.forEach((input) => {
    let name = input.getAttribute("name");
    let value = input.value;
    formData.append(name, value);
  });
  return Array.from(formData);
};

export default serialize;
