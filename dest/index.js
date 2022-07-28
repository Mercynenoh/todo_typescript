"use strict";
let tasks = document.getElementById("pending");
let buttontitle = "Add";
let inputField = document.getElementById("inputField");
let inputField_two = document.getElementById("inputField_two");
let inputField_three = document.getElementById("inputField_three");
let submit = document.getElementById("my-form");
let btn1 = document.getElementById("sub"); //update//
let btn = document.getElementById("sub1"); //add//
class _task {
    constructor() {
        this.taskArr = [];
    }
    createTask(todo) {
        this.taskArr.push(todo);
        this.displayTasks();
    }
    getTasks() {
        return this.taskArr;
    }
    getTaskById(id) {
        return this.taskArr.find((task) => task.id === id);
    }
    deleteTask(id) {
        this.taskArr.splice(id, 1);
        this.displayTasks();
    }
    displayTasks() {
        const completedContainer = document.querySelector("#pending");
        completedContainer.innerHTML = '<h1>Pending Tasks</h1>';
        const html = this.taskArr.map((task, index) => `
                    <div class='task'>
                      <h2>${task.title}</h2>
                      <h4>${task.desc}</h4>
                      <p> Due On: ${task.duedate}</p>
                    </div>
                    <button onclick="updateTask(${index})" class="update">Update</button>
                    <button onclick="removeTask(${index})" class="delete">Delete</button>
                    <form>
                    <p><input type="checkbox" id="checked"> Completed? </p>
                    <button type="button" id="checkbox" onclick="completeTask(${index})">Yes</button>
                    <button type="button" class="uncheck" onclick="uncheck()">No</button>
                  </form>
                  `).join("");
        completedContainer.innerHTML += html;
    }
}
class Completed extends _task {
    constructor() {
        super();
        this.completedTasks = [];
    }
    completedTask(todo) {
        this.completedTasks.push(todo);
        this.displayTasks();
    }
    getCompletedTask() {
        return this.completedTasks;
    }
}
const task = new _task();
submit.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = inputField.value;
    const desc = inputField_two.value;
    const duedate = inputField_three.value;
    inputField.value = "";
    inputField_two.value = "";
    inputField_three.value = "";
    task.createTask({ title, desc, duedate });
});
const updateTask = (id) => {
    const tasks = task.getTasks()[id];
    inputField.value = tasks.title;
    inputField_two.value = tasks.desc;
    inputField_three.value = tasks.duedate;
    btn.style.display = "none";
    btn1.style.display = "block";
    const clickHandler = () => {
        tasks.title = inputField.value;
        tasks.desc = inputField_two.value;
        tasks.duedate = inputField_three.value;
        inputField.value = "";
        inputField_two.value = "";
        inputField_three.value = "";
        btn.style.display = "block";
        btn1.style.display = "none";
        btn1.removeEventListener("click", clickHandler);
        task.displayTasks();
    };
    btn1.addEventListener("click", clickHandler);
};
const removeTask = (taskIndex) => {
    task.deleteTask(taskIndex);
};
const complete = new Completed();
function completeTask(index) {
    let inputs = document.getElementById("checked");
    let completed = document.querySelector(".completed");
    completed.innerHTML = "<h1>Completed tasks</h1>";
    inputs.checked = true;
    if (inputs.checked === true) {
        const singlecompletedtask = task.getTasks()[index];
        // Add to completed Array
        complete.getCompletedTask().push(Object.assign({}, singlecompletedtask));
        // remove from task array
        task.getTasks().splice(index, 1);
        task.displayTasks();
        let completed = document.querySelector(".completed");
        completed.innerHTML = "<h1>Completed tasks</h1>";
        complete.getCompletedTask().map(function (item, i) {
            let dateNow = new Date();
            let duedate = new Date(item.duedate);
            let start = dateNow.getTime();
            let due = duedate.getTime();
            let diff = Math.ceil((due - start) / (24 * 3600 * 1000));
            const maindiv = document.createElement("div");
            maindiv.style.backgroundColor = "azure";
            maindiv.style.height = "250px";
            maindiv.style.width = "300px";
            maindiv.style.borderRadius = "5%";
            maindiv.style.textAlign = "center";
            const h2 = document.createElement("h2");
            const h4 = document.createElement("h4");
            const p = document.createElement("p");
            const p2 = document.createElement("p");
            h2.textContent = `${item.title}`;
            h4.textContent = `${item.desc}`;
            p.textContent = ` Due Date: ${item.duedate}`;
            p2.textContent =
                diff >= 0
                    ? `You submitted  ${diff} days early`
                    : `You submitted  ${diff} days late`;
            console.log(diff);
            maindiv.appendChild(h2);
            maindiv.appendChild(h4);
            maindiv.appendChild(p);
            maindiv.appendChild(p2);
            completed.appendChild(maindiv);
        });
    }
}
