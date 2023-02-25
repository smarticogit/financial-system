const jwt = require('jsonwebtoken');
const knex = require('../../conexao');
const secretKey = require('../../hash');
const logger = require('../../utils/logger');

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const foundUser = await knex('users').where({ email }).first();

        if (!foundUser) {
            return res.status(401).json({ mensagem: "User does not exist" })
        }

        const token = jwt.sign(
            {
                userId: foundUser.id,
                userName: foundUser.name
            }, secretKey,
            {
                expiresIn: 1000
            }
        );

        const { password: _, ...user } = foundUser;

        logger.info(`User ${user.name} logged`)

        return res.status(200).json({ user, token })
    } catch (error) {
        return res.status(500).json({ message: `Server Error - ${error.message}` })
    }
}

module.exports = { login }