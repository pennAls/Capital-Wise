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
      navigateToSeeMore() {
        window.location.href =
          "/Capital_Wise/resumo_usuario/resumo_usuario.html";
      }
    }
  
    const navigate = new Navigation();

    const verMais = document.querySelector(".view-more-pagina2");
    const sairButton = document.getElementsByClassName("sair-buttom")[0];
    sairButton.addEventListener("click", () => navigate.navigateToMain());
    verMais.addEventListener("click", () => navigate.navigateToSeeMore());
  
    const timeOutSession = () => {
      sessionStorage.clear();
      window.location.href = "/Capital_Wise/Tela_main/main.html";
    };
  
    let tempoParaTimeout = 100000;  
  
    const haveToken = sessionStorage.getItem("token") || false;
  
    if (haveToken) {
      setTimeout(timeOutSession, tempoParaTimeout); 
    }
  
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.strokeStyle = '#ffa500';
    ctx.lineWidth = 2;
  
    let lastTime = 0;
    const speed = 1000;
  
    function drawLine() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.beginPath();
      
      ctx.moveTo(0, Math.random() * canvas.height);
      
      for (let x = 20; x < canvas.width; x += 60) {
        const y = Math.random() * canvas.height;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
    }
  
    function animate(timestamp) {
      if (timestamp - lastTime >= speed) {
        drawLine(); 
        lastTime = timestamp; 
      }
  
      requestAnimationFrame(animate); 
    }
  
    requestAnimationFrame(animate); 
  });
  