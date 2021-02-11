const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelectorAll(".list-group")[0];
const filter = document.querySelector("#filter");
const clearBottom = document.querySelector("#clear-todos");
const firsCardBody = document.querySelectorAll(".card-body")[0];
const lastCardBody = document.querySelectorAll(".card-body")[1];
const deleteALert = document.querySelectorAll(".list-group")[1];

eventListener();

//eventListener(); bunu açabilirim ama gerek yok çünkü constractor function olarak da tanımlayabiliyoruz

function eventListener() {
    form.addEventListener("submit", addTodo);
    clearBottom.addEventListener("click", deleteAlltodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    lastCardBody.addEventListener("click", delTodo);
    filter.addEventListener("keyup", filterTodos)
}
function filterTodos(e) {
    const eTarget = e.target.value.toLowerCase().trim();
    const listItems = document.querySelectorAll(".list-group-item");//burada list itemların hepsini tutuyor 
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase().trim();
        if (text.indexOf(eTarget) === -1) {
            //eğer içersinde bulamıyorsan -1 dönüyor bulamıyor yani indexofun özelliği bu yani burada biz style da göstermeyeceğiz
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display : block");//burada eğer indexofları uyuşuyor ise ekranda gösterir
        }
    });

}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUı(todo);
    });
}
function delTodo(e) {
    if (e.target.className === "fa fa-remove") {
        var selectvalue = e.target.parentElement.parentElement.textContent;
        e.target.parentElement.parentElement.remove();
        deleteFromStoregaTodo(selectvalue);
        showAlert("success", `Todo  başarıyla silindi`, firsCardBody);
    }
    e.preventDefault();
}
function deleteFromStoregaTodo(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
function deleteAlltodo() {

    if (localStorage.getItem("todos") === null) {
        showAlert("danger", "Silinecek todo yok", deleteALert);
    }
    else {
        showAlert("success", "Tüm alanlar silindi", deleteALert);
        localStorage.removeItem("todos");
        removeElementsByClass("list-group-item");
    }

}
function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addTodo(e) {
    const value = todoInput.value.trim();
    if (value === "") {
        showAlert("danger", "Bu alanı Boş bırakamazsınız.", firsCardBody);
    }
    else {
        showAlert("success", "Todo Eklendi", firsCardBody)
        addTodoToUı(value);//giden value değer örnek veriyorumy yazdığımız yazı değil mi 
        //ad todotouı anlık documana sayfayı yenilememe sebep oluyor aslında bunu yazmadan direkt olarak
        //sayfayı yenileyek bir code yazarsan ilerdeki prohelerde ki bu zaman kaybı olabkir
        //bunun else de kullanmadan gerek yok
        addTodoStorage(value);

    }

    e.preventDefault();
}
function getTodosFromStorage() { //storgedan bütün todoları almış olacak
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoStorage(value) {
    let todos = getTodosFromStorage();
    todos.push(value);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function showAlert(type, mesaage, classs) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = `${mesaage}`;
    classs.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 2000);

}
function addTodoToUı(value) {
    //list item oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class ='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(value));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}
