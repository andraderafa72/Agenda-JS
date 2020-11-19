import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

import Login from './modules/Login';
import Register from './modules/Register';
import Contato from './modules/Contato';

const login = new Login('.form-login');
const register = new Register('.form-register');
const contato = new Contato('.form-contato');
const editContato = new Contato('.form-edit-contato');

// em caso do bootstrap.js não iniciar
const nav = document.querySelector('#nav-menu');
const menu = document.querySelector('#navbarSupportedContent')
nav.addEventListener('click', () => {
  if (menu.classList.contains('collapse')) {
    menu.classList.remove('collapse');
    menu.classList.add('collapsed');
  } else {
    menu.classList.remove('collapsed');
    menu.classList.add('collapse');
  }
})

login.init()
register.init()
contato.init()
editContato.init()