// Wait for the page to load before running code
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to update the bottom numbers
    function updateStats() {
        const total = document.querySelectorAll('li').length;
        const completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
        
        document.getElementById('total-count').innerText = total;
        document.getElementById('comp-count').innerText = completed;
        document.getElementById('incomp-count').innerText = total - completed;
    }

    // Function to create a new task
    addBtn.addEventListener('click', () => {
        const taskValue = input.value.trim();
        if (taskValue === "") {
            alert("Please type something!");
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${taskValue}</span>
            <span class="edit-btn">✏️</span>
        `;

        // Checkbox Logic
        li.querySelector('input').addEventListener('change', (e) => {
            li.querySelector('.task-text').classList.toggle('completed-text', e.target.checked);
            updateStats();
        });

        // Edit Button Logic
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const span = li.querySelector('.task-text');
            const newValue = prompt("Edit your task:", span.innerText);
            if (newValue !== null && newValue.trim() !== "") {
                span.innerText = newValue.trim();
            }
        });

        taskList.appendChild(li);
        input.value = ""; // Clear input
        updateStats();
    });

    // Delete Selected Logic
    document.getElementById('delete-selected').addEventListener('click', () => {
        const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked');
        checkedItems.forEach(item => item.parentElement.remove());
        updateStats();
    });

    // Complete All Logic
    document.getElementById('complete-selected').addEventListener('click', () => {
        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        allCheckboxes.forEach(cb => {
            cb.checked = true;
            cb.parentElement.querySelector('.task-text').classList.add('completed-text');
        });
        updateStats();
    });
});
