const joi = require('joi');

const schemaUsers = joi.object({
    name: joi.string().min(3).trim().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required(),
});

const schemaCustomers = joi.object({
    name: joi.string().min(3).trim().required(),
    email: joi.string().email().required(),
    cpf: joi.string().length(11).required(),
    phone: joi.string(),
    zipcode: joi.string(),
    number: joi.string(),
    complemento: joi.string(),

});

const schemaBillings = joi.object({
    customer_id: joi.number().precision(2).min(0).max(1000000).required(),
    description: joi.string().trim().required(),
    status: joi.string().required(),
    amount: joi.number(),
    due_date: joi.string().required(),
});

const schemaBillingsUpdate = joi.object({
    description: joi.string().trim().required(),
    status: joi.string().required(),
    amount: joi.number(),
    due_date: joi.string().required(),
});


module.exports = { schemaUsers, schemaCustomers, schemaBillings, schemaBillingsUpdate }; 
