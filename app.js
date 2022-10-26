function addTask() {
    const task = document.body.querySelector("#task");
    const taskValue = task.value;
    const taskList = document.body.querySelector(".task-list");

    // validate input has a value
    if (taskValue === '') {
        document.body.querySelector("#task").addEventListener("click", function (event) {
            event.preventDefault()
        });
    } else {
        // create li for new task
        const listItem = document.createElement("li");

        // list item content div
        const listContentContainer = document.createElement("div");
        listContentContainer.classList.add('list-container')
        listContentContainer.innerText = taskValue;
        listItem.appendChild(listContentContainer);
        taskList.appendChild(listItem);

        // button container div
        const btnContainer = document.createElement("div");
        btnContainer.classList.add('btn-container')

        // create delete button for new task
        const deleteBtn = document.createElement("input");
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.setAttribute('value', 'Delete')
        deleteBtn.setAttribute('onclick', 'deleteTask("' + 'btn-' + taskValue + '")')
        deleteBtn.setAttribute('id', 'btn-' + taskValue);
        deleteBtn.classList.add('delete-btn')
        btnContainer.appendChild(deleteBtn);

        // create edit button for new task
        const editBtn = document.createElement("input");
        editBtn.setAttribute('type', 'button')
        editBtn.setAttribute('value', 'Edit')
        editBtn.setAttribute('onclick', 'editTask()')
        editBtn.classList.add('edit-btn')
        btnContainer.appendChild(editBtn);

        listItem.appendChild(btnContainer);

        // clear input value
        task.value = '';
    }
}

function deleteTask(itemid) {
    const taskList = document.body.querySelector(".task-list");
    const item = document.getElementById(itemid);
    // getting the parent element of the btn container to be able to remove the specific li
    const container = item.parentElement.parentElement;
    taskList.removeChild(container);
}

function editTask() {
    console.log('call edit');
}


// function createTasksArray(fs) {
//     const task = document.body.querySelector("#task");
//     const taskValue = task.value;
//     const tasksArray = [];


//     tasksArray.push(taskValue);

//     fs.appendFile('usersTasks.json', tasksArray, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     });
//     // return tasksArray;
// }

// fs.appendFile('usersTasks.json', tasksArray, function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

