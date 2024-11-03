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
    this.valid = true;
  }

  checkName(nameValue) {
    this.valid = true;
    for (let letra of nameValue) {
      if (!isNaN(letra) && letra !== " ") {
        nameError.style.display = "block";
        this.valid = false;
        break; // Sai do loop se encontrar um erro
      } else if (/[^a-zA-Z0-9À-ÿ\s]/.test(letra)) {
        nameError.style.display = "block";
        this.valid = false;
        break;
      }
    }
  }

  checkDate(dateValue) {
    this.valid = true;
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
      const [year, month, day] = dateValue.split("-").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      const hasHadBirthday =
        today.getMonth() > month - 1 ||
        (today.getMonth() === month - 1 && today.getDate() >= day);

      if (age < 18 || (age === 18 && !hasHadBirthday)) {
        dateError.style.display = "block";
        this.valid = false;
      } else {
        dateError.style.display = "none";
      }
    } else {
      dateError.style.display = "block";
      this.valid = false;
    }
  }

  checktel(telValue) {
    this.valid = true;
    if (/^\+\d{2}\s\d{2}\s\d{4}-\d{4}$/.test(telValue)) {
      telError.style.display = "none";
    } else {
      telError.style.display = "block";
      this.valid = false;
    }
  }

  checkemail(emailValue) {
    this.valid = true;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      emailError.style.display = "none";
    } else {
      emailError.style.display = "block";
      this.valid = false;
    }
  }

  checksenha(senha1, senha2) {
    this.valid = true;
    if (senha1 === senha2) {
      senhaError.style.display = "none";
    } else {
      senhaError.style.display = "block";
      this.valid = false;
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
    localStorage.setItem(document.getElementById("name").value);
    localStorage.setItem(document.getElementById("email").value);
    localStorage.setItem(document.getElementById("senha").value);
  }
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

  if (!form.valid) {
    event.preventDefault();
    window.alert("Informações Inválidas");
  } else{
    const data = new SaveData
    data.saveInfo();
  }
});
