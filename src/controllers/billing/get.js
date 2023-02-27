const knex = require('../../conexao');
const logger = require('../../utils/logger');

const get = async (req, res) => {
    const { id } = req.params;
    const idBilling = Number(id);

    const userCurrent = req.user;

    try {
        const billing = await knex
            .select('b.id', 'c.name', 'b.description', 'b.status', 'b.amount', 'b.due_date')
            .from('billings as b')
            .where('b.id', idBilling)
            .join('customers as c', 'b.customer_id', 'c.id')
            .first();

        if (!billing) {
            return res.status(400).json({ message: `billing not found!` });
        }

        logger.info(`user: ${userCurrent.name} Getting billing ${billing.id}`)
        return res.status(200).json(billing);
    } catch (error) {
        logger.info(`user: ${userCurrent.name} error: ${error.message}`)
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { get }