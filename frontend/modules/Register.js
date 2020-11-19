const validator = require("validator");

export default class Register {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    const nameInput = el.querySelector('input[name="nome"]');
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    const errorName = document.querySelector('.error-name');
    let error;


    if (!validator.isEmail(emailInput.value)) {
      errorEmail.innerHTML = 'E-mail inválido!';
      error = true;
    } else {
      errorEmail.innerHTML = ''
    }

    // VALIDA O TAMANHO DA SENHA E DO NOME
    if (nameInput.value.length < 1 || nameInput.value.length >= 50) {
      errorName.innerHTML = 'O nome precisa ter entre 1 e 50 caractéres!';
      error = true;
    } else {
      errorName.innerHTML = ''
    }

    if (passwordInput.value.length < 3 || passwordInput.value.length >= 50) {
      errorPassword.innerHTML = 'A senha precisa ter entre 3 e 50 caractéres!';
      error = true;
    } else {
      errorPassword.innerHTML = ''
    }

    if (!error) el.submit();
  }
}