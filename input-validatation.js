function validateUserName(username) {
  return true;
}

function validatePassword(password) {}

function validateEmail(email) {}

function validateRole(role) {
  const val = roles.includes(role);
  return val > 1 ? true : false;
}
