let todo = JSON.parse(localStorage.getItem("myTodo"));
if(todo === undefined){
    todo = [];
}

let selectedItem = null;
let ol;
let inputName, inputColor;

window.onbeforeunload = ()=>{
    saveInLocalStorage();
}

window.onload = ()=>{
    ol = document.getElementById("my-todo-list");
    inputName = document.getElementById("inputName");
    inputColor = document.getElementById("inputColor");
    render(todo, ol);

    ol.addEventListener("click", function (e) {
        e = e.target;
        if(e.tagName === "INPUT"){
            todo[e.parentElement.getAttribute("i")].done = e.checked;
            if(e.checked){
                e.parentElement.classList.add("done");
            }
            else {
                e.parentElement.classList.remove("done");
            }
        }
        if(e.tagName === "LI"){
            if(selectedItem != null) selectedItem.classList.remove("checkedItem");
            selectedItem = e;
            selectedItem.classList.add("checkedItem");
        }
    });
}

function changeItem(){
    if(selectedItem != null){
        inputName.value = todo[getSelectedId()].text;
        inputColor.value = todo[getSelectedId()].color;
        document.getElementById("hidden-block").classList.remove("hidden");
    }
}

function addItem(){
    const newItem = prompt("Какое дело еще нужно сделать?", "Сделать что-то");
    if(newItem === null) return;
    if(selectedItem != null){
        const id = +getSelectedId();
        todo.splice(id+1, 0, {text: newItem});
    }
    else {
        todo.push( {text: newItem});
    }
    render(todo, ol);
}

function deleteItem(){
    if(selectedItem === null) return;
    todo.splice(getSelectedId(),1);
    render(todo, ol);
}

function up(){
    if(selectedItem!=null){
        const id = selectedItem.previousElementSibling.getAttribute("i");
        const prevItem = todo[id];
        const item = todo[getSelectedId()];
        todo.splice(+id, 2, item, prevItem);
        const selector = `li[i="${id}"]`;
        render(todo, ol);
        document.querySelector(selector).click();
    }
}

function down(){
    if(selectedItem!=null){
        const id = selectedItem.nextElementSibling.getAttribute("i");
        const nextItem = todo[id];
        const item = todo[getSelectedId()];
        todo.splice(+getSelectedId(), 2, nextItem, item);
        const selector = `li[i="${id}"]`;
        render(todo, ol);
        document.querySelector(selector).click();
    }
}

function render(todo, elem){
    elem.innerText = "";
    let i = 0;
    for(let todoItem of todo){
        todoItem.i = i;
        const li = document.createElement("li");
        li.innerText = todoItem.text;
        li.setAttribute("i", i.toString());
        if(todoItem.hasOwnProperty("color")){
            li.style.backgroundColor = todoItem.color;
        }
        elem.append(li);
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(todoItem?.done){
            checkbox.setAttribute("checked", "");
            li.classList.add("done");
        }
        li.append(checkbox);
        i++;
    }
}

function saveNewValue(e){
    todo[getSelectedId()].text = inputName.value;
    todo[getSelectedId()].color = inputColor.value;
    render(todo, ol);
    e.parentElement.classList.add("hidden");
}

function getSelectedId(){
    return selectedItem.getAttribute("i");
}

function saveInLocalStorage(){
    localStorage.setItem('myTodo', JSON.stringify(todo));
}