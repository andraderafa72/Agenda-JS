import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './assets/css/style.css';

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