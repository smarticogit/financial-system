const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Hello')
});

app.listen(3000);
