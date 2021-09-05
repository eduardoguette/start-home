const btns = [];
document.querySelectorAll("header > div ").forEach((elemento) => {
  const elem = {};
  elem.btn = elemento;
  elem.data = elemento.getAttribute("aria-details");
  btns.push(elem);
});
const root = document.querySelector("header");
function toolTip() {
  const div = document.createElement("div");
  div.className = "tooltip text-xs font-medium mx-2";
  div.style = `
  position: absolute;
  `;
  root.appendChild(div);
  btns.forEach((btn, index) => {
    setTimeout(() => {
      div.textContent = btn.data;
      div.style = `
      position: absolute;
      left: ${btn.btn.getBoundingClientRect().x}px;
      top: 4.5rem;
      background: white;
      color: black;
      border-radius: .25rem;
      padding: .3rem .6rem;
      max-width: min(200px, 100%);
      `;
    }, index * 2000);
  });
  setTimeout(() => {
    div.remove();
    localStorage.setItem("tour", true);
  }, 2000 * 6);
}
if (!localStorage.getItem("tour")) window.onload = toolTip;
