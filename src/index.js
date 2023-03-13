const express = require('express');
const routers = require('../src/routers');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(routers);

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log(`Running Server in port: ${PORT}`)
});
