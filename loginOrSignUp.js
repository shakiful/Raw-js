switchMode = false;

role = ["user", "admin", "super", "viewer"];

const selectElement = document.getElementById("my-select");

for (let i = 0; i < role.length; i++) {
  const option = document.createElement("option");

  option.text = role[i];
  option.value = role[i];

  selectElement.appendChild(option);
}

document.getElementById("for-signup").style.display = "none";

let loginOrSignUpForm = document.getElementById("register");

loginOrSignUpForm.addEventListener("click", async (e) => {
  e.preventDefault();

  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let email = document.getElementById("email");
  let role = document.getElementById("my-select");

  if (this.switchMode) {
    if (
      username.value == "" ||
      password.value == "" ||
      email.value == "" ||
      role.value == ""
    ) {
      alert("Ensure you input a value in both fields!");
    } else {
      // perform operation with form input
      const formData = {
        username: username.value,
        password: password.value,
        email: email.value,
        role: role.value,
      };
      alert("This form has been successfully submitted!");

      let response = document.getElementById("response");

      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.text();

      console.log(data);
      response.innerHTML = data;
    }
  } else {
    if (username.value == "" || password.value == "") {
      alert("Ensure you input a value in both fields!");
    } else {
      // perform operation with form input
      alert("This form has been successfully submitted!");
      console.log(
        `This form has a username of ${username.value} and password of ${password.value}`
      );
    }
  }
  await document.getElementById("auth-form").reset();
});

function onSwitch() {
  this.switchMode = !this.switchMode;
  if (this.switchMode) {
    document.getElementById("for-signup").style.display = "block";
    document.getElementById("switch").innerHTML = "Switch To Log In";
    document.getElementById("register").value = "Sign Up";
  } else {
    document.getElementById("for-signup").style.display = "none";
    document.getElementById("switch").innerHTML = "Switch to SignUp";
    document.getElementById("register").value = "Login";
  }
}
