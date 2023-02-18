const users = require('./controllers/users/create');
const usersList = require('./controllers/users/list');
const login = require('./controllers/users/login');
const authentication = require('./controllers/validation');

const express = require('express');

const routers = express();

routers.post('/login', login.login);
routers.post('/users', users.create);

routers.use(authentication);

routers.get('/users', usersList.list);

module.exports = routers;