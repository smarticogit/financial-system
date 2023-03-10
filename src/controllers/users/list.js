const knex = require('../../conexao');
const logger = require('../../utils/logger');

const list = async (req, res) => {
    try {
        const usersList = await knex('users');

        logger.info(`${req.user.name} listed Users`)
        return res.status(200).json(usersList);
    } catch (error) {
        return res.status(500).json({ message: `Server error - ${error.message}` })
    }
}

module.exports = { list }