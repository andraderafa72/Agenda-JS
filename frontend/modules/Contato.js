export default class Contato {
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
      this.clean();
      this.validate(e);
    });
  }

  clean() {
    const validator = require("validator");
    const errorEmail = document.querySelector('.error-email');
    const errorTelefone = document.querySelector('.error-telefone');
    const errorSobrenome = document.querySelector('.error-sobrenome');
    const errorName = document.querySelector('.error-nome');
    const errorNone = document.querySelector('.error-none');

    errorName.innerHTML = '';
    errorEmail.innerHTML = '';
    errorSobrenome.innerHTML = '';
    errorNone.innerHTML = '';
    errorTelefone.innerHTML = '';
  }
  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');
    const sobrenomeInput = el.querySelector('input[name="sobrenome"]');
    const nameInput = el.querySelector('input[name="nome"]');

    const validator = require("validator");
    const errorEmail = document.querySelector('.error-email');
    const errorTelefone = document.querySelector('.error-telefone');
    const errorSobrenome = document.querySelector('.error-sobrenome');
    const errorName = document.querySelector('.error-nome');
    const errorNone = document.querySelector('.error-none');

    let error;

    // VALIDA O TAMANHO DO NOME E SOBRENOME
    if (nameInput.value.length < 1 || nameInput.value.length >= 50) {
      errorName.innerHTML = 'O nome precisa ter entre 1 e 50 caractéres!';
      error = true;
    } else {
      errorName.innerHTML = ''
    }

    if (sobrenomeInput.value.length >= 50) {
      errorSobrenome.innerHTML = 'O sobrenome precisa ter entre 1 e 50 caractéres!';
      error = true;
    } else {
      errorSobrenome.innerHTML = ''
    }

    // VALIDA O TELEFONE E EMAIL
    if (!telefoneInput.value && !emailInput.value) {
      errorNone.innerHTML = 'Algum meio de contato precisa ser cadastrado!';
      error = true;
    }
    if (telefoneInput.value) {
      if (telefoneInput.value.length < 8 || telefoneInput.value.length >= 20) {
        errorTelefone.innerHTML = 'O telefone precisa ter pelo menos 8 digitos!';
        error = true;
      } else {
        errorTelefone.innerHTML = ''
      }
    }
    if (emailInput.value) {
      if (!validator.isEmail(emailInput.value)) {
        errorEmail.innerHTML = 'E-mail inválido!';
        error = true;
      } else {
        errorEmail.innerHTML = ''
      }
    }
    if (!error) el.submit();
  }
}