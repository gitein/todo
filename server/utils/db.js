const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../data/users.json');
const todosFile = path.join(__dirname, '../data/todos.json');

// Ensure data directory and files exist
const ensureDataFiles = () => {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, '[]');
    }
    if (!fs.existsSync(todosFile)) {
        fs.writeFileSync(todosFile, '[]');
    }
};

ensureDataFiles();

const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const readTodos = () => {
    try {
        const data = fs.readFileSync(todosFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeTodos = (todos) => {
    fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
};

module.exports = {
    readUsers,
    writeUsers,
    readTodos,
    writeTodos
};
