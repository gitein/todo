// State
let currentUser = null;
let todos = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    ui.initTheme();
    checkAuth();
    setupEventListeners();
});

const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
        currentUser = JSON.parse(userStr);
        showApp();
    } else {
        ui.showView('login-view');
    }
};

const showApp = async () => {
    ui.elements.userDisplay.textContent = currentUser.username;
    ui.showView('app-view');
    await loadTodos();
};

const loadTodos = async () => {
    try {
        todos = await api.getTodos();
        ui.renderTodos(todos);
    } catch (err) {
        console.error('Failed to load todos', err);
        if (err.status === 401 || err.status === 403) logout();
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    todos = [];
    ui.showView('login-view');
};

const setupEventListeners = () => {
    // Theme Toggle
    ui.elements.themeToggle.addEventListener('click', ui.toggleTheme);

    // Login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = ui.elements.usernameInput.value;
        const password = ui.elements.passwordInput.value;
        try {
            const data = await api.login(username, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            ui.elements.usernameInput.value = '';
            ui.elements.passwordInput.value = '';
            showApp();
        } catch (err) {
            alert(err.message || 'Login failed');
        }
    });

    // Register
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = ui.elements.regUsernameInput.value;
        const password = ui.elements.regPasswordInput.value;
        try {
            await api.register(username, password);
            alert('Registration successful! Please login.');
            ui.showView('login-view');
            ui.elements.regUsernameInput.value = '';
            ui.elements.regPasswordInput.value = '';
        } catch (err) {
            alert(err.message || 'Registration failed');
        }
    });

    // Navigation
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        ui.showView('register-view');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        ui.showView('login-view');
    });

    document.getElementById('logout-btn').addEventListener('click', logout);

    // Todos
    document.getElementById('add-todo-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = ui.elements.todoInput.value;
        if (!text) return;
        try {
            const newTodo = await api.createTodo(text);
            todos.push(newTodo);
            ui.renderTodos(todos);
            ui.elements.todoInput.value = '';
        } catch (err) {
            console.error(err);
        }
    });

    ui.elements.todoList.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('delete-btn')) {
            try {
                await api.deleteTodo(id);
                todos = todos.filter(t => t.id !== id);
                ui.renderTodos(todos);
            } catch (err) {
                console.error(err);
            }
        } else if (e.target.classList.contains('todo-checkbox')) {
            const todo = todos.find(t => t.id === id);
            try {
                const updated = await api.updateTodo(id, { completed: e.target.checked });
                todo.completed = updated.completed;
                ui.renderTodos(todos);
            } catch (err) {
                console.error(err);
                e.target.checked = !e.target.checked; // Revert
            }
        }
    });
};
