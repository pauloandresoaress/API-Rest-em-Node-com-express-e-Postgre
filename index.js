const customExpress = require('./config/custom-express');
const conexao = require('./infrastructure/database/conexao');
const tabelas = require('./infrastructure/database/tabelas');
const port = '3000';
const app = customExpress();
console.log('Conexao no banco bem sucedida.');
conexao()
.then( conn => tabelas.init(conn)).catch( err => console.error(err))
app.listen(port, () => {
    console.log(`Server running in ${port}`);
});


