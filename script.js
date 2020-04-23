let task = [];
function init(){
    if(localStorage.getItem('task')){
        console.log(localStorage.getItem('task'));
        task = JSON.parse(localStorage.getItem('task'));
    }
    else{
        task = [];
    }
    display();
}

function changeHandler(){
    let input = document.getElementById("taskAction");
    if(input.value.length>0){
        document.getElementById("add").onclick=Add;
        document.getElementById("add").innerText="Add"
    }
    else{
        document.getElementById("add").onclick=Cancel;
        document.getElementById("add").innerText="Cancel"
    }
}
function addHandler() {
    document.getElementById("newbutton").style.display = "none";
    document.getElementById("newtask").style.display = "flex";
    document.getElementById("taskAction").value="";
    document.getElementById("add").onclick=Cancel;
    document.getElementById("add").innerText="Cancel"
}
function Add() {
    let action = document.getElementById("taskAction").value;
    let json = {
        value: action,
        completed: false
    }
    task.push(json);
    document.getElementById("newtask").style.display = "none";
    document.getElementById("newbutton").style.display = "block";
    display();
}
function Cancel(){
    document.getElementById("newtask").style.display = "none";
    document.getElementById("newbutton").style.display = "block";
}
function complete(id) {
    console.log(!task[id].completed)
    task[id].completed = !task[id].completed;
    display();
}

function remove(id) {
    task.splice(id, 1);
    display();
}
function display() {
    localStorage.setItem('task',JSON.stringify(task));
    let list = document.getElementById("tasklist");
    let listItems = "";
    for (let i = 0; i < task.length; i++) {
        let data = `<div class="task"><p>${task[i].value}</p><button onclick="remove(${i})"><span class="material-icons">
        clear
        </span></button><button onclick="complete(${i})"><span class="material-icons">
        done
        </span></button></div>`;
        if (task[i].completed)
            data = `<div class="task complete"><p>${task[i].value}</p><button onclick="remove(${i})"><span class="material-icons">
            clear
            </span></button><button onclick="complete(${i})"><span class="material-icons">
            done
            </span></button></div>`
        listItems = listItems + data;
    }
    list.innerHTML = listItems;
}
