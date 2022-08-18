todo=[
    {text: "Пообедать", done: true, color:"yellow"},
    {text: "Сделать практику", done: false},
]

let selectedItem = null;

window.onload = ()=>{
    render(todo, document.getElementById("my-todo-list"));
    const ol = document.getElementById("my-todo-list");
    ol.addEventListener("click", function (e) {
        if(e.target.tagName === "LI"){
            for(let item of todo){
                if(item.text===e.target.innerText){
                    item.checked = true;
                }
                if(selectedItem != null && item.text === selectedItem.innerText){
                    item.checked = false;
                }
            }
            selectedItem = e.target;
            render(todo, document.getElementById("my-todo-list"));
        }
    });
}


function changeItem(){

}

function addItem(){
    const newItem = prompt("Какое дело еще нужно сделать?");
    todo.push({text: newItem});
    render(todo, document.getElementById("my-todo-list"))
}

function deleteItem(){
    if(selectedItem != null){
        todo.forEach(function(item, index, object) {
            if (item.text === selectedItem.innerText) {
                object.splice(index, 1);
            }
        });
    }
    render(todo, document.getElementById("my-todo-list"));
}

function up(){

}

function down(){

}

function render(todo, elem){
    elem.innerText = "";
    for(let todoItem of todo){
        const li = document.createElement("li");
        li.innerText = todoItem.text;
        if(todoItem.hasOwnProperty("color")){
            li.style.backgroundColor = todoItem.color;
        }
        if(todoItem.checked){
            li.style.backgroundColor = "red";
        }
        elem.append(li);
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if(todoItem?.done){
            checkbox.setAttribute("checked", "true");
        }
        li.append(checkbox);
    }
}