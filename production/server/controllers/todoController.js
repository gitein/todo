const { readTodos, writeTodos } = require('../utils/db');

const getTodos = (req, res) => {
    const todos = readTodos();
    const userTodos = todos.filter(t => t.userId === req.user.id);
    res.json(userTodos);
};

const createTodo = (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }

    const todos = readTodos();
    const newTodo = {
        id: Date.now().toString(),
        userId: req.user.id,
        text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Authorization check
    if (todos[todoIndex].userId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedTodo = { ...todos[todoIndex] };
    if (text !== undefined) updatedTodo.text = text;
    if (completed !== undefined) updatedTodo.completed = completed;

    todos[todoIndex] = updatedTodo;
    writeTodos(todos);

    res.json(updatedTodo);
};

const deleteTodo = (req, res) => {
    const { id } = req.params;

    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Authorization check
    if (todos[todoIndex].userId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    todos.splice(todoIndex, 1);
    writeTodos(todos);

    res.json({ message: 'Todo deleted' });
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
