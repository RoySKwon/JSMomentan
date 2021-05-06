const form = document.querySelector(".js-to-do");
const input = document.querySelector(".js-add-to-do");
const list = document.querySelector(".js-list");

// const toDos = [];
let toDos = [];

form.addEventListener("submit", onSubmit);

//String to JSON,  set Local Storage
function persistToDos() {
  const stringToDo = JSON.stringify(toDos);
  localStorage.setItem("toDos", stringToDo);
}

function saveToDo(text) {
  const toDoObj = {
    id: toDos.length + 1,
    value: text,
  };
  toDos.push(toDoObj);
  persistToDos();
}

function handleDelete(event) {
  const target = event.target;
  const li = target.parentElement;
  const ul = li.parentElement;
  const toDoId = li.id;

  ul.removeChild(li);

  //filter 사용해서 toDo List 갱신
  toDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(toDoId);
  });

  persistToDos();
  return;
}

function onSubmit(event) {
  event.preventDefault();

  const value = input.value;
  input.value = "";
  addToDo(value);
}

function addToDo(text) {
  const toDo = document.createElement("li");
  toDo.className = "toDo";
  toDo.id = toDos.length + 1;

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "toDo_Delete_button";
  deleteBtn.innerHTML = "✔";
  deleteBtn.addEventListener("click", handleDelete);

  const label = document.createElement("label");
  label.innerHTML = text;

  toDo.appendChild(deleteBtn);
  toDo.appendChild(label);
  list.appendChild(toDo);

  saveToDo(text);
}

//load todo list from Local Storage
function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      addToDo(toDo.value);
    });
  }
  return;
}

function init() {
  loadToDos();
}

init();
