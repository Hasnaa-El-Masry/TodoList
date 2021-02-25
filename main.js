// ======= selectors :

let todoInp = document.getElementById("todoInp");
let addBut = document.getElementById("addBut");
let todoList = document.getElementById("todoList")
let selectTodos = document.getElementById("selectNote")


// ======== check todos in localStorage:

let todos;

if (localStorage.getItem("todos") === null) {
    todos = [];
} else {
    todos = JSON.parse(localStorage.getItem("todos"));
}

// ======= Eventlistener :


addBut.addEventListener("click", function (e) {

    e.preventDefault();

    createNote();

    todoInp.value = "";
});

todoList.addEventListener("click", function (e) {
    checkTodos(e);
});

selectTodos.addEventListener("click", function (e) {
    filterTodo(e);
});

// ======= Functions :

// === create :
function createNote() {

    let todo = document.createElement("div");
    todo.classList.add("todo");

    let todoText = document.createElement("li");
    todoText.classList.add("todo-text");

    todoText.innerText = todoInp.value;

    todo.appendChild(todoText);

    saveLocalTodos(todo.innerText);

    let checkBut = document.createElement("button");
    checkBut.classList.add("check-button");

    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fas", "fa-check");
    checkBut.setAttribute("id", "checkBut")

    checkBut.appendChild(checkIcon);
    todo.appendChild(checkBut);

    let trashBut = document.createElement("button");
    trashBut.classList.add("trash-button");

    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash");

    trashBut.appendChild(trashIcon);
    todo.appendChild(trashBut);


    let editBut = document.createElement("button");
    editBut.classList.add("edit-button");

    let editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");

    editBut.appendChild(editIcon);
    todo.appendChild(editBut);

    todoList.appendChild(todo);

}

// === check and delete Todos :
function checkTodos(e) {

    const item = e.target;

    const todoItem = item.parentElement;

    if (item.classList[0] === "trash-button") {

        todoItem.classList.add("fall");

        todoItem.addEventListener("transitionend", function () {
            todoItem.remove()
        });

        todos.splice(todoItem.innerText, 1);
        localStorage.setItem("todos", JSON.stringify(todos))

    }

    if (item.classList[0] === "check-button") {

        todoItem.classList.toggle("completed");
        item.classList.toggle("checked");

    }

    if (item.classList[0] === "edit-button") {

        todoItem.innerHTML = `<input type='text' id='editInput' class='edit-input' value='${todoItem.innerText}'>` + " <button class='save-button'>save</button>";
    }

    if (item.classList[0] === "save-button") {

        let editedText = document.getElementById("editInput").value;

        todoItem.innerHTML = `

        <li class='todo-text'>${editedText}</li> 
        <button class='check-button'>
           <i class='fas fa-check'></i>
        </button>
        <button class='trash-button'>
           <i class='fas fa-trash'></i>
        </button>
        <button class='edit-button'>
           <i class='fas fa-edit'></i>
        </button>`;


        let todosLi = Array.from(todoList.children);
        let todoIndex = todosLi.indexOf(todoItem);
        todos[todoIndex] = editedText;

        localStorage.setItem("todos", JSON.stringify(todos))

    }

}

// === select notes :
function filterTodo(e) {

    const todos = Array.from(todoList.children);

    todos.forEach(function (todo) {


        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                } break;
        }

    });


}

// ======== Local stroage :
function saveLocalTodos(todo) {

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos))

}

// ======== Display todos :
function displayTodos() {

    for (let i = 0; i < todos.length; i++) {

        let todo = document.createElement("div");
        todo.classList.add("todo");

        let todoText = document.createElement("li");
        todoText.classList.add("todo-text");

        todoText.innerText = todos[i];

        todo.appendChild(todoText);

        let checkBut = document.createElement("button");
        checkBut.classList.add("check-button");

        let checkIcon = document.createElement("i");
        checkIcon.classList.add("fas", "fa-check");
        checkBut.setAttribute("id", "checkBut")

        checkBut.appendChild(checkIcon);
        todo.appendChild(checkBut);

        let trashBut = document.createElement("button");
        trashBut.classList.add("trash-button");

        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fas", "fa-trash");

        trashBut.appendChild(trashIcon);
        todo.appendChild(trashBut);

        let editBut = document.createElement("button");
        editBut.classList.add("edit-button");

        let editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit");

        editBut.appendChild(editIcon);
        todo.appendChild(editBut);

        todoList.appendChild(todo);


    }
}

displayTodos()