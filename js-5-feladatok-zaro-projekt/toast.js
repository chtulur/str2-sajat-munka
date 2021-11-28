const callToast = (type, message, timeout = 5000) => {
  let toastDiv = document.createElement("div");
  toastDiv.classList.add(`toast-${type}`, "toast");
  toastDiv.textContent = `${message}`;
  toastContainer.appendChild(toastDiv);
  setTimeout(() => {
    toastDiv.remove();
  }, timeout);
  toastDiv.addEventListener("click", () => {
    toastDiv.remove();
  });
};
