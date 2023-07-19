function validateUserName(username) {
  if (!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)) {
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (password.length >= 8) {
    if (!/[A-Z]/.test(password)) {
      alert("Password must have an uppercase letter.");
      return false;
    }

    if (!/[a-z]/.test(password)) {
      alert("Password must have a lowercase letter.");
      return false;
    }

    if (!/\d/.test(password)) {
      alert("Password must have a digit.");
      return false;
    }

    if (!/[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`]/.test(password)) {
      alert("Password must have a special character.");
      return false;
    }

    return true;
  } else {
    alert("Password must be at least 8 characters long.");
    return false;
  }
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validateRole(role) {
  return roles.includes(role);
}
