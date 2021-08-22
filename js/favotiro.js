(function () {
  const btn = document.querySelector("#favorito");
  btn.addEventListener("click", (e) => {
    e.target.querySelector("svg").classList.toggle("text-white");
    if (e.target.getAttribute("aria-selected") === "false") {
      e.target.setAttribute("aria-selected", true);
    } else {
      e.target.setAttribute("aria-selected", false);
    }
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
