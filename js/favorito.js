import { $ } from '/js/domElements.js';
(function () {
  const btn = $('#favorito');
  btn.addEventListener('click', ({ target }) => {
    target.querySelector('svg .fill').classList.toggle('text-white');

    let selected = JSON.parse(target.getAttribute('aria-selected'));
    target.setAttribute('aria-selected', !selected);

    if (localStorage.getItem('fav')) {
      localStorage.removeItem('fav');
      return;
    }
    saveWallpaper();
  });

 

  function saveWallpaper() {
    const wallpaper = String($('.wallpaper').getAttribute('style'));
    const quote = $('.quote').innerHTML;
    const info = $('#info-wallpaper').innerHTML;

    localStorage.setItem(
      'fav',
      JSON.stringify({
        wallpaper,
        quote,
        info,
      })
    );
  }
})();
