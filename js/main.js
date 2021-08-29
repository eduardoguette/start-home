const button = document.querySelector("button");
const input = document.querySelector("#query");
let user;

(function () {
  if (localStorage.getItem("fav")) {
    document.querySelector("#favorito").setAttribute("aria-selected", true);
    document.querySelector("#favorito svg").classList.add("text-white");
    const api = JSON.parse(localStorage.getItem("fav"));
    document.querySelector(".wallpaper").style = `${api.wallpaper}`;
    document.querySelector(".quote").innerHTML = `${api.quote} `;
    document.querySelector("#info-wallpaper").innerHTML = `${api.info}`;
  } else {
    getWallpaper();
    getQuote();
  }
})();

button.addEventListener("click", () => {
  if (
    document.querySelector("#favorito").getAttribute("aria-selected") ===
    "false"
  ) {
    getWallpaper();
    getQuote();
  }
});

const form = document.getElementById("form");
form.addEventListener("submit", handleForm);
function handleForm(e) {
  e.preventDefault();
  window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
  e.target.reset();
}
input.addEventListener("input", (e) => {
  getSugs(e.target.value);
});

async function getSugs(query) {
  const url = `https://www.google.com/complete/search?q=${query}&cp=5&client=gws-wiz&xssi=t&hl=es`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
  } catch (e) {
    console.log(e);
  }
}

function addWallpaper(image) {
  const wallpaper = document.querySelector(".wallpaper");

  wallpaper.className = "wallpaper animate__animated animate__fadeIn";
  wallpaper.style = `
  background: url('${image.file}') center center no-repeat;
  background-size: cover;
  `;
  setTimeout(() => {
    wallpaper.className = "wallpaper";
  }, 1000);
  const author = document.querySelector("#author");
  author.textContent = image.photographer;
  author.href = image.photographer_page;

  const location = document.querySelector("#location");
  location.textContent = image.location;
}

async function getWallpaper() {
  const url = "https://unsplash.muetab.com/images/random?quality=medium";
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
  let o = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
    hour12: false,
  });
  let date = new Intl.DateTimeFormat("es", {
    dateStyle: "long",
  });
  const hour = o.format(Date.now());
  const rootClock = document.querySelector(".clock");

  rootClock.innerHTML = `
    <h1 class="font-semibold text-7xl md:text-9xl">${hour}</h1>
    <p class="text-center sm:text-xl mb-6">${date.format(Date.now())}</p>
  `;
}
addTime();
setInterval(() => {
  addTime();
}, 60000);

function addQuote(data) {
  const rootQuote = document.querySelector(".quote");
  rootQuote.innerHTML = `
    <h2 class="text-lg font-medium animate__animated animate__flipInX">${
      data.text
    }</h2>
    <small class="text-md animate__animated animate__flipInX">${
      data.author || "Unknown"
    }</small>
  `;
}

async function getQuote() {
  const url = "./data/quotes.json";
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const quote = Math.floor(Math.random() * data.length);

    addQuote(data[quote]);
  } catch (e) {
    console.log(e);
  }
}

function sayHello() {
  const nameUser = document.querySelector("#name-user");
  user = localStorage.getItem("name-user");
  nameUser.addEventListener("input", setNameUser);
  const rootSay = document.querySelector(".say");
  const date = new Date();
  const options = {
    dayPeriod: "long",
  };
  let result = new Intl.DateTimeFormat("en-US", options).format(date);
  if (result.includes("morning")) {
    rootSay.innerHTML = `<h2 class="text-white text-center font-sistema text-xl md:text-4xl">Buenos días${
      user?.length >= 1 ? ", " + user : ""
    }</h2>;
 `;
  } else if (
    result.includes("afternoon") ||
    result.includes("evening") ||
    result.includes("noon")
  ) {
    rootSay.innerHTML = `<h2 class="text-white text-center font-sistema text-xl md:text-4xl">Buenas tardes${
      user?.length >= 1 ? ", " + user : ""
    }</h2 >`;
  } else if (result.includes("night")) {
    rootSay.innerHTML = `<h2 class="text-white text-center font-sistema text-xl md:text-4xl">Buenas noches${
      user?.length >= 1 ? ", " + user : ""
    }</h2>`;
  }
}
function setNameUser(e) {
  localStorage.setItem("name-user", e.target.textContent.trim());
  sayHello();
}
