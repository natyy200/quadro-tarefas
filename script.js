const columns = document.querySelectorAll('.column__cards');
const cards = document.querySelectorAll('.card');

let draggedCard = "";

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}

// funções para mover os cards, pegar, soltar, etc

const dragOver = (event) => {
    event.preventDefault();
}

const dragEnter = ({target}) => {
    if (target.classList.contains('column__cards')) {
        target.classList.add("column--highlight");
    }
}

const dragLeave = ({target}) => {
        target.classList.remove("column--highlight");
}

const drop = ({target}) => {
        if (target.classList.contains('column__cards')) {
            target.classList.remove("column--highlight");
            target.append(draggedCard);
        }
}

// função para criar card

const createCard = ({target}) => {
    if (!target.classList.contains('column__cards')) return;

    const card = document.createElement("section");

    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable = "false";  
        if (!card.textContent) card.remove();
    });

    card.addEventListener("dragstart", dragStart);

    target.append(card);
    card.focus();
}

// adicionar eventos e drag e drop as colunas

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});