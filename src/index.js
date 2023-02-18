const express = require('express');
const routers = require('../src/routers');

const app = express();
app.use(express.json());
app.use(routers);

app.listen(3000, () => {
    console.log('Running Server')
});
