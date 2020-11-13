const Contato = require('../models/contatoModel')

// RENDERIZA A PAGINA INICIAL
exports.index = async(req, res, next) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
}