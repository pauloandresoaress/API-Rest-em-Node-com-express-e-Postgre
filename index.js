const customExpress = require('./config/custom-express');
const conexao = require('./database/conexao')();
const tabelas = require('./database/tabelas');
const port = '3000';
const app = customExpress();
console.log('Conexao no banco bem sucedida.');
tabelas.init(conexao);
app.listen(port, () => {
    console.log(`Server running in ${port}`);
});


