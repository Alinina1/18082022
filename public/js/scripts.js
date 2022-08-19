todo = JSON.parse(localStorage.getItem("myTodo"));

let selectedItem = null;
let ol;

window.onload = ()=>{
    ol = document.getElementById("my-todo-list");
    render(todo, ol);

    ol.addEventListener("click", function (e) {
        if(e.target.tagName === "INPUT"){
            if(e.target.checked){
                e.target.parentElement.classList.add("done");
            }
            else {
                e.target.parentElement.classList.remove("done");
            }
        }
        if(e.target.tagName === "LI"){
            if(selectedItem != null) selectedItem.classList.remove("checkedItem");
            selectedItem = e.target;
            selectedItem.classList.add("checkedItem");
        }
    });
}

function changeItem(){
    if(selectedItem != null){
        document.getElementById("hidden-block").classList.remove("hidden");
    }
}

function addItem(){
    const newItem = prompt("Какое дело еще нужно сделать?");
    if(selectedItem != null){
        const id = +selectedItem.attributes[0].value;
        todo.splice(id+1, 0, {text: newItem});
    }
    else {
        todo.push( {text: newItem});
    }
    render(todo, ol);
}

function deleteItem(){
    if(selectedItem != null){
        let lll = selectedItem.attributes[0].value;
        todo.splice(lll,1);
    }
    render(todo, ol);
}

function up(){
    if(selectedItem!=null){
        const id = selectedItem.previousElementSibling.attributes[0].value;
        const prevItem = todo[id];
        const item = todo[selectedItem.attributes[0].value];
        todo.splice(+selectedItem.previousElementSibling.attributes[0].value, 2, item, prevItem);
        const selector = `li[i="${id}"]`;
        render(todo, ol);
        document.querySelector(selector).click();
    }
}

function down(){
    if(selectedItem!=null){
        const id = selectedItem.nextElementSibling.attributes[0].value;
        const nextItem = todo[id];
        const item = todo[selectedItem.attributes[0].value];
        todo.splice(+selectedItem.attributes[0].value, 2, nextItem, item);
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
        li.setAttribute("i", `${i}`);
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
    localStorage.setItem('myTodo', JSON.stringify(todo));
}

function saveNewValue(e){
    const newValue = e.previousElementSibling.previousElementSibling.value;
    const newColor = e.previousElementSibling.value;
    todo[selectedItem.attributes[0].value].text = newValue;
    todo[selectedItem.attributes[0].value].color = newColor;
    render(todo, ol);
    e.parentElement.classList.add("hidden");
}