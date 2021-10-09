const query = require('../infrastructure/database/queries');

class Atendimento {
    async create(atendimento){
        const sql = `INSERT INTO ATENDIMENTOS(CLIENTE, PET, SERVICO, STATUS, OBSERVACOES, DATA, DATA_CRIACAO) VALUES ('${atendimento.cliente}','${atendimento.pet}','${atendimento.servico}','${atendimento.status}','${atendimento.observacoes}','${atendimento.data}','${atendimento.data_criacao}') RETURNING *;`;
        return await query.executeQuery(sql);
    }

    async lista(){
        const sql = `SELECT * FROM ATENDIMENTOS`;
        return await query.executeQuery(sql);
    }
}

module.exports = new Atendimento