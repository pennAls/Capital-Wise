class Navigation {
    navigateToMain() {
      window.location.href = "/Capital_Wise/Tela_main/main.html";
    }
    navigateToLogged() {
      window.location.href = "/Capital_Wise/registro/registro.html";
    }
  }

const navigate = new Navigation();

const backButton = document.getElementsByClassName("voltar-inicio")[0];
const loggedButton = document.getElementsByClassName("login-buttom")[0];


backButton.addEventListener("click", () => navigate.navigateToMain());
loggedButton.addEventListener("click", () => navigate.navigateToLogged());
