(function () {
  const btnNewNote = document.querySelector("#new-note");
  btnNewNote.addEventListener("click", addNote);

  function addNote() {
    const notes = document.querySelector("#notes");

    const wrapperNote = document.createElement("div");
    wrapperNote.className =
      "note px-3 flex items-center space-x-3 animate__animated  animate__flipInX";

    const inputNote = document.createElement("input");
    inputNote.type = "checkbox";
    inputNote.id = "note";

    inputNote.onchange = (e) => {
      e.target.classList.toggle("checked");
    };

    const divContentNote = document.createElement("div");
    divContentNote.contentEditable = true;
    divContentNote.className =
      "outline-none focus:ring focus:ring-indigo-300 hover:bg-gray-100 w-64 break-all  max-w-full rounded px-2 py-1 block";
    divContentNote.onkeydown = (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        e.target.textContent.trim().length > 0 && addNote();
      }

      countNotes();
    };

    const divToolTip = document.createElement("div");
    divToolTip.className = "relative";
    divToolTip.innerHTML = `
      <button id="btn-tooltip" class="hover:bg-gray-200 rounded-md p-2">
        <svg class="pointer-events-none xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="24"
          height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
        </svg>
      </button>
      <ul class="absolute bg-white hidden overflow-hidden rounded-md shadow-sm  -left-28 -top-7 border " tooltip-expanded="false">
        <li>
          <button id="btn-copy" class=" py-2 w-28 px-3 text-left flex items-center space-x-2 text-sm hover:bg-indigo-400 hover:text-white">
            <svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-paperclip" width="16"
              height="16"  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
              stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5">
              </path>
            </svg>
            <span class="pointer-events-none">
              Copiar
            </span>
            <span class="copied pointer-events-none hidden">
              Copiado!
            </span>
          </button>
        </li>
      <li>
        <button id="btn-delete" class=" py-2 w-28 px-3 text-left flex items-center space-x-2  text-sm hover:bg-indigo-400 hover:text-white">
          <svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
         </svg>
          <span class="pointer-events-none">

            Eliminar

          </span>

        </button>
         
      </li>
    </ul> 

    `;

    wrapperNote.appendChild(inputNote);
    wrapperNote.appendChild(divContentNote);
    wrapperNote.appendChild(divToolTip);

    notes.appendChild(wrapperNote);
    countNotes();
    eventsNote(wrapperNote);
    divContentNote.focus();
  }

  function countNotes() {
    let totalNotes = 0;
    const notes = document.querySelectorAll("#note");
    notes.forEach((note) => {
      if (note.nextElementSibling.textContent.trim().length > 0) totalNotes++;
      if (note.checked) totalNotes--;
    });
    const pCant = document.getElementById("cant-notes");
    pCant.textContent = "Tienes " + totalNotes + " pendientes.";
    document.querySelector('#total-notes').textContent = totalNotes
  }

  function eventsNote(note) {
    note.querySelector("#btn-tooltip").addEventListener("click", (e) => {
      document
        .querySelectorAll("#btn-tooltip")
        .forEach((elem) => elem.nextElementSibling.classList.add("hidden"));
     
      e.target.nextElementSibling.classList.toggle("hidden");
    });

    /* copiar nota */

    note.querySelector("#btn-copy").addEventListener("click", (e) => {
      const nota =
        e.target.parentNode.parentNode.parentNode.parentNode.querySelector(
          "div[contenteditable]"
        ).textContent;
      e.target.querySelectorAll("span")[0].classList.add("hidden");
      e.target.querySelectorAll("span")[1].classList.remove("hidden");
      copyNote(nota);

      setTimeout(() => {
        e.target.querySelectorAll("span")[0].classList.remove("hidden");
        e.target.querySelectorAll("span")[1].classList.add("hidden");
      }, 1000);
    });

    /* eliminar nota */

    note.querySelector("#btn-delete").addEventListener("click", () => {
      note.classList.remove("animate__flipInX");
      note.classList.add("animate__flipOutX");
      setTimeout(() => {
        note.remove();
      }, 600);
      countNotes();
    });
    note.querySelector("input").addEventListener("input", () => {
      countNotes();
    });
  }
  async function copyNote(nota) {
    try {
      await navigator.clipboard.writeText(nota);
    } catch (e) {
      console.log(e);
    }
  }
  document.querySelector("header").addEventListener("click", (e) => {
    if (e.target.matches(".btn-notes-list")) {
      document.querySelector(".notes-list__list").classList.toggle("hidden");
    }
    if (e.target.id === "btn-tooltip") {
      // e.target.nextElementSibling.classList.toggle("hidden");
    }
  });
})();
