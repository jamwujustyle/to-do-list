const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("registerModal");
const closeBtns = document.querySelectorAll(".close");

signInBtn.addEventListener("click", () => {
  signInModal.classList.add("show");
  console.log("sign in clicked");
});

signUpBtn.addEventListener("click", () => {
  signUpModal.classList.add("show");
  console.log("sign up clicked");
});
closeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".modal").classList.remove("show");
  });
});
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("show");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll(".modal.show");
    openModals.forEach((modal) => modal.classList.remove("show"));
  }
});
