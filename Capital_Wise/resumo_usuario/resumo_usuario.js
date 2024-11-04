document.addEventListener("DOMContentLoaded", function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userButton = document.querySelector(".wallet-buttom");

  const loggedInEmail = sessionStorage.getItem("loggedInUserEmail");
  const loggedInUser = users.find((user) => user.email === loggedInEmail);

  if (loggedInUser) {
    userButton.innerText = loggedInUser.name;
  } else {
    userButton.innerText = "Usuário Desconhecido";
  }

  class Navigation {
    navigateToMain() {
      window.location.href = "/Capital_Wise/Tela_main/main.html";
    }
    navigateToLogged() {}
  }

  const navigate = new Navigation();

  const sairButton = document.getElementsByClassName("sair-buttom")[0];

  sairButton.addEventListener("click", () => navigate.navigateToMain());
});

const timeOutSession = () => {
  sessionStorage.clear();
  window.location.href = "/Capital_Wise/Tela_main/main.html";
};

let tempoParaTimeout = 10000;

const haveToken = sessionStorage.getItem("token") || false;

if (haveToken) {
  setTimeout(timeOutSession, tempoParaTimeout);
}
