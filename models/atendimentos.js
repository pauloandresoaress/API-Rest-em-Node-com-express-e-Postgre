const conexao = require('../database/conexao')();
class Atendimentos {
    async create(atendimento, res){
        const atendimentoTratado = tratarAtendimento(atendimento);
        if(atendimentoTratado.isError){
            res.status(400).json(atendimentoTratado.errors);
        }else{
            atendimento = atendimentoTratado.atendimento;
            const sql = `INSERT INTO ATENDIMENTOS(CLIENTE, PET, SERVICO, STATUS, OBSERVACOES, DATA, DATA_CRIACAO) VALUES ('${atendimento.cliente}','${atendimento.pet}','${atendimento.servico}','${atendimento.status}','${atendimento.observacoes}','${atendimento.data}','${atendimento.data_criacao}') RETURNING ID;`;
            await conexao.query(sql)
            .then( result => {
                res.status(201).json({ id:result.rows[0].id,...atendimento })
            })
            .catch( error => {
                res.status(400).json({ erro: error });
            });
        } 
    }

    async list(res){
        const sql = `SELECT * FROM ATENDIMENTOS`;
        await conexao.query(sql)
        .then( result => {
            res.status(200).json(result.rows);
        })
        .catch( err => {
            res.status(400).json({ erro: err });
        })
    }

    async get(id, res){
        const sql = `SELECT * FROM ATENDIMENTOS WHERE ID = '${id}'`;
        await conexao.query(sql)
        .then( result => {
            res.status(200).json(result.rows[0]);
        })
        .catch( err => {
            res.status(400).json({ erro: err });
        })
    }

    async update(id, atendimento, res){
        const atendimentoTratado = tratarAtendimento(atendimento);
        if(atendimentoTratado.isError){
            res.status(400).json(atendimentoTratado.errors);
        }else{
            const atendimento = atendimentoTratado.atendimento;
            const sql = `UPDATE ATENDIMENTOS SET CLIENTE = '${atendimento.cliente}', PET='${atendimento.pet}', SERVICO='${atendimento.servico}', STATUS='${atendimento.status}', OBSERVACOES='${atendimento.observacoes}', DATA='${atendimento.data}' WHERE ID = '${id}'`;
            await conexao.query(sql)
            .then( result => {
                res.status(200).json({id,...atendimento});
            })
            .catch( error => {
                res.status(400).json({ error })
            })
        }
    }

    async delete(id, res){
        const query = `DELETE FROM ATENDIMENTOS WHERE ID = '${id}' RETURNING * `;
        conexao.query(query)
        .then( result => {
            res.status(200).json(result.rows[0])
        })
        .catch( error => {
            res.status(400).json({ error })
        });
    }
}

function tratarDataParaYYYYMMDD(data){
    return data.replace(/(\d{2})\/(\d{2})\/(\d{4})/g,'$3/$2/$1');
}

function tratarAtendimento(atendimento){
    let data_criacao = new Date();
    let data = new Date(tratarDataParaYYYYMMDD(atendimento.data));
    const dataEhValida =  data.getTime() >= data_criacao.getTime();
    const clienteEhValido = atendimento.cliente.length >= 5;
    const validacoes = [
        { 
            error:"data",
            valido:dataEhValida,
            message:"A data de agendamento deve ser maior que a data de criação"
        },
        {
            error:"cliente",
            valido:clienteEhValido, 
            message:"O nome do cliente deve possuir no mínimo 5 caracteres"
        }
    ];
    const verificaValidacoes = validacoes.filter( validacao => !validacao.valido );
    if(verificaValidacoes.length){
        return { isError:true, errors:verificaValidacoes}
    }else{
        return {
            isError:false,
            atendimento:{
                ...atendimento, 
                data_criacao:data_criacao.toLocaleString(), 
                data:data.toLocaleString()
            }
        }    
    }
}

module.exports = new Atendimentos;