const bcrypt = require('bcrypt');
const knex = require('../../conexao');
const logger = require('../../utils/logger');

const create = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "The fields NAME, EMAIL, PASSWORD are mandatory" })
    }

    try {
        const alreadyUser = await knex('users').where({ email }).first();

        if (alreadyUser) {
            return res.status(400).json({ message: "Email already exists" });
        };

        const encrypt = await bcrypt.hash(password, 10);

        const data = {
            name,
            email,
            password: encrypt
        };

        const user = await knex('users').insert(data).returning('*');

        if (!user) {
            return res.status(400).json({ message: "User not created!" });
        }

        logger.info(`User ${user.name} Created`)
        return res.status(201).json("User Created")
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { create } 