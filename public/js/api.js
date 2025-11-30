const API_URL = '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

const api = {
    login: async (username, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    register: async (username, password) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    getTodos: async () => {
        const res = await fetch(`${API_URL}/todos`, {
            headers: getHeaders()
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    createTodo: async (text) => {
        const res = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ text })
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    updateTodo: async (id, updates) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updates)
        });
        if (!res.ok) throw await res.json();
        return res.json();
    },

    deleteTodo: async (id) => {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!res.ok) throw await res.json();
        return res.json();
    }
};
