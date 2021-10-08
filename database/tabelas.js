class Tabelas {
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarPets()
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
            if(error) 
                console.error(error);
            else
                console.log("Tabela ATENDIMENTOS está pronta!");
        })
    }

    criarPets(){
        const query = `CREATE TABLE IF NOT EXISTS PETS(
            ID SERIAL PRIMARY KEY,
            NOME VARCHAR(50),
            IMAGEM VARCHAR(200)
        )`;

        this.conexao.query(query, error => {
            if(error)
                console.error(error)
            else
                console.log("Tabela PETS está pronta!");
        });
    }
}

module.exports = new Tabelas