const serialize = () => {
  let formData = new FormData();
  const modalInputs = Array.from(
    document.querySelectorAll(".modal-input-info-fields input")
  );
  modalInputs.forEach((input) => {
    let name = input.getAttribute("name");
    let value = input.value;
    formData.append(name, value);
  });
  return Array.from(formData);
};

export default serialize;
