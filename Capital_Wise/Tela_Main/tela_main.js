class Navigation {
  navigateToLogin() {
    window.location.href = "/Capital_Wise/Login/login.html";
  }
  navigateToRegister() {
    window.location.href = "/Capital_Wise/registro/registro.html";
  }
}

const navigate = new Navigation();

const loginButton = document.getElementsByClassName("login-buttom")[0];
const registerButton = document.getElementsByClassName("register-buttom")[0];


loginButton.addEventListener("click", () => navigate.navigateToLogin());
registerButton.addEventListener("click", () => navigate.navigateToRegister());
