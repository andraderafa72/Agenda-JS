const Login = require('../models/loginModel')

exports.index = (req, res, next) => {
  res.render('login')
}

exports.send = async(req, res) => {
  try {
    const login = new Login(req.body);
    await login.loginUser(); // tenta realizar o login

    if (login.errors.length > 0) {
      req.flash('errors', login.errors); // cria a mensagem auto destrutiva 'errors'
      req.session.save(function() {
        return res.redirect('/login/index'); // Se houver erro, recarrega a pagina
      });
      return;
    }

    req.flash('success', 'Acesso concedido'); // cria a mensagem auto destrutiva 'succes' - flash usado no messages.ejs
    req.session.user = login.user; // Session recebe o usuário para poder ser manipulado no middlewareGlobal
    req.session.save(function() {
      return res.redirect('/login/loged'); // Se houver sucesso, redireciona 
    });
  } catch (error) {
    console.log(error);
    return res.render('404');
  }
}

exports.logout = (req, res) => {
  req.session.destroy(); // destroy o session.user
  res.redirect('/');
}

exports.loged = (req, res, next) => {
  res.render('loged');
}