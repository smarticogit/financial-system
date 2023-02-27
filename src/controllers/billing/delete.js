const knex = require('../../conexao');

const del = async (req, res) => {
    const { id } = req.params;
    const billingId = Number(id);

    try {
        const billing = await knex('billings').where({ id: billingId }).first();

        if (!billing) {
            return res.status(400).json({ message: 'Billing not found' });
        }

        if (billing.status === 'paid') {
            return res.status(400).json({ message: 'Billing cannot be deleted!' });
        }

        const billingDeleted = await knex('billings').where({ id: billingId }).del().returning('*');

        return res.status(200).json({ message: 'Billing Deleted' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

module.exports = { del }