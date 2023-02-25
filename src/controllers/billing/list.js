const knex = require('../../conexao');
const logger = require('../../utils/logger');

const list = async (req, res) => {

    const userCurrent = req.user;
    try {
        // const billings = await knex('billings');
        const billings = await knex
            .select('billings.id', 'customers.name', 'billings.description', 'billings.status', 'billings.amount', 'billings.due_date')
            .from('billings')
            .join('customers', 'billings.customer_id', 'customers.id')

        if (!billings) {
            logger.info(`Listing billings: Not found!`)
            return res.status(400).json({ message: `Billings Not found` })
        }

        logger.info(`user: ${userCurrent.name} Listing billings`)
        return res.status(200).json(billings)
    } catch (error) {
        logger.info(`user: ${userCurrent.name} Billing: ${error.message}`);
        return res.status(400).json({ message: error.message })
    }
};

module.exports = { list }