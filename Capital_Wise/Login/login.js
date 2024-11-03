class Navigation {
  navigateToMain() {
    window.location.href = "/Capital_Wise/Tela_main/main.html";
  }
  navigateToLogged() {}
}

const navigate = new Navigation();

const backButton = document.getElementsByClassName("voltar-inicio")[0];

backButton.addEventListener("click", () => navigate.navigateToMain());

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let userExists = false;

  for (const user of users) {
    if (user.email === email && user.senha === password) {
      userExists = true;
      break;
    }
  }

  if (userExists) {
    window.location.href = "/Capital_Wise/Tela_main/main.html";
  } else {
    console.log(JSON.parse(localStorage.getItem("users")));
    window.alert("Usuário ou senha incorretos.");
  }
});
