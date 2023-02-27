const knex = require('../../conexao');
const logger = require('../../utils/logger');

const edit = async (req, res) => {
    const { description, status, amount, due_date } = req.body;
    const { id } = req.params;
    const idBilling = Number(id);

    const userCurrent = req.user;

    const billingData = {};

    try {
        const billing = await knex.from('billings as b').where({ id }).first();

        if (!billing) {
            return res.status(400).json({ message: `billing not found!` });
        }

        if (description && description !== billing.description) {
            billingData.description = description;
        }

        if (status && status !== billing.status) {
            billingData.status = status;
        }

        if (amount && amount !== billing.amount) {
            billingData.amount = amount;
        }

        if (due_date && new Date(due_date).getTime() !== billing.due_date.getTime()) {
            billingData.due_date = due_date;
        }

        if (Object.keys(billingData).length === 0) {
            return res.status(400).json({ message: "No data to update!" });
        }

        billingData.updated = new Date();

        const billingUpdated = await knex('billings').where({ id: idBilling }).update(billingData).returning('*');

        if (!billingUpdated) {
            return res.status(400).json({ message: "User not created!" });
        }

        logger.warn(`billingId: ${idBilling} Updated`)
        return res.status(200).json({ message: `Billing Updated` });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { edit }