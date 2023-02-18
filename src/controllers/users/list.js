const knex = require('../../conexao');

const list = async (req, res) => {
    const usersList = await knex('users').first();

    return res.status(200).json(usersList)
}

module.exports = { list }