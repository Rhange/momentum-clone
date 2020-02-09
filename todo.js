const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finishedList"),
  finishedButton = document.querySelector(".js-finished-button");

const TODOS_LS = "toDos",
  FINISHED_LS = "finisheds";

let toDos = [],
  finisheds = [];

function handleClick() {
  const finishedBox = document.querySelector(".js-finishedBox");
  if (finishedBox.classList.length === 2) {
    finishedBox.classList.add("finishedShow");
  } else {
    finishedBox.classList.remove("finishedShow");
  }
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinisheds = finisheds.filter(function(finished) {
    return finished.id !== parseInt(li.id);
  });
  finisheds = cleanFinisheds;
  saveFinisheds();
}

function finishToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.querySelector("span");
  li.parentNode.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();

  paintFinished(text.innerText);
}

function saveFinisheds() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = new Date().getTime();
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };
  finisheds.push(finishedObj);
  saveFinisheds();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const clickBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = new Date().getTime();
  clickBtn.innerText = "✔";
  clickBtn.addEventListener("click", finishToDo);
  span.innerText = text;
  li.appendChild(clickBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS),
    loadedFinisheds = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinisheds !== null) {
    const parsedFinisheds = JSON.parse(loadedFinisheds);
    parsedFinisheds.forEach(function(finished) {
      paintFinished(finished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  finishedButton.addEventListener("click", handleClick);
}

init();
