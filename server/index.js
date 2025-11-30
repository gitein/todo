const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');
const { authenticateToken } = require('./middleware/auth');
const authController = require('./controllers/authController');
const todoController = require('./controllers/todoController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(express.static(path.join(__dirname, '../public')));

// Routes - Auth
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Routes - Todos
app.get('/api/todos', authenticateToken, todoController.getTodos);
app.post('/api/todos', authenticateToken, todoController.createTodo);
app.put('/api/todos/:id', authenticateToken, todoController.updateTodo);
app.delete('/api/todos/:id', authenticateToken, todoController.deleteTodo);

// Serve frontend for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
