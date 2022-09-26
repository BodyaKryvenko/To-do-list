let taskNameInput = document.querySelector(".task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let taskList = document.querySelector(".task-list");
let tasks = [];
let dayNightMode = document.querySelector(".day-night");
let nightMode = false;
let allTasks = document.querySelector("#all-tasks");
let doneTasks = document.querySelector("#checked-tasks");
let activeTasks = document.querySelector("#active-tasks");
let deleteAll = document.querySelector(".delete-all");
let items = document.querySelector(".items-number");
let itemsNumber = 0;

items.textContent = `Item(s): ${itemsNumber}`;
startText();
dayNightMode.addEventListener("click", dayNight);



/*---------------(footer buttons)----------*/
allTasks.addEventListener("click", () => {
    taskList.innerHTML = '';
    for (let elements of tasks){
        let allTasks = new Task(elements.text, elements.isDone);
        allTasks.createIn(taskList);
    }
    itemsNumber = tasks.length;
    items.textContent = `Item(s): ${itemsNumber}`;
    startText()

});

doneTasks.addEventListener("click", () => {
    taskList.innerHTML = '';
    itemsNumber = 0;
    for (let elements of tasks){
        if (elements.isDone){
            let chkdTask = new Task(elements.text, elements.isDone);
            chkdTask.createIn(taskList);
            itemsNumber += 1;
        }
    }
    items.textContent = `Item(s): ${itemsNumber}`;
    startText();
});

activeTasks.addEventListener("click", () => {
    taskList.innerHTML = '';
    itemsNumber = 0;
    for (let elements of tasks){
        if (!elements.isDone){
            let actTask = new Task(elements.text, elements.isDone);
            actTask.createIn(taskList);
            itemsNumber += 1;
        }
    }
    items.textContent = `Item(s): ${itemsNumber}`;
    startText();
});

deleteAll.addEventListener("click", () => {
    tasks = [];
    itemsNumber = 0;
    items.textContent = `Item(s): ${itemsNumber}`;
    taskList.innerHTML = '';
    startText();
})



/*---------------(add task events)----------*/
addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code == "Enter") addTaskHandler();
})



function addTaskHandler() {
    if (taskNameInput.value) {
        let newTask = new Task(taskNameInput.value, false);
        newTask.createIn(taskList);
        tasks.push(newTask);
        itemsNumber += 1;
        taskNameInput.value = "";
    } else {
        alert("введите имя задачи");
    }
    items.textContent = `Item(s): ${itemsNumber}`;
    startText();
}


/*---------------(Task creation)----------*/
class Task {
    constructor(text, isDone) {
        this.text = text;
        this.isDone = isDone;
        this.div = null;
    }

    createIn(element) {
        this.div = document.createElement("div");
        this.div.classList.add("task");
        if (nightMode){
            this.div.classList.add("task-night")
        }

        let checkedMark = document.createElement("div");
        checkedMark.addEventListener("click", () => this.changeState(this.div, checkedMark));
        checkedMark.classList.add("checkbox")

        let p = document.createElement("p");
        p.innerText = this.text;
        p.classList.add("task-paragraph")

        let deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete-task")
        deleteDiv.addEventListener("click", () => {
            for (let i = 0; i < tasks.length; i++){
                let previousElement = p.innerText;
                if (tasks[i].text === previousElement){
                    tasks.splice(i, 1);
                }
            }
            deleteDiv.parentElement.remove()
            itemsNumber -= 1;
            items.textContent = `Item(s): ${itemsNumber}`;
            startText();
        })

        let deleteDivImg = document.createElement("img");
        deleteDivImg.src = "https://cdn.icon-icons.com/icons2/10/PNG/256/remove_delete_exit_close_1545.png";
        deleteDivImg.classList.add("delete-task-imj");

        if (this.isDone){
            this.div.classList.add("task-checked");
            p.classList.add("task-paragraph-checked");
            checkedMark.classList.add("check-mark");
        }
        else {
            this.div.classList.remove("task-checked");
            p.classList.remove("task-paragraph-checked");
            checkedMark.classList.remove("check-mark");
        }

        deleteDiv.append(deleteDivImg);
        this.div.append(checkedMark);
        this.div.append(p);
        this.div.append(deleteDiv);
        element.append(this.div);
    }

    changeState(element, mark) {
        this.isDone = !this.isDone;
        element.classList.toggle("task-checked");
        let child = element.children;
        child[1].classList.toggle("task-paragraph-checked");
        mark.classList.toggle("check-mark");

        for (let i = 0; i < tasks.length; i++){
            let paragraph = element.children[1];
            console.log(paragraph);
            if (tasks[i].text === paragraph.innerText){
                tasks[i].isDone = this.isDone;
            }
        }
    }

}

function startText() {
    let p = document.createElement("p");
    p.classList.add("start-message");
    p.innerText = `Нет новых задач`
    if (taskList.innerHTML === ""){
        taskList.append(p);
    }
    if (itemsNumber > 0) {
        let startMessage = document.querySelectorAll(".start-message");
        for (let values of startMessage){
            values.remove();
        }
    }
}


/*---------------(Day/Night mode)----------*/
function dayNight(){
    nightMode = !nightMode;
    document.querySelector("body").classList.toggle("body-night");
    document.querySelector(".container").classList.toggle("container-night");
    document.querySelector("header").classList.toggle("header-night");
    dayNightMode.classList.toggle("night-mode");
    taskNameInput.classList.toggle("task-name-input-night");
    taskList.classList.toggle("task-list-night");
    let tsks = document.querySelectorAll(".task");
    // let marks = document.querySelectorAll(".checkbox");
    if (nightMode){
        for (let elements of tsks){
            elements.classList.add("task-night");
        }

        // for (let elements of marks){
        //     elements.classList.add("checkbox-night");
        // }
    }
    else {
        for (let elements of tsks){
            elements.classList.remove("task-night");
        }

        // for (let elements of marks){
        //     elements.classList.remove("checkbox-night");
        // }
    }

    document.querySelector("footer").classList.toggle("footer-night");
    let btn = document.querySelectorAll(".btn");
    for (let elements of btn){
        elements.classList.toggle("btn-night")
    }

}

/*---------------(Date)----------*/
function formatDate() {
    let currentDate = document.querySelector(".date");
    let date = now.getDate();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];
    let daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wensday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = daysOfWeek[now.getDay()];

    currentDate.innerHTML = `${day}, ${month} ${date}`;
}
let now = new Date();
formatDate();






