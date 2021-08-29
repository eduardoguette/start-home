function dialog(selector) {
  const element = document.querySelector(selector);

  openers = [...element.querySelectorAll("[data-dialog-open]")];
  openers.forEach((opener) =>
    opener.addEventListener("click", () => showDialog(element))
  );

  closers = [...element.querySelectorAll("[data-dialog-hide]")];
  closers.forEach((closer) =>
    closer.addEventListener("click", (e) => hiddenDialog(e, element))
  );

  options = [...element.querySelectorAll("[data-option]")];
  options.forEach((option) => {
    optionState(element);
    option.addEventListener("click", (e) => optionSelected(e, element));
  });

  element.addEventListener("keydown", (e) => handleKeyDown(e, element));
}
function handleKeyDown(e, element) {
  if (e.key === "Escape")
    element.querySelector("[data-dialog-hide]").setAttribute("hidden", true);
}
function showDialog(element) {
  element.querySelector("[data-dialog-hide]").removeAttribute("hidden");
}
function hiddenDialog(e, element) {
  if (e.target.getAttribute("data-dialog-hide") === "")
    element.querySelector("[data-dialog-hide]").setAttribute("hidden", true);

}

function optionSelected(e, element) {
  const id = e.target.getAttribute("data-option");
  options = [...element.querySelectorAll("[data-option]")];
  options.forEach((option) => option.setAttribute("aria-selected", false));
  e.target.setAttribute("aria-selected", true);
  optionState(element);

  selections = [...element.querySelectorAll("[data-selected]")];
  selections.forEach((selection) => {
    if (id === selection.getAttribute("data-selected")) {
      selection.removeAttribute("hidden");
      return;
    }
    selection.setAttribute("hidden", true);
  });
}

function optionState(element) {
  options = [...element.querySelectorAll("[data-option]")];
  options.forEach((option) => {
    if (option.getAttribute("aria-selected") === "true") {
      option.classList.add("bg-purple-600", "text-white");
      option.classList.remove("hover:bg-gray-200", "hover:text-black");
      option.setAttribute("aria-selected", true);
      return;
    }
    option.setAttribute("aria-selected", false);
    option.classList.add("hover:bg-gray-200", "hover:text-black");
    option.classList.remove("bg-purple-600", "text-white");
  });
}
dialog("#settings");
