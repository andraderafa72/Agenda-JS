// EXECUTADOS AO INICIAR
exports.errorVariable = (req, res, next) =>{
  res.locals.erros = req.flash('errors');
  res.locals.success = req.flash('success');
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