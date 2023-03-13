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

knex.raw('SELECT 1')
  .then(() => {
    console.log('Connected in DataBase');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = knex;