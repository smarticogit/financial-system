const users = require('./controllers/users')
const express = require('express');

const routers = express();

routers.get('/users', users.create);

module.exports= routers;