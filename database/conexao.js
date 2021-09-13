const { Client } = require('pg');
module.exports = () => {
    const sqlConfig = {
        user: 'pauloandre',
        host: 'localhost',
        database: 'petshop',
        password: '512981'
    }
    const client = new Client(sqlConfig);
    client.connect();
    return client;
}