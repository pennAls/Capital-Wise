class Navigation {
  navigateToMain() {
    window.location.href = "/Capital_Wise/Tela_main/main.html";
  }
  navigateToLogged() {
    window.location.href = "/Capital_Wise/registro/registro.html";
  }
}

const navigate = new Navigation();

const backButton = document.getElementsByClassName("back-buttom")[0];
const loggedButton = document.getElementsByClassName("register-buttom")[0];

backButton.addEventListener("click", () => navigate.navigateToMain());

const nameError = document.getElementById("nameError");
const dateError = document.getElementById("dateError");
const telError = document.getElementById("telError");
const emailError = document.getElementById("emailError");
const senhaError = document.getElementById("senhaError");

class Form {
  constructor() {
    this.nameValid = true;
    this.dataValid = true;
    this.phoneValid = true;
    this.emailValid = true;
    this.senhaValid = true;
  }

  checkName(nameValue) {
    for (let letra of nameValue) {
      if (!isNaN(letra) && letra !== " ") {
        nameError.style.display = "block";
        this.nameValid = false;
        break; // Sai do loop se encontrar um erro
      } else if (/[^a-zA-Z0-9À-ÿ\s]/.test(letra)) {
        nameError.style.display = "block";
        this.nameValid = false;
        break;
      } else {
        this.nameValid = true;
        nameError.style.display = "none";
      }
    }
  }

  checkDate(dateValue) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      this.dataValid = true;
      const [year, month, day] = dateValue.split("-").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      const hasHadBirthday =
        today.getMonth() > month - 1 ||
        (today.getMonth() === month - 1 && today.getDate() >= day);

      if (age < 18 || (age === 18 && !hasHadBirthday) || age > 100) {
        dateError.style.display = "block";
        this.dataValid = false;
      } else {
        dateError.style.display = "none";
      }
    } else {
      dateError.style.display = "block";
      this.dataValid = false;
    }
  }

  checktel(telValue) {
    if (/^\+\d{2}\s\d{2}\s\d{4}-\d{4}$/.test(telValue)) {
      this.phoneValid = true;
      telError.style.display = "none";
    } else {
      telError.style.display = "block";
      this.phoneValid = false;
    }
  }

  checkemail(emailValue) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      this.emailValid = true;
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
      this.emailValid = false;
    }
  }

  checksenha(senha1, senha2) {
    if (senha1 === senha2) {
      senhaError.style.display = "none";
      this.senhaValid = true;
    } else {
      senhaError.style.display = "block";
      this.senhaValid = false;
    }
  }
}

document.getElementById("name").addEventListener("input", (event) => {
  form.checkName(event.target.value);
});

document.getElementById("date").addEventListener("input", (event) => {
  form.checkDate(event.target.value);
});

document.getElementById("phone").addEventListener("input", (event) => {
  form.checktel(event.target.value);
});

document.getElementById("email").addEventListener("input", (event) => {
  form.checkemail(event.target.value);
});

const senhaInput = document.getElementById("senha");
const cSenhaInput = document.getElementById("c_senha");

senhaInput.addEventListener("input", (event) => {
  form.checksenha(event.target.value, cSenhaInput.value);
});

cSenhaInput.addEventListener("input", (event) => {
  form.checksenha(senhaInput.value, event.target.value);
});

class SaveData {
  saveInfo() {
    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === userData.email);
    if (emailExists) {
      window.alert("Já existe alguém cadastrado com esse usuário");
      return;
    }
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("token", generateToken());
    return true;
  }
}

function generateToken(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

const form = new Form();

const submittedform = document.getElementById("registrationForm");
submittedform.addEventListener("submit", (event) => {
  form.checkName(document.getElementById("name").value);
  form.checkDate(document.getElementById("date").value);
  form.checktel(document.getElementById("phone").value);
  form.checkemail(document.getElementById("email").value);
  form.checksenha(
    document.getElementById("senha").value,
    document.getElementById("c_senha").value
  );

  if (
    !form.nameValid ||
    !form.dataValid ||
    !form.phoneValid ||
    !form.emailValid ||
    !form.senhaValid
  ) {
    event.preventDefault();
    window.alert("Informações Inválidas");
  } else {
    const data = new SaveData();
    const success = data.saveInfo();

    if (!success) {
      event.preventDefault();
    }
  }
});
