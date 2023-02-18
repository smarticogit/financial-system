const knex = require('knex')({
    client: 'pg',
    connection: {
        port: 5432,
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }
});

module.exports = knex;