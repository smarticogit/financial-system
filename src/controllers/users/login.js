const jwt = require('jsonwebtoken');
const knex = require('../../conexao');
const secretKey = require('../../hash');

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const foundUser = await knex('users').where({ email }).first();

        const token = jwt.sign(
            {
                userId: foundUser.id,
                userName: foundUser.name
            }, secretKey,
            {
                expiresIn: '1h'
            }
        );

        const { password: _, ...user } = foundUser;

        return res.status(200).json({ user, token })
    } catch (error) {
        return res.status(500).json({ message: `Server Error - ${error.message}` })
    }
}

module.exports = { login }