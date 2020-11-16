const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// SCHEMA DA DATABASE
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  nome: { type: String, required: true },
});

// MODEL USADO PARA CRUD
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body; // FORMULARIO
    this.errors = []; // ERROS
    this.user = null; // USER
  }

  async loginUser() {
    this.validate() // VALIDA OS DADOS
    if (this.errors.length > 0) return; // SE HOUVER ERRO RETORNA
    this.user = await LoginModel.findOne({ email: this.body.email }); // RECEBE O USER NA DATABASE A PARTIR DO EMAIL --> O CONTROLLER VAI SETTAR O USER NA SESSION

    if (!this.user) { // SE NÃO HOUVER O EMAIL, RETORNA
      this.errors.push("Usuário ou senha inválidos. u");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) { // COMPARAÇÃO DE HASHES
      this.errors.push("Usuário ou senha inválidos. s");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validate() // VALIDA OS DADOS
    await this.userExists(); // CHECA SE O EMAIL JA FOI CADASTRADO

    if (this.errors.length > 0) return; // SE HOUVER ALGUM ERRO, RETORNA E ELE APARECE NA TELA
    const salt = bcryptjs.genSaltSync(); // SALT PARA HASH DE SENHA
    this.body.password = bcryptjs.hashSync(this.body.password, salt); // HASH GERADO
    this.user = await LoginModel.create(this.body); // USER RECEBE O USER CRIADO NA DB
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email }); // PROCURA NO MONGO SE HÁ O EMAIL CADASTRADO

    if (this.user) this.errors.push('E-mail já cadastrado')
  }

  validate() {
    this.cleanUp();

    // VALIDA O EMAIL
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail Inválido')

    // VALIDA O TAMANHO DA SENHA E DO NOME
    if (this.body.password.length < 3 || this.body.password.length >= 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }

      // GARANTE QUE HAVERÁ TODOS OS DADOS, SE FOREM VALIDOS
      this.body = {
        email: this.body.email,
        password: this.body.password,
        nome: this.body.nome
      }
    }
  }
}

module.exports = Login;