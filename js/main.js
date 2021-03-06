import { $, btnReloadWallpaper, input } from './domElements.js';
import { quotes } from '../data/quotes.js';
import '../css/index.css';
import './favorito.js';
import './notes.js';
import './visita-guiada.js';
import './settings.js';

let user;

const start = () => {
  getQuote();
  getWallpaper();
  addTime();
  nameUser();
};

(function () {
  if (localStorage.getItem('fav')) {
    $('#favorito').setAttribute('aria-selected', true);
    $('#favorito svg .fill').classList.add('text-white');
    const api = JSON.parse(localStorage.getItem('fav'));
    $('.wallpaper').style = `${api.wallpaper}`;
    $('.quote').innerHTML = `${api.quote} `;
    $('#info-wallpaper').innerHTML = `${api.info}`;
    addTime();
    nameUser();
    return;
  }
  start();
})();

btnReloadWallpaper.addEventListener('click', () => !JSON.parse($('#favorito').getAttribute('aria-selected')) && start());

const form = document.getElementById('form');
form.addEventListener('submit', handleForm);

function handleForm(e) {
  e.preventDefault();
  window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
  e.target.reset();
}

function addWallpaper(data) {
  const {
    user: {
      links: { html: link_profile },
      first_name,
      location,
    },
    urls: { regular },
  } = data;

  const wallpaper = $('.wallpaper');
  wallpaper.className = 'wallpaper animate__animated animate__fadeIn';
  wallpaper.style = `
  background: url('${regular.replace('1080', '1440')}') center center no-repeat;
  background-size: cover;
  `;
  setTimeout(() => {
    wallpaper.className = 'wallpaper';
  }, 400);
  const author = $('#author');
  author.textContent = first_name;
  author.href = link_profile;

  if (!location) {
    $('.location-wrapper').classList.add('hidden');
  } else {
    $('#location').textContent = location;
  }
}

async function getWallpaper() {
  const url = 'https://api.unsplash.com/photos/random/?client_id=3j0d6XQ7CAPIECX8Srl987CrGxpQLn5g07vL3vgxdco&orientation=landscape&&query=nature';

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    addWallpaper(data);
  } catch (e) {
    console.log(e);
  }
}

function addTime() {
  sayHello();
  let o = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    hour12: false,
  });
  let date = new Intl.DateTimeFormat('es', {
    dateStyle: 'long',
  });
  const hour = o.format(Date.now());
  const rootClock = $('.clock');
  rootClock.innerHTML = `
    <h1 class="font-semibold text-7xl md:text-9xl">${hour}</h1>
    <p class="text-center sm:text-xl mb-6">${date.format(Date.now())}</p>
  `;
}

setInterval(() => {
  addTime();
}, 60000);

function addQuote(data) {
  const rootQuote = $('.quote');
  rootQuote.innerHTML = `
    <h2 class="text-lg font-medium">${data.text}</h2>
    <small class="text-md ">${data.author || 'Unknown'}</small>
  `;
}

function getQuote() {
  const quote = Math.floor(Math.random() * quotes.length);

  addQuote(quotes[quote]);
}

function sayHello() {
  const nameUser = $('#name-user');
  user = localStorage.getItem('name-user');
  nameUser.addEventListener('input', setNameUser);
  const rootSay = $('.say');
  const date = new Date();
  const options = {
    dayPeriod: 'long',
  };
  let result = new Intl.DateTimeFormat('es-ES', options).format(date);
  const userName = user?.length >= 1 ? ', ' + user : '';
  let greeting = 'Buenos d??as';

  if (result.includes('tarde')) {
    greeting = 'Buenas tardes';
  } else if (result.includes('noche')) {
    greeting = 'Buenas noches';
  }
  rootSay.innerHTML = `<h2 class="text-white text-center font-sistema text-xl md:text-4xl">${greeting}${userName}</h2>`;
}
function setNameUser({ target }) {
  localStorage.setItem('name-user', target.textContent.trim());
  sayHello();
}
function nameUser() {
  $('#name-user').textContent = localStorage.getItem('name-user');
}
