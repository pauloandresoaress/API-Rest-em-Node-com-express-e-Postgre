const { Client } = require('pg');
const sqlConfig = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PWD
}
const client = new Client(sqlConfig);
(async () => await client.connect())();
const executeQuery = async (query) => {
    return await client.query(query)
    .then((result) => {
        return result.rows;    
    }).catch((err) => {
        console.error(err)
    });
}

module.exports = {
    executeQuery
}