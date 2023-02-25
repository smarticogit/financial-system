const jwt = require('jsonwebtoken');
const knex = require('../conexao');
const secretKey = require('../hash');

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { userId } = jwt.verify(token, secretKey);

        const userFound = await knex('users').where('id', userId).first();

        const { password: _, ...user } = userFound;

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: `Unauthenticated - ${error.message}` });
    }
}

module.exports = authentication;