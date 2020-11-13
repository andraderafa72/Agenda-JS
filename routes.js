/*
 * A ROTA ESCOLHE O CONTROLLER, 
 * E O CONTROLLER ESCOLHE O MODEL E A VIEW QUE VAI RENDERIZAR 
 */

const express = require('express');
const route = express.Router();

// IMPORTAÇÃO DE CONTROLLERS
const homePageController = require('./src/controllers/homePageController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/globalMiddleware')

// CONTROLADOR DE ROTAS
route.get('/', homePageController.index);

route.get('/login/index', loginController.index);
route.post('/login/send', loginController.send); // Envio do formulário de login
route.get('/login/logout', loginController.logout); // Assim que desloga
route.get('/login/loged', loginController.loged); // Tela de logado

route.get('/register/index', registerController.index);
route.post('/register/send', registerController.send) // Envio do formulário de registro

route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/send', loginRequired, contatoController.send)

route.get('/contato/edit/:id', loginRequired, contatoController.editIndex)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

route.post('/contato/edit/:id', loginRequired, contatoController.edit)

module.exports = route;