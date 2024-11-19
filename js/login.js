const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("registerModal");
const closeBtns = document.querySelectorAll(".close");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;
  console.log(email);
  console.log(password);

  const data = {
    email: email,
    password: password,
  };
  console.log(data);
  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(`response status: `, response.status);
    const result = await response.json();
    console.log("response body", result);
    if (response.ok && result.message === "login successful") {
      console.log("login successful. redirecting..");
      window.location.href = "../templates/index.html";
    } else {
      console.log("login failed: ", result.error);
      alert(result.error || "login failed. try again");
    }
  } catch (err) {
    console.error("error : ", err);
    alert(`error occured. from catch block ${err}`);
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = registerEmail.value;
  const password = registerPassword.value;

  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      alert("ok");
    } else {
      alert("email registered");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("an error occured. please try again later");
  }
});

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
