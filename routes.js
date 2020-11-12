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

// CONTROLADOR DE ROTAS
route.get('/', homePageController.index);

route.get('/login/index', loginController.index);
route.post('/login/send', loginController.send);
route.get('/login/logout', loginController.logout);

route.get('/login/loged', loginController.loged);


route.get('/register/index', registerController.index);
route.post('/register/send', registerController.send)


module.exports = route;