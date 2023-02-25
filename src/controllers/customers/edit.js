const knex = require('../../conexao');
const logger = require('../../utils/logger');
const viacep = require('../../utils/viacep');

const edit = async (req, res) => {
    const { name, cpf, email, phone, zipcode, number, complement } = req.body;
    const customerId = Number(req.params.id)

    const customersData = {}

    try {
        const getCustomer = await knex('customers').where({ id: customerId }).first();

        if (!getCustomer) {
            logger.warn('Invalid customer id when trying to update customer');
            return res.status(400).json({ message: "Customer ID Invalid" });
        }
        if (cpf) {
            return res.status(400).json({ message: "Can't update cpf" });
        }

        if (email && email !== getCustomer.email) {
            const getEmail = await knex('customers').where({ email }).first();

            if (!getEmail) {
                customersData.email = email
            } else {
                logger.warn(`error when trying to create customer: Email already exists`)
                return res.status(400).json({ message: "Email already exists" });
            }
        };

        if (name && name !== getCustomer.name) {
            customersData.name = name;
        }

        if (phone && phone !== getCustomer.phone) {
            customersData.phone = phone;
        }

        if (number && number !== getCustomer.number) {
            customersData.number = number
        }

        if (zipcode && number && zipcode !== getCustomer.zipcode) {
            const dataViaCep = await viacep(zipcode);

            if (!dataViaCep) {
                return res.status(400).json({ message: "Erro get ZipCode" });
            }

            if (dataViaCep === undefined) {
                return res.status(400).json({ message: "Erro get ZipCode" });
            }

            customersData.address = dataViaCep.logradouro
            customersData.district = dataViaCep.bairro
            customersData.city = dataViaCep.localidade
            customersData.uf = dataViaCep.uf
        }

        if (complement && complement !== getCustomer.complement) {
            customersData.complement = complement
        }

        if (Object.keys(customersData).length === 0) {
            return res.status(400).json({ message: "No data to update!" });
        }

        customersData.updated = new Date();

        const createdCustomer = await knex('customers').where({ id: customerId }).update(customersData).returning('*');

        if (!createdCustomer) {
            return res.status(400).json({ message: "User not created!" });
        }

        logger.warn(`CustomerId: ${customerId} Updated`)
        return res.status(200).json({ message: "Customer Updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports = { edit }