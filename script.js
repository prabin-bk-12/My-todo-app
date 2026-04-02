document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 1. LOAD SAVED TASKS WHEN APP OPENS
    loadTasks();

    function updateStats() {
        const total = document.querySelectorAll('li').length;
        const completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
        document.getElementById('total-count').innerText = total;
        document.getElementById('comp-count').innerText = completed;
        document.getElementById('incomp-count').innerText = total - completed;
        saveTasks(); // 2. SAVE EVERY TIME SOMETHING CHANGES
    }

    addBtn.addEventListener('click', () => {
        const taskValue = input.value.trim();
        if (taskValue === "") return;
        createTaskElement(taskValue, false);
        input.value = "";
        updateStats();
    });

    function createTaskElement(text, isCompleted) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${isCompleted ? 'checked' : ''}>
            <span class="task-text ${isCompleted ? 'completed-text' : ''}">${text}</span>
            <span class="edit-btn">✏️</span>
        `;

        li.querySelector('input').addEventListener('change', (e) => {
            li.querySelector('.task-text').classList.toggle('completed-text', e.target.checked);
            updateStats();
        });

        li.querySelector('.edit-btn').addEventListener('click', () => {
            const span = li.querySelector('.task-text');
            const newValue = prompt("Edit task:", span.innerText);
            if (newValue) { span.innerText = newValue; saveTasks(); }
        });

        taskList.appendChild(li);
    }

    // 3. THE "SAVE" LOGIC
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').innerText,
                completed: li.querySelector('input').checked
            });
        });
        localStorage.setItem('myTasks', JSON.stringify(tasks));
    }

    // 4. THE "LOAD" LOGIC
    function loadTasks() {
        const saved = JSON.parse(localStorage.getItem('myTasks')) || [];
        saved.forEach(task => createTaskElement(task.text, task.completed));
        updateStats();
    }

    document.getElementById('delete-selected').addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.parentElement.remove());
        updateStats();
    });
});
