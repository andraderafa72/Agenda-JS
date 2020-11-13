const Contato = require('../models/contatoModel');

exports.index = (req, res) => {
  res.render('contato', { contato: {} });
}

exports.send = async(req, res) => {
  try {
    const contato = new Contato(req.body)
    await contato.register()

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => { res.redirect('/contato/index') });
      return;
    }

    req.flash('success', 'Contato registrado com sucesso!');
    req.session.save(() => { res.redirect(`/`) });
    return;
  } catch (error) {
    console.log(error);
    res.render('404')
  }
}

exports.editIndex = async(req, res) => {
  if (!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);
  if (!contato) return res.render('404');

  res.render('edit', { contato: contato })
}

exports.edit = async(req, res) => {
  if (!req.params.id) return res.render('404');

  try {
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => { res.redirect('/contato/index') });
      return;
    }

    req.flash('success', 'Contato editado com sucesso!');
    req.session.save(() => res.redirect(`/contato/edit/${contato.contato._id}`));
    return;
  } catch (error) {
    console.log(error);
    res.render('404')
  }

}

exports.delete = async function(req, res) {
  if (!req.params.id) return res.render('404');
  try {
    await Contato.deletePorId(req.params.id);
    req.flash('success', 'Contato removido!');
    res.redirect('/')
  } catch (error) {
    console.log(error);
  }
  return;
}