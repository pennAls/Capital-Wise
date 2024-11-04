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
    sessionStorage.setItem("token", generateToken());
    window.location.href = "/Capital_Wise/Tela_main/main.html";
  } else {
    window.alert("Usuário ou senha incorretos.");
  }
});

function generateToken(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}


const timeOutSession = () => {
  sessionStorage.clear();
  window.location.href = "/Capital_Wise/Tela_main/main.html";
};

let tempoParaTimeout = 10000;

const haveToken = sessionStorage.getItem("token") || false;

if (haveToken) {
  setTimeout(timeOutSession, tempoParaTimeout);
}
