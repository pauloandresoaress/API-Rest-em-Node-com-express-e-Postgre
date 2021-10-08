// if(process.env.NODE_ENVIRONMENT == 'DEV')
require('dotenv/config');
const { Client } = require('pg');
module.exports = () => {
    const sqlConfig = {
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PWD
    }
    const client = new Client(sqlConfig);
    client.connect();
    return client;
}