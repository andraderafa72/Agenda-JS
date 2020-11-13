const Login = require('../models/loginModel');

exports.index = (req, res, next) => {
  res.render('register')
}

exports.send = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register(); // Registra o usuario --> loginModel

    if (login.errors.length > 0) {
      req.flash('errors', login.errors); // cria a mensagem auto destrutiva 'errors'
      req.session.save(function() {
        return res.redirect('/register/index'); // se houver erro, reload
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso'); // cria a mensagem auto destrutiva 'succes'
    req.session.save(function() {
      return res.redirect('/login/index'); // se for registrado, redireciona a pagina de login
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}