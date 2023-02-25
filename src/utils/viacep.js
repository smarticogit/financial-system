const axios = require('axios');
const logger = require('../utils/logger');

const getzipcode = async (zipcode) => {

    try {
        const result = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
        
        logger.info(`Getting zipcode`)
        return result.data;
    } catch (error) {
        return null;
    }
}

module.exports = getzipcode