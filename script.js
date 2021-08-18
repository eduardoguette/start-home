const button = document.querySelector('button')
button.addEventListener("click", () => {
  getWallpaper();
  getQuote();
})


const form = document.getElementById('form')
form.addEventListener("submit", handleForm)
function handleForm (e){
  e.preventDefault()
  const input = e.target.querySelector('input')
  window.location.href = `https://www.google.com/search?q=${input.value.trim()}`
  e.target.reset()
  
}




const addWallpaper = image => {
  const wallpaper = document.querySelector(".wallpaper");
  wallpaper.style = `
  background: url('${image.file}') center center no-repeat;
  background-size: cover;
  filter: blur(0px) brightness(70%) grayscale(0%);
  position: absolute;
  z-index: -1; 
  `;
  
  const author = document.querySelector('#author')
  author.textContent = image.photographer 
  author.href = image.photographer_page
  
  const location = document.querySelector('#location')
  location.textContent = image.location
  
  
};
getWallpaper();
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

const addTime = () => {
  let o = new Intl.DateTimeFormat("en", {
    timeStyle: "medium"
  });
  let date = new Intl.DateTimeFormat("es" , {
  dateStyle: "full"
  }); 
  const clock = o.format(Date.now()).split(" ")[0];
  const amORpm = o.format(Date.now()).split(" ")[1];
  const rootClock = document.querySelector(".clock");
  rootClock.innerHTML = `
    <h1 class="font-bold text-7xl sm:text-9xl ">${clock}<small class="text-base">${amORpm}</small></h1>
    <p class="text-center sm:text-xl mt-1">${date.format(Date.now())}</p>
  `;
};
setInterval(() => {
  addTime();
}, 1);

const addQuote = data => {
  const rootQuote = document.querySelector(".quote");
  rootQuote.innerHTML = `
    <h2 class="text-xl font-medium">${data.quote}</h2>
    <small class="text-md">${data.author}</small>
  `;
};
getQuote();
async function getQuote() {
  const url = "https://api.muetab.com/quotes/random";
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    addQuote(data);
  } catch (e) {
    console.log(e);
  }
}
