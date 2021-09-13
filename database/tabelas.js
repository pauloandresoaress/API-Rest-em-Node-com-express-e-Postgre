class Tabelas {
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ATENDIMENTOS(
            ID SERIAL PRIMARY KEY,
            CLIENTE VARCHAR(50) NOT NULL,
            PET VARCHAR(20),
            SERVICO VARCHAR(20) NOT NULL,
            STATUS VARCHAR(20) NOT NULL,
            DATA TIMESTAMP NOT NULL,
            DATA_CRIACAO TIMESTAMP NOT NULL,
            OBSERVACOES TEXT
        )`;
        this.conexao.query(sql, (error) => {
            if(error) console.error(error);
        })
    }
}

module.exports = new Tabelas