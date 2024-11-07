window.onload = function () {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');

   
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight - 30; // Reduz altura para acomodar o título

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffa500';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Ponto inicial do gráfico
    ctx.moveTo(0, Math.random() * canvas.height);

    // Gerar linhas aleatórias para o gráfico
    for (let x = 20; x < canvas.width; x += 60) {
        const y = Math.random() * canvas.height;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
};

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
      navigateToUserScreen() {
        window.location.href = "/Capital_Wise/Tela_Usuario/usuario.html";
      }
    }
  
    const navigate = new Navigation();
  
    const sairButton = document.getElementsByClassName("sair-buttom")[0];
  
    sairButton.addEventListener("click", () => navigate.navigateToMain());
    userButton.addEventListener("click", () => navigate.navigateToUserScreen());
  
    const timeOutSession = () => {
      sessionStorage.clear();
      window.location.href = "/Capital_Wise/Tela_main/main.html";
    };
  
    let tempoParaTimeout = 100000;
  
    const haveToken = sessionStorage.getItem("token") || false;
  
    if (haveToken) {
      setTimeout(timeOutSession, tempoParaTimeout);
    }
  });
  