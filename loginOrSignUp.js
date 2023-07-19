switchMode = false;

// Define variable type
const roles = ["user", "admin", "super", "viewer"];
// roles = ["user", "admin", "super", "viewer"];

function validateRole(role) {
  return roles.includes(role);
}

const selectElement = document.getElementById("my-select");

const roleLength = roles.length;
// 1000;

// for (let i = 0; i < role.length; i++) {
for (let i = 0; i < roleLength; i++) {
  const option = document.createElement("option");

  option.text = roles[i];
  option.value = roles[i];

  selectElement.appendChild(option);
}

document.getElementById("for-signup").style.display = "none";

let loginOrSignUpForm = document.getElementById("register");

loginOrSignUpForm.addEventListener("click", async (e) => {
  e.preventDefault();

  // let username = document.getElementById("username");
  // let password = document.getElementById("password");
  // let email = document.getElementById("email");
  // let role = document.getElementById("my-select");

  let username = document.getElementById("username")
    ? document.getElementById("username").value
    : null;
  let password = document.getElementById("password")
    ? document.getElementById("password").value
    : null;
  let email = document.getElementById("email")
    ? document.getElementById("email").value
    : null;
  let role = document.getElementById("my-select")
    ? document.getElementById("my-select").value
    : null;

  if (this.switchMode) {
    if (!username || !password || !email || !role) {
      alert("Ensure you input value in all fields!");
    } else {
      // perform operation with form input

      if (
        validateUserName(username) &&
        validateRole(role) &&
        validatePassword(password) &&
        validateEmail(email)
      ) {
      } else {
        if (!validateUserName(username)) {
          alert('Ensure valid user name')
        }
      }

      const signUpData = {
        username,
        password,
        email,
        role,
      };

      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("The SignUp has been successful");
      } else {
        console.log(data.message);
        alert(data.message);
      }
    }
  } else {
    if (!username || !password) {
      alert("Ensure you input a value in both fields!");
    } else {
      // perform operation with form input
      const logInData = {
        username,
        password,
      };

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logInData),
      });

      const data = await res.json();
      if (res.ok) {
        const token = data.accessToken;

        localStorage.setItem("accessToken", token);

        window.location.href = "./weather.html";
        alert("Successfully logged in");
      } else {
        alert(data.message);
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
