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

  const sairButton = document.querySelector(".sair-buttom");

  sairButton.addEventListener("click", () => navigate.navigateToMain());
  userButton.addEventListener("click", () => navigate.navigateToUserScreen());
});

const timeOutSession = () => {
  sessionStorage.clear();
  window.location.href = "/Capital_Wise/Tela_main/main.html";
};

let tempoParaTimeout = 100000;

const haveToken = sessionStorage.getItem("token") || false;

if (haveToken) {
  setTimeout(timeOutSession, tempoParaTimeout);
}

document.addEventListener("DOMContentLoaded", function () {
  const closeButton = document.querySelector(".close-button");
  const minimizeButton = document.querySelector(".minimize-button");
  const chatBox = document.getElementById("chatBox");
  const confirmationBox = document.getElementById("confirmationBox");
  const chatContent = document.getElementById("chatContent");
  const endChatButton = document.querySelector(".end-chat-button");
  const cancelCloseButton = document.querySelector(".cancel-button");

  let isChatStarted = false; 

  function showTypingAnimation() {
    chatContent.innerHTML = "Bem-vindo ao chatbot!";
  }

  function toggleChat() {
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
      chatBox.style.display = "block";
      if (!isChatStarted) {
        // Verifica se a conversa já foi iniciada
        isChatStarted = true; // Marca que o chat foi iniciado
        showTypingAnimation(); // Inicia a animação apenas na primeira abertura
      }
    } else {
      confirmationBox.style.display = "block";
    }
  }

  // Adiciona os eventos para os botões
  document.querySelector(".chat-button").addEventListener("click", toggleChat);

  closeButton.addEventListener("click", function () {
    confirmationBox.style.display = "block";
  });

  minimizeButton.addEventListener("click", function () {
    chatBox.style.display = "none";
  });

  // Animação de "digitando..."
  function showTypingAnimation() {
    const typingMessage = document.createElement("div");
    typingMessage.classList.add("chat-message");
    typingMessage.innerHTML = "<p>...</p>";
    chatContent.appendChild(typingMessage);

    setTimeout(() => {
      typingMessage.remove();
      showWelcomeMessages();
    }, 2000); // 2 segundos
  }


  function endChat() {
    confirmationBox.style.display = "none";
    chatBox.style.display = "none";
    chatContent.innerHTML = ""; // Limpa todas as mensagens do chat
    
    // Mostra a caixa de seleção após o fechamento do chat
    const selectionBox = document.querySelector("#yourSelectionBoxId"); // Substitua pelo ID correto
    if (selectionBox) {
      selectionBox.style.display = "block"; // Torna a caixa visível
    }
  
    isChatStarted = false; // Reseta o estado da conversa para o início
  }

  // Adiciona o evento de clique para finalizar o chat
  endChatButton.addEventListener("click", endChat);

  // Função para cancelar o fechamento do chat
  function cancelClose() {
    confirmationBox.style.display = "none";
  }

  // Adiciona o evento de clique para o botão de cancelar
  if (cancelCloseButton) {
    cancelCloseButton.addEventListener("click", cancelClose);
  }

  document.querySelector(".chat-button").addEventListener("click", toggleChat);

  closeButton.addEventListener("click", function () {
    confirmationBox.style.display = "block";
  });

  minimizeButton.addEventListener("click", function () {
    chatBox.style.display = "none";
  });

  // Mensagens de boas-vindas
  function showWelcomeMessages() {
    const welcomeMessages = [
      "Olá, bem-vindo ao suporte da Capital Wise! Como podemos ajudá-lo hoje?",
      "Selecione uma das opções abaixo ou digite sua dúvida para falar com um de nossos atendentes.",
    ];

    welcomeMessages.forEach((message, index) => {
      setTimeout(() => {
        addMessageToChat(message, "chatbot");
      }, index * 2000);
    });

    setTimeout(showOptions, welcomeMessages.length * 2000);
  }

  // Adiciona opções ao chat
  function showOptions() {
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    const options = [
      { label: "Investimentos", action: "Investimentos" },
      { label: "Transações e Carteiras", action: "Transações e Carteiras" },
      { label: "Conta e Login", action: "Conta e Login" },
      {
        label: "Relatórios de Investimentos",
        action: "Relatórios de Investimentos",
      },
      { label: "Falar com um Atendente", action: "Falar com um Atendente" },
    ];

    options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option.label;
      button.onclick = () => showResponse(option.action);
      optionsContainer.appendChild(button);
    });

    chatContent.appendChild(optionsContainer);
  }

  function showResponse(option) {
    // Adiciona a mensagem do usuário ao chat
    addMessageToChat(option, "user");
    document.getElementById("messageContainer").style.display = "block"; // Sempre exibe o input de mensagem

    // Esconde as opções após a seleção
    clearOptions();

    // Lógica para opções específicas
    if (option === "Falar com um Atendente") {
      // Mensagens para iniciar a interação com o atendente
      addMessageToChat(
        "Você escolheu falar com um atendente. Por favor, aguarde enquanto conectamos você a um de nossos representantes.",
        "chatbot"
      );

      // Aguarda 2 segundos antes de enviar a próxima mensagem
      setTimeout(() => {
        addMessageToChat(
          "Qual é o assunto que você gostaria de discutir com nosso atendente? Isso nos ajudará a direcionar sua consulta.",
          "chatbot"
        );
      }, 3000); // 2000 milissegundos = 2 segundos

      // Aqui você pode implementar a lógica para realmente conectar o usuário ao atendente,
      // como uma chamada de função que inicia o processo de atendimento.
    } else if (option === "Conta e Login") {
      const response =
        "Como posso ajudar com sua conta na Capital Wise? Selecione uma opção abaixo:";
      addMessageToChat(response, "chatbot");
      showAccountOptions(); // Mover esta linha para depois de adicionar a resposta do chatbot
    } else if (option === "Falar sobre outro assunto") {
      const response =
        "Por favor, descreva o assunto que você gostaria de discutir.";
      addMessageToChat(response, "chatbot");
      clearOptions(); // Remove as opções anteriores e mostra as opções iniciais novamente
    } else {
      const response = `Como posso ajudá-lo com ${option}? Selecione uma opção abaixo ou faça uma pergunta:`;
      addMessageToChat(response, "chatbot");
    }
  }

  function clearOptions() {
    const optionsContainer = document.querySelector(".options");
    if (optionsContainer) {
      optionsContainer.remove(); // Remove as opções de seleção
    }
  }

  // Função para mostrar opções de "Conta e Login"
  function showAccountOptions() {
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    const accountOptions = [
      { label: "Abertura de Conta", action: "Abertura de Conta" },
      {
        label: "Alteração de Dados Cadastrais",
        action: "Alteração de Dados Cadastrais",
      },
      { label: "Reabertura de Conta", action: "Reabertura de Conta" },
      { label: "Redefinição de Senha", action: "Redefinição de Senha" },
      {
        label: "Como Inserir Código de Convite",
        action: "Como Inserir Código de Convite",
      },
      {
        label: "Mais informações sobre Cadastro",
        action: "Mais informações sobre Cadastro",
      },
      { label: "Voltar ao Menu Principal", action: "Voltar ao Menu Principal" },
    ];

    accountOptions.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("option");
      button.textContent = option.label;
      button.onclick = () => handleAccountOption(option.action);
      optionsContainer.appendChild(button);
    });

    document.getElementById("chatContent").appendChild(optionsContainer);
  }

  // Função para lidar com as opções de conta
  function handleAccountOption(action) {
    addMessageToChat(action, "user"); // Adiciona a mensagem do usuário ao chat
    // Limpa as opções após a seleção
    clearOptions();

    // Aqui você pode adicionar lógica específica para cada opção
    let response;
    switch (action) {
      case "Abertura de Conta":
        response =
          "Para abrir uma conta, acesse a página de registro e preencha os dados necessários.";
        break;
      case "Alteração de Dados Cadastrais":
        response =
          "Para alterar seus dados cadastrais, vá até a seção de configurações na sua conta.";
        break;
      case "Reabertura de Conta":
        response =
          "Para reabrir sua conta, entre em contato com o suporte ao cliente.";
        break;
      case "Redefinição de Senha":
        showPasswordResetSteps();
        return; // Sai da função para não adicionar uma mensagem
      case "Como Inserir Código de Convite":
        response =
          "Para inserir um código de convite, vá até a seção de cadastro durante a abertura de conta.";
        break;
      case "Mais informações sobre Cadastro":
        response =
          "Para mais informações sobre cadastro, consulte a seção de ajuda em nosso site.";
        break;
      case "Voltar ao Menu Principal":
        showOptions(); // Volta para as opções principais
        return; // Sai da função para não adicionar uma mensagem
      default:
        response = "Desculpe, não entendi isso.";
    }

    addMessageToChat(response, "chatbot"); // Adiciona a resposta do chatbot
  }

  // Função para mostrar os passos da redefinição de senha em inputs
  function showPasswordResetSteps() {
    const steps = [
      "Acesse a página de login e clique em 'Esqueci minha senha'.",
      "Verifique seu e-mail para um código de 6 dígitos. Se não receber o e-mail, verifique sua pasta de spam.",
      "Insira o código recebido no campo indicado na página de redefinição.",
      "Informe sua data de nascimento e crie uma nova senha. Clique em 'Salvar' e faça login com sua nova senha.",
      "<strong> Importante: Sua conta será bloqueada após 3 tentativas incorretas de redefinição. Certifique-se de inserir corretamente os dados. </strong>",
      "Conseguiu criar sua nova senha? Caso contrário, entre em contato com nosso suporte.",
    ];

    // Exibe cada passo com um intervalo
    steps.forEach((message, index) => {
      setTimeout(() => {
        addMessageToChat(message, "chatbot");

        // Se for o último passo, mostrar a caixa de confirmação
        if (index === steps.length - 1) {
          showConfirmationBox();
        }
      }, index * 1000);
    });
  }

  function showConfirmationBox() {
    // Verifica se já existe uma caixa de confirmação e remove
    const existConfirmationContainer = document.querySelector(
      ".confirmation-container"
    );
    if (existConfirmationContainer) {
      existConfirmationContainer.remove();
    }

    const confirmContainer = document.createElement("div");
    confirmContainer.classList.add("confirmation-container");

    const pergunta = document.createElement("p");

    confirmContainer.appendChild(pergunta);

    const yesButton = document.createElement("button"); // Corrigido de 'botão' para 'button'
    yesButton.textContent = "Sim";
    yesButton.onclick = () => {
      addMessageToChat("Sim", "user");

      handleConfirmationResponse(true);
    };

    const noButton = document.createElement("button");
    noButton.textContent = "Não";
    noButton.onclick = () => {
      addMessageToChat("Não", "user");
      handleConfirmationResponse(false);
    };

    const otherButton = document.createElement("button");
    otherButton.textContent = "Falar sobre outro assunto";
    otherButton.onclick = () => {
      addMessageToChat("Falar sobre outro assunto", "user");
      clearOptions(); // Limpa as opções anteriores
      confirmContainer.remove(); // Remove a caixa de confirmação
      setTimeout(() => {
        addMessageToChat(
          "Faça uma pergunta ou selecione uma categoria abaixo:",
          "chatbot"
        );
        showOptions(true);
      }, 2000);
    };

    confirmContainer.appendChild(yesButton);
    confirmContainer.appendChild(noButton);
    confirmContainer.appendChild(otherButton);

    const chatContent = document.querySelector(".chat-content"); // Certifique-se de que o seletor está correto
    chatContent.appendChild(confirmContainer);
  }

  function showFinalConfirmation() {
    // Cria um elemento para a mensagem final de confirmação
    const confirmationContainer = document.createElement("div");
    confirmationContainer.className = "final-confirmation";
    confirmationContainer.innerText =
      "Se precisar de mais ajuda, estamos à disposição!";

    // Adiciona a mensagem final ao chat
    const chatContainer = document.querySelector(".chat-container"); // substitua pelo seletor correto da área de chat
    if (chatContainer) {
      chatContainer.appendChild(confirmationContainer);
    }
  }

  // Função para lidar com a resposta da confirmação
  function handleConfirmationResponse(success) {
    const confirmationContainer = document.querySelector(
      ".confirmation-container"
    );
    confirmationContainer.remove(); // Remove a caixa de confirmação

    if (success) {
      setTimeout(() => {
        addMessageToChat("Ótimo! Fico feliz em ter ajudado.", "chatbot");
      }, 1000); // Atraso de 1000 milissegundos (1 segundo)
    } else {
      setTimeout(() => {
        addMessageToChat(
          "Você possui acesso ao seu e-mail de cadastro?",
          "chatbot"
        );
        showEmailAccessOptions();
      }, 1000); // Atraso de 1000 milissegundos (1 segundo)
    }
  }

  let emailAccessProcessed = false;
  function showEmailAccessOptions() {
    if (emailAccessProcessed) return;
    emailAccessProcessed = true;

    const emailAccessContainer = document.createElement("div");
    emailAccessContainer.classList.add("confirmation-container");

    const question = document.createElement("p");
    emailAccessContainer.appendChild(question);

    const yesButton = document.createElement("button");
    yesButton.textContent = "Sim";
    yesButton.onclick = () => {
      addMessageToChat("Sim", "user");
      handleEmailAccessResponse(true);
    };

    const noButton = document.createElement("button");
    noButton.textContent = "Não";
    noButton.onclick = () => {
      addMessageToChat("Não", "user");
      handleEmailAccessResponse(false);
    };

    emailAccessContainer.appendChild(yesButton);
    emailAccessContainer.appendChild(noButton);
    chatContent.appendChild(emailAccessContainer);
  }

  function handleEmailAccessResponse(hasAccess) {
    const emailAccessContainer = document.querySelector(
      ".confirmation-container"
    );
    if (emailAccessContainer) {
      emailAccessContainer.remove();
    }

    if (hasAccess) {
      setTimeout(() => {
        addMessageToChat(
          'Verifique sua caixa de entrada e a pasta de spam para garantir que recebeu nosso e-mail. Caso tenha sido bloqueado, desbloqueie o domínio "@capitalwise.com".',
          "chatbot"
        );
      }, 1000);

      setTimeout(() => {
        addMessageToChat(
          'Tente novamente o procedimento no site, clicando em "Esqueci minha senha".',
          "chatbot"
        );
        setTimeout(showFinalConfirmation, 500);
      }, 2000);
    } else {
      setTimeout(() => {
        addMessageToChat(
          "Certo, vamos te direcionar para a nossa equipe de suporte.",
          "chatbot"
        );
      }, 1000);
    }
  }

  function showFinalConfirmation() {
    const chatContainer = document.querySelector(".chat-box");

    if (!chatContainer) {
      console.error("Elemento '.chat-box' não encontrado.");
      return;
    }

    const question = "Essa resposta foi útil?";
    addMessageToChat(question, "chatbot");

    const confirmationContainer = document.createElement("div");
    confirmationContainer.className = "final-confirmation-container";

    const additionalText = document.createElement("p");

    confirmationContainer.appendChild(additionalText);

    const yesButton = document.createElement("button");
    yesButton.textContent = "Sim";
    yesButton.className = "confirmation-button";
    yesButton.onclick = () => {
      addMessageToChat("Sim", "user");
      addMessageToChat("Ótimo! Fico feliz em ter ajudado.", "chatbot");
      confirmationContainer.remove();
    };

    const noButton = document.createElement("button");
    noButton.textContent = "Não";
    noButton.className = "confirmation-button";
    noButton.onclick = () => {
      addMessageToChat("Não", "user");
      addMessageToChat(
        "Certo, vamos te direcionar para a nossa equipe de suporte.",
        "chatbot"
      );
      confirmationContainer.remove();
    };

    confirmationContainer.appendChild(yesButton);
    confirmationContainer.appendChild(noButton);

    const specificMessage = Array.from(chatContainer.children).find((child) =>
      child.textContent.includes(
        'Tente novamente o procedimento no site, clicando em "Esqueci minha senha".'
      )
    );

    if (specificMessage) {
      specificMessage.insertAdjacentElement("afterend", confirmationContainer);
    } else {
      chatContainer.appendChild(confirmationContainer);
    }
  }

  function addMessageToChat(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.className =
      sender === "user" ? "user-message" : "chatbot-message";
    messageElement.classList.add("chat-message", sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  document
    .querySelector(".chat-input")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
      }
    });

  function sendMessage() {
    const input = document.querySelector(".chat-input");
    const message = input.value.trim();
    if (message === "") return;

    addMessageToChat(message, "user");

    const keywords = {
      conta:
        "Para criar uma conta, acesse a página de registro e preencha os dados necessários.",
      senha:
        "Se você esqueceu sua senha, utilize a opção 'Esqueci minha senha' na tela de login.",
      investimento:
        "Para fazer investimentos, escolha a opção de investimentos na sua conta.",
      suporte:
        "Você pode entrar em contato com o suporte ao cliente através da seção de ajuda.",
    };

    let response = "Desculpe, não entendi isso.";
    for (let keyword in keywords) {
      if (message.toLowerCase().includes(keyword)) {
        response = keywords[keyword];
        break;
      }
    }

    addMessageToChat(response, "chatbot");
    input.value = "";
  }
});

function addMessageToChat(message, sender) {
  const chatContent = document.getElementById("chatContent");
  const messageElement = document.createElement("div");
  messageElement.className =
    sender === "user" ? "user-message" : "chatbot-message";
  messageElement.textContent = message;
  chatContent.appendChild(messageElement);
  chatContent.scrollTop = chatContent.scrollHeight;
}

document
  .querySelector(".chat-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
