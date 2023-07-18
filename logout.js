function onLogout() {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    localStorage.removeItem("accessToken");
    window.location.href = "./index.html";
  }
  