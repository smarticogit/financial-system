const knex = require('../../conexao');
const viacep = require('../../utils/viacep');
const logger = require('../../utils/logger');

const create = async (req, res) => {
    const { name, email, cpf, phone, zipcode, number, complement } = req.body;

    if (!name || !email || !cpf || !phone) {
        return res.status(400).json({ message: "The fields NAME, EMAIL, CPF and Phone are mandatory" });
    }

    try {
        const alreadyCustomersEmail = await knex('customers').where({ email }).first();
        const alreadyCustomersCPF = await knex('customers').where({ cpf }).first();

        if (alreadyCustomersEmail) {
            logger.warn(`error when trying to create customer: ${email} already exists`)
            return res.status(400).json({ message: "Email already exists" });
        };

        if (alreadyCustomersCPF) {
            return res.status(400).json({ message: "CPF already exists" });
        };

        const userCurrent = req.user;

        const dataViaCep = await viacep(zipcode);

        if (!dataViaCep) {
            return res.status(400).json({ message: "Erro get ZipCode" });
        }

        const customersData =
        {
            name,
            email,
            cpf,
            phone,
            zipcode,
            address: dataViaCep.logradouro,
            number,
            complement,
            district: dataViaCep.bairro,
            city: dataViaCep.localidade,
            uf: dataViaCep.uf,
            created: new Date(),
            updated: new Date(),
            createdby: userCurrent.name
        }

        const createdCustomer = await knex('customers').insert(customersData).returning('*');

        if (!createdCustomer) {
            return res.status(400).json({ message: "User not created!" });
        }

        return res.status(200).json({ message: "Customer Created" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { create }