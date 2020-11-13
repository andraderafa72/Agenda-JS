// EXECUTADOS AO INICIAR
exports.errorVariable = (req, res, next) => {
  res.locals.erros = req.flash('errors'); // variavel de erros de login
  res.locals.success = req.flash('success'); // variavel de sucesso de login
  res.locals.user = req.session.user; // variavel de usuário
  next();
}

// GERAR TOKEN AO CARREGAR
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

// TRATAR ERRO
exports.checkCSRFError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }
}

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'você precisa fazer login');
    req.session.save(() => { res.redirect('/') });
    return;
  }
  next();
}