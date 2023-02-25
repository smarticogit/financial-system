const knex = require('../../conexao');
const secretKey = require('../../hash');
const bcrypt = require('bcrypt');

const edit = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid values in fields' });
    }

    try {
        const user = await knex('users').where({ email }).first();

        const { id } = req.user

        if (user && user.id !== id) {
            return res.status(400).json({ message: 'Email has exists' });
        }

        let newPassword = '';
        let newData = {
            name: name || null,
            email
        }

        if (password) {
            newPassword = await bcrypt.hash(password, 10);
            newData.password = newPassword;
        }

        await knex("users")
            .where({ id })
            .update(newData)
            .returning("*");

        return res.status(200).json({ message: 'Edit User Success!' });
    } catch (error) {
        return res.status(400).json({ message: `Error - ${error.message}` });
    }
}

module.exports = { edit };