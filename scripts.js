const modal = {

    element: document.querySelector('.modal'),

    open() {

        document
            .querySelector(".modal")
            .classList
            .remove("hidden");
        DOM.addBlur();
        document.getElementById("task-text").focus()

    },
    close() {
        document
            .querySelector(".modal")
            .classList
            .add("hidden");


        DOM.removeBlur();
    },

}


const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("toDoApp:tasks")) || []
    },
    set(tasks) {
        localStorage.setItem("toDoApp:tasks", JSON.stringify(tasks))
    }
}
const tasks = Storage.get();

const DOM = {
    addTaskButton: document.getElementById("add-task"),

    top: document.querySelector("header"),

    content: document.querySelector("#tasks"),

    renderTasks(task, index) {
        const taskDiv = document.createElement("div")
        taskDiv.classList.add("task")
        taskDiv.setAttribute("id", "task" + index)
        taskDiv.innerHTML = DOM.innerHtmlTask(task, index)
        const tasks = document.getElementById("tasks")
        tasks.appendChild(taskDiv);
    },

    addBlur() {
        DOM.top.classList.add("blur")
        DOM.content.classList.add("blur")
        DOM.addTaskButton.classList.add("blur")

    },
    removeBlur() {
        DOM.top.classList.remove("blur")
        DOM.content.classList.remove("blur")
        DOM.addTaskButton.classList.remove("blur")
    },
    innerHtmlTask(task, index) {
        const text = task.text;
        html = `                
                <div class="group">
                <input type="checkbox" id="checkbox${index}" onclick="Task.toggleCheck(${index})">
                <span>
                    ${text}
                </span>
                </div>
                <span onclick = "Task.remove(${index})" class="delete-task">
                x
                </span>          
                `
        return html;
    },


}
const Task = {
    addTask(event) {
        var text = document.getElementById("task-text").value;

        if (text !== '') {
            text = String(text);
            let task = {
                text,
                checked: false
            }

            tasks.push(task);
            const form = document.querySelector("form")
            form.reset();
            modal.close();
            App.reload();
        } else {
            alert("Digite a tarefa a fazer")
        }
    },
    remove(index) {
        tasks.splice(index, 1);
        App.reload();
    },

    verifyCheck() {
        tasks.forEach((task, index) => {
            if (task.checked === true) {
                let taskText = document.querySelector(`#task${index} span`);
                taskText.classList.add("checked")

                let taskCheckBox = document.getElementById(`checkbox${index}`)
                taskCheckBox.checked = true;


            } else {
                let taskText = document.querySelector(`#task${index} span`);
                taskText.classList.remove("checked")

                let taskCheckBox = document.getElementById(`checkbox${index}`)
                taskCheckBox.checked = false;

            }

        })
    }, toggleCheck(index) {
        if (tasks[index].checked === true) {
            tasks[index].checked = false;
        } else {
            tasks[index].checked = true;
        }
        App.reload()
    }


}

const App = {

    init() {

        tasks.forEach((task, index) => {
            DOM.renderTasks(task, index)
        })
        Storage.set(tasks)
        Task.verifyCheck()
    },
    reload() {
        const tasks = document.getElementById("tasks");
        tasks.innerHTML = "";
        App.init();
    }

}
document.body.addEventListener('keydown', () => {
    console.log(event.keyCode, event.key)
    if (event.keyCode == 27 && !modal.element.classList.contains('hidden')) {
        modal.close()
        console.log("teste");
    }
})


App.init();




