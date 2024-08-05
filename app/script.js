document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const formContainer = document.getElementById('form-container');
    const showFormButton = document.querySelector('.show-form');

    window.toggleForm = function() {
        formContainer.classList.toggle('hidden');
        if (formContainer.classList.contains('hidden')) {
            showFormButton.textContent = 'Add New Task';
            showFormButton.style.backgroundColor = 'blue';
        } else {
            showFormButton.textContent = 'Hide Form';
            showFormButton.style.backgroundColor = 'red';
        }
    };

    window.addTask = function() {
        const newTaskInput = document.getElementById('new-task');
        const taskText = newTaskInput.value.trim();
        const taskDeadlineInput = document.getElementById('deadline');
        const taskDeadline = taskDeadlineInput.value;
        const taskDescInput = document.getElementById('description');
        const taskDesc = taskDescInput.value.trim();

        // Error elements
        const taskError = document.getElementById('task-error');
        const descriptionError = document.getElementById('description-error');
        const deadlineError = document.getElementById('deadline-error');

        // Clear previous errors
        taskError.textContent = '';
        descriptionError.textContent = '';
        deadlineError.textContent = '';

        let isValid = true;

        if (taskText === '') {
            taskError.textContent = 'Task title is required.';
            isValid = false;
        }

        if (taskDesc === '') {
            descriptionError.textContent = 'Task description is required.';
            isValid = false;
        }

        if (taskDeadline === '') {
            deadlineError.textContent = 'Task deadline is required.';
            isValid = false;
        }

        if (!isValid) return;

        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        textSpan.innerHTML = `<div class="task-title">${taskText}</div><br><div class="description">${taskDesc}</div><br><div class="deadline">Deadline: ${taskDeadline}</div>`;
        textSpan.contentEditable = false;
        li.appendChild(textSpan);

        const buttonSpan = document.createElement('span');
        buttonSpan.className = 'button-group';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => {
            if (textSpan.contentEditable === 'true') {
                textSpan.contentEditable = 'false';
                textSpan.classList.remove('editing');
                editButton.textContent = 'Edit';
                editButton.className = 'edit';
            } else {
                textSpan.contentEditable = 'true';
                textSpan.classList.add('editing');
                editButton.textContent = 'Save';
                editButton.className = 'save';
                textSpan.focus();
            }
        };
        buttonSpan.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => li.remove();
        buttonSpan.appendChild(deleteButton);

        li.appendChild(buttonSpan);
        taskList.appendChild(li);
        newTaskInput.value = '';
        taskDeadlineInput.value = '';
        taskDescInput.value = '';

        toggleForm();
    };
});
