'use strict';

const express = require('express');
const handler = require('./handler');

// App
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', [router]);

const filters = {
    pageNumber: 1,
    pageSize: 10,
    from : 1000, 
    to: 1500, 
    region: 'Asia',
    sort:{name: 'desc'}
};

app.get ('/test', async (req, res) => {
    const api = await handler.search(filters);
    res.json(api);
});

// Constants
const PORT = 4000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
module.exports = app ;
