const ui = {
    elements: {
        loginView: document.getElementById('login-view'),
        registerView: document.getElementById('register-view'),
        appView: document.getElementById('app-view'),
        todoList: document.getElementById('todo-list'),
        usernameInput: document.getElementById('username'),
        passwordInput: document.getElementById('password'),
        regUsernameInput: document.getElementById('reg-username'),
        regPasswordInput: document.getElementById('reg-password'),
        todoInput: document.getElementById('todo-input'),
        themeToggle: document.getElementById('theme-toggle'),
        userDisplay: document.getElementById('user-display')
    },

    showView: (viewId) => {
        ['login-view', 'register-view', 'app-view'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(viewId).classList.remove('hidden');
    },

    renderTodos: (todos) => {
        const list = ui.elements.todoList;
        list.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <button class="delete-btn" data-id="${todo.id}">×</button>
            `;
            list.appendChild(li);
        });
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        ui.updateThemeIcon(savedTheme);
    },

    toggleTheme: () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        ui.updateThemeIcon(newTheme);
    },

    updateThemeIcon: (theme) => {
        ui.elements.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
};
