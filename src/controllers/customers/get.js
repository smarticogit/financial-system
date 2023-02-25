const knex = require('../../conexao');
const logger = require('../../utils/logger');

const get = async (req, res) => {
    const { id } = req.params

    try {
        const customer = await knex('customers').where({ id }).first();


        if (!customer) {
            logger.info(`customer id: ${id} not found`);
            return res.status(400).json({ message: 'Customer not found!' });
        }

        logger.info(`getted customer id: ${id}`);
        return res.status(200).json({ customer });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

module.exports = { get }