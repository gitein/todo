const morgan = require('morgan');

// Custom token to log user ID if authenticated
morgan.token('user', (req) => {
    return req.user ? `User:${req.user.id}` : 'Guest';
});

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :user');

module.exports = logger;
