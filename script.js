document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Display Current Date
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('date-display').innerText = new Date().toLocaleDateString(undefined, options);

    loadTasks();

    function updateStats() {
        const total = document.querySelectorAll('li').length;
        const done = document.querySelectorAll('input[type="checkbox"]:checked').length;
        document.getElementById('total-count').innerText = total;
        document.getElementById('comp-count').innerText = done;
        saveTasks();
    }

    addBtn.addEventListener('click', () => {
        const val = input.value.trim();
        if (val === "") return;
        createTask(val, false);
        input.value = "";
        updateStats();
        // Native mobile feel: vibrate slightly
        if (navigator.vibrate) navigator.vibrate(10);
    });

    function createTask(text, isDone) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${isDone ? 'checked' : ''}>
            <span class="task-text ${isDone ? 'completed-text' : ''}">${text}</span>
            <span class="edit-btn">✏️</span>
        `;

        li.querySelector('input').addEventListener('change', (e) => {
            li.querySelector('.task-text').classList.toggle('completed-text', e.target.checked);
            updateStats();
        });

        li.querySelector('.edit-btn').addEventListener('click', () => {
            const span = li.querySelector('.task-text');
            const newText = prompt("Edit Task:", span.innerText);
            if (newText) { span.innerText = newText; saveTasks(); }
        });

        taskList.prepend(li); // Newest tasks at the top
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('li')).map(li => ({
            text: li.querySelector('.task-text').innerText,
            done: li.querySelector('input').checked
        }));
        localStorage.setItem('proTodoTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const saved = JSON.parse(localStorage.getItem('proTodoTasks')) || [];
        saved.forEach(t => createTask(t.text, t.done));
        updateStats();
    }

    document.getElementById('clear-btn').addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.parentElement.remove());
        updateStats();
    });
});
