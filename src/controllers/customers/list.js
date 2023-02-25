const knex = require('../../conexao');
const logger = require('../../utils/logger');

const list = async (req, res) => {

    try {
        const customers = await knex('customers');

        logger.info(`${req.user.name} listed Customers`)
        return res.status(200).json(customers);
    } catch (error) {
        return res.status(500).json({ message: `Server error - ${error.message}` })
    }
}

module.exports = { list }