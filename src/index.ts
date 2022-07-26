let tasks = document.getElementById ("pending") as HTMLElement;
let buttontitle = "Add";
let inputField = document.getElementById("inputField") as HTMLInputElement;
let inputField_two = document.getElementById("inputField_two")as HTMLInputElement;
let inputField_three = document.getElementById("inputField_three") as HTMLInputElement;
let submit = document.getElementById('my-form') as HTMLFormElement;
let btn1 = document.getElementById("sub") as HTMLButtonElement; //update//
let btn = document.getElementById("sub1") as HTMLButtonElement;; //add//


interface Todos{
  title:string
  desc:string
  duedate:string
}


class _task {
  private taskArr:Todos[] = [];
  public completedTasks:Todos[] = [];
    constructor() {
    }
        createTask(todo:Todos){
          this.taskArr.push(todo)     
        }

        getTasks(){
          return this.taskArr
        }

        completedTask(todo:Todos){
          this.completedTasks.push(todo)
        }

        getCompletedTask(){
          return this.completedTasks
        }
        
        getTaskById(id:number) {
        return this.taskArr.find((task:any) => task.id === id);
       };

       deleteTask(id:number)  {
                this.taskArr.splice(id, 1);
              };
      }

      const task= new _task()

      submit.addEventListener('submit', (e)=>{
        e.preventDefault()
        const title = inputField.value
        const desc = inputField_two.value
        const duedate = inputField_three.value
        inputField.value = "";
        inputField_two.value = "";
        inputField_three.value = "";
        task.createTask({title,desc,duedate}) 
       displayTasks()
      });


      const displayTasks = ()=> {
                tasks.innerHTML = "<h1>Pending Tasks</h1>";
              
                const taskContainers = task.getTasks().map(
                  (task:any, index:any) => `
                  <div class='task'>
                    <h2>${task.title}</h2>
                    <h4>${task.desc}</h4>
                    <p>${task.duedate}</p>
                  </div>
                  <button onclick="updateTask(${index})" class="update">Update</button>
                  <button onclick="removeTask(${index})" class="delete">Delete</button>
                  <form>
                  <p><input type="checkbox" id="checked"> Completed? </p>
                  <button type="button" id="checkbox" onclick="completeTask(${index})">Yes</button>
                  <button type="button" class="uncheck" onclick="uncheck()">No</button>
                </form>
                `
                );
              
                taskContainers.forEach((task:any) => {
                  tasks.insertAdjacentHTML ("beforeend", task);
                });
              };


              const updateTask = (id:number) => {
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
                  btn1.removeEventListener('click', clickHandler)
                  displayTasks();
                }
                btn1.addEventListener("click", clickHandler);
              };
        

             const removeTask = (taskIndex:any) => {
                task.deleteTask(taskIndex);
                displayTasks();
              };

              
             function  completeTask(index:any)  {
                let inputs = document.getElementById("checked") as HTMLInputElement;
                let dateNow = new Date();
                let duedate = new Date(task.getTasks()[index].duedate);
                let start = dateNow.getTime();
                let due = duedate.getTime();
                let diff = Math.ceil((start - due) / (24 * 3600 * 1000));  
                inputs.checked = true;
                if (inputs.checked === true) {
                  const completed = task.getTasks().map(
                    (task, index) => `
                  <div class='task'>
                    <h2>${task.title}</h2>
                    <h4>${task.desc}</h4>
                    <p>${task.duedate}</p>
                    <p> Completed in : ${diff}</p>
                  </div>
                `
                  );
                  console.log('item.diff')
              
                  completed.forEach((task) => {
                    tasks.insertAdjacentHTML("beforeend", task);
                  });
              
                  const singlecompletedtask = task.getTasks()[index];
              
                  // Add to completed Array
                  task.getCompletedTask().push({  ...singlecompletedtask });
                  // remove from task array
              
                  task.getTasks().splice(index, 1);
                  displayTasks();
                  getCompletedTasks();
                }
              };

              function getCompletedTasks() {
                let completed = document.querySelector(".completed") as HTMLDivElement;
                completed.innerHTML = "<h1>Completed tasks</h1>";
              
                // let title,desc,duedate,diff=''
                  task.getCompletedTask().map(function (item, i) {
                  const maindiv = document.createElement("div");
                  maindiv.style.backgroundColor = "azure";
                  maindiv.style.height = "200px";
                  maindiv.style.textAlign = "center";
                  const h2 = document.createElement("h2");
                  const h4 = document.createElement("h4");
                  const p = document.createElement("p");
                  const p2 = document.createElement("p");
                  h2.textContent = `${item.title}`;
                  h4.textContent = `${item.desc}`;
                  p.textContent=`${item.duedate}`
                  p2.textContent = `You submitted  days early`;
                  
                  
                  maindiv.appendChild(h2);
                  maindiv.appendChild(h4);
                  maindiv.appendChild(p);
                  maindiv.appendChild(p2);
                  completed.appendChild(maindiv);
                });
              }
              