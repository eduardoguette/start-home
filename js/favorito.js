(function () {
  const btn = document.querySelector("#favorito");
  btn.addEventListener("click", ({target}) => {
    target.querySelector("svg").classList.toggle("text-white");

    let selected = JSON.parse(target.getAttribute("aria-selected"))
    target.setAttribute("aria-selected", !selected);

    if (localStorage.getItem("fav")) {
      localStorage.removeItem("fav");
      return;
    }
    saveWallpaper();
  });

  function saveWallpaper() {
    const wallpaper = String(
      document.querySelector(".wallpaper").getAttribute("style")
    );
    const quote = document.querySelector(".quote").innerHTML;
    const info = document.querySelector("#info-wallpaper").innerHTML;

    localStorage.setItem(
      "fav",
      JSON.stringify({
        wallpaper,
        quote,
        info,
      })
    );
  }
})();
