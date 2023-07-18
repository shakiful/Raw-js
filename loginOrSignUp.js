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
      const signUpData = {
        username: username.value,
        password: password.value,
        email: email.value,
        role: role.value,
      };

      let response = document.getElementById("response");

      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const data = await res.text();

      alert("The SignUp has been successful");
      response.innerHTML = data;
    }
  } else {
    if (username.value == "" || password.value == "") {
      alert("Ensure you input a value in both fields!");
    } else {
      // perform operation with form input
      const logInData = {
        username: username.value,
        password: password.value,
      };

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logInData),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.accessToken;

        localStorage.setItem("accessToken", token);

        window.location.href = "./weather.html";
        alert("Successfully logged in");
      } else {
        await alert("Invalid username or password");
      }
      
    }
  }
  document.getElementById("auth-form").reset();
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
