function handleCreateTask(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = data.get('task')

    console.log({value})


}

function handleUpdateTask(event) {
    event.preventDefault();
    const data = new FormData(event.target);



}
// CLUES
// Eitheer modify the api to handle plain text
// OR create handlers for form to convert plain text into json and call api 