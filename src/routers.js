const login = require('./controllers/users/login');
const users = require('./controllers/users/create');
const usersList = require('./controllers/users/list');
const usersEdit = require('./controllers/users/edit');
const authentication = require('./utils/authentication');
const customers = require('./controllers/customers/list');
const validate = require('./validation/validations');
const customersGet = require('./controllers/customers/get');
const customersEdit = require('./controllers/customers/edit');
const customersCreate = require('./controllers/customers/create');
const billingCreate = require('./controllers/billing/create');
const billingList = require('./controllers/billing/list');
const billingGet = require('./controllers/billing/get');
const billingEdit = require('./controllers/billing/edit');
const billingDel = require('./controllers/billing/delete');
const { schemaUsers, schemaCustomers, schemaBillings, schemaBillingsUpdate } = require('./validation/fieldsValidations');

const express = require('express');

const routers = express();

routers.post('/login', login.login);
routers.post('/users', validate(schemaUsers), users.create);

routers.use(authentication);

routers.get('/users', usersList.list);
routers.put('/users', validate(schemaUsers), usersEdit.edit);

routers.get('/customers', customers.list);
routers.get('/customers/:id', customersGet.get);
routers.put('/customers/:id', validate(schemaCustomers), customersEdit.edit);
routers.post('/customers', validate(schemaCustomers), customersCreate.create);

routers.post('/billings', validate(schemaBillings), billingCreate.create);
routers.get('/billings', billingList.list);
routers.get('/billings/:id', billingGet.get);
routers.put('/billings/:id', validate(schemaBillingsUpdate), billingEdit.edit);
routers.delete('/billings/:id', billingDel.del)

module.exports = routers;