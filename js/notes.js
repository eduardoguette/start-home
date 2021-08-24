(function () {
  let toDos;
  localStorage.getItem("notes")
    ? (toDos = JSON.parse(localStorage.getItem("notes")))
    : (toDos = []);

  const btnNewNote = document.querySelector("#new-note");
  btnNewNote.addEventListener("click", addNote);
  function addNote() {
    const note = {};

    const idNote = Date.now();

    note.id = idNote;

    closeToolTip();
    const notes = document.querySelector("#notes");

    const wrapperNote = document.createElement("div");
    wrapperNote.className =
      "note px-3 flex items-center space-x-3 animate__animated  animate__flipInX";
    wrapperNote.dataset.id = idNote;
    const inputNote = document.createElement("input");
    inputNote.type = "checkbox";
    inputNote.id = "note";

    inputNote.onchange = (e) => {
      e.target.classList.toggle("checked");
    };

    const divContentNote = document.createElement("div");
    divContentNote.contentEditable = true;
    divContentNote.setAttribute("placeholder", "To-do");
    divContentNote.className =
      "outline-none focus:ring focus:ring-indigo-300 hover:bg-gray-100 w-64  max-w-full rounded px-2 py-1 block";
    divContentNote.onkeydown = (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        e.target.textContent.trim().length > 0 && addNote();
      }
      countNotes();
    };

    divContentNote.addEventListener("input", (e) => {
      catchNote(wrapperNote);
    });

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
      <ul class="absolute bg-white hidden overflow-hidden rounded-md shadow-sm  -left-44 -top-7 border " aria-expanded="false">
        <li>
          <button id="btn-copy" class=" py-2 w-44 px-3 text-left flex items-center gap-2 text-sm hover:bg-indigo-400 hover:text-white">
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
        <button id="btn-delete" class=" py-2 w-full px-3 text-left flex items-center gap-2  text-sm hover:bg-indigo-400 hover:text-white">
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

          <span class="text-xs text-gray-600 block ml-auto">Del</span>
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

    toDos = [...toDos, note];
  }

  function eventsNote(note) {
    note.querySelector("#btn-tooltip").addEventListener("click", (e) => {
      const toggle = e.target.nextElementSibling.getAttribute("aria-expanded");
      closeToolTip();
      if (toggle === "false") {
        e.target.nextElementSibling.setAttribute("aria-expanded", "true");
      } else {
        closeToolTip();
      }
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
        closeToolTip();
      }, 1000);
    });

    /* eliminar nota */

    note.querySelector("#btn-delete").addEventListener("click", () => {
      deleteNote(note);
    });

    note.querySelector("input").addEventListener("input", () => {
      catchNote(note);
    });

    note.querySelector("div[contenteditable]").addEventListener("input", () => {
      catchNote(note);
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
      closeToolTip();
    }
  });

  function closeToolTip() {
    document.querySelectorAll('[aria-expanded="true"]').forEach((elem) => {
      elem.setAttribute("aria-expanded", "false");
    });
  }

  function deleteNote(note) {
    const idDelete = Number(note.dataset.id);

    const notes = JSON.parse(localStorage.getItem("notes")).filter(
      (note) => note.id !== idDelete
    );

    localStorage.setItem("notes", JSON.stringify(notes));

    note.classList.remove("animate__flipInX");
    note.classList.add("animate__flipOutX");
    setTimeout(() => {
      closeToolTip();
      note.remove();
    }, 600);
    countNotes();
  }
  window.onkeydown = ({ code }) => {
    document.querySelectorAll('[aria-expanded="true"]').forEach((elem) => {
      if (code === "Backspace") {
        closeToolTip();
        deleteNote(elem.parentNode.parentElement);
      }
    });
  };

  function countNotes() {
    const toDos = JSON.parse(localStorage.getItem('notes'))
    let totalNotes = 0; 
    toDos.forEach((note) => {
      !note.finish && totalNotes++
    });
     
    const pCant = document.getElementById("cant-notes");
    pCant.textContent = "Tienes " + totalNotes + " pendientes.";
  }

  function catchNote(note) {
    toDos.forEach((elem) => {
      if (elem.id === parseInt(note.dataset.id)) {
        elem.content = note.innerHTML;
        elem.finish = note.querySelector("input").checked;
      }
    });
    localStorage.setItem("notes", JSON.stringify(toDos));
    countNotes()
  }

  function paintNotes() {
    const notes = document.querySelector("#notes");

    toDos.forEach((elem) => {
      const divWrapper = document.createElement("div");
      divWrapper.className =
        "note px-3 flex items-center space-x-3 animate__animated  animate__flipInX";
      divWrapper.dataset.id = elem.id;

      divWrapper.innerHTML = elem.content;

      notes.appendChild(divWrapper);
      
      eventsNote(divWrapper);
      if (elem.finish === true) {
        divWrapper.querySelector("input").setAttribute("checked", true);
      } else {
        divWrapper.querySelector("input").removeAttribute("checked");
      }
    });
    countNotes();
  }
  paintNotes();
})();
