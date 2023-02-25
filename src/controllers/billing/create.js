const knex = require('../../conexao');
const logger = require('../../utils/logger');

const create = async (req, res) => {
    const { customer_id, description, status, amount, due_date } = req.body;

    const userCurrent = req.user;

    try {
        const billingCreated = await knex('billings')
            .insert({
                customer_id,
                description,
                status,
                amount,
                due_date,
                created: new Date(),
                updated: new Date(),
                createdby: userCurrent.name
            }).returning('*');

        if (!billingCreated) {
            logger.info(`user: ${userCurrent.name} Billing Not Created`);
            return res.status(400).json({ message: `Billing Not Created` });
        }

        logger.info(`user: ${userCurrent.name} Billing Created`);
        return res.status(201).json({ message: `Billing Created` });
    } catch (error) {
        logger.info(`user: ${userCurrent.name} Billing: ${error.message}`)
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { create }