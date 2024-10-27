// this tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Render tasks on page load
renderTasks();
updateItemsLeft();

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
  

    // Input validation
    if (taskText.length < 2) {
        taskInput.classList.add('error');
        alert("Please enter a valid task with at least 2 characters.");
        return;
    } else {
        taskInput.classList.remove('error');
    }

    // Add new task to the list
    tasks.push({ text: taskText, completed: false });
    taskInput.value = ''; // Clear input
    saveTasks();
    renderTasks();
    updateItemsLeft();
}


// Event listener for "Enter" 
document.getElementById('new-task').addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents default Enter key behavior
        addTask();
    }
});
function renderTasks(filter = 'all') {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = ''; 
    tasks.forEach((task, index) => {
        if (filter === 'active' && task.completed) return;
        if (filter === 'completed' && !task.completed) return;

        const taskElement = document.createElement('div');
        taskElement.className = 'task' + (task.completed ? ' completed' : '');
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
            <span>${task.text}</span>
            <button onclick="removeTask(${index})">❌</button>
        `;
        tasksContainer.appendChild(taskElement);
    });

    // Update filter button styling
    document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${filter}`).classList.add('active');
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks(document.querySelector('.filters .active').id.split('-')[1]);
    updateItemsLeft();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks(document.querySelector('.filters .active').id.split('-')[1]);
    updateItemsLeft();
}

function updateItemsLeft() {
    const itemsLeft = tasks.filter(task => !task.completed).length;
    document.getElementById('items-left').innerText = `${itemsLeft} items left`;
}

function filterTasks(filter) {
    renderTasks(filter);
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateItemsLeft();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
