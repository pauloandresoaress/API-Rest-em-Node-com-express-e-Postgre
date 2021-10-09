const conexao = require('../infrastructure/database/conexao')();
const repositorio = require('../repository/atendimento')
class Atendimentos {
    constructor(){
        this.dataEhValida = ({data, data_criacao}) => {
            return data.getTime() >= data_criacao.getTime();
        } 
        this.clienteEhValido = (cliente) => cliente.length >= 5;
        this.validacoes = [
            { 
                error:"data",
                valido:this.dataEhValida,
                message:"A data de agendamento deve ser maior que a data de criação"
            },
            {
                error:"cliente",
                valido:this.clienteEhValido, 
                message:"O nome do cliente deve possuir no mínimo 5 caracteres"
            }
        ];
    }
    async create(atendimento){
        const atendimentoTratado = tratarAtendimento(atendimento);
        if(atendimentoTratado.isError){
            return atendimentoTratado.errors
        }else{
            atendimento = atendimentoTratado.atendimento;
            return await repositorio.create(atendimento)
            .then( result => {
                return result[0];
            })
            .catch( error => {
                return { erro: error }
            })
        } 
    }

    async list(res){
        return repositorio.lista()
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
    const params = {
        data:{data, data_criacao},
        cliente:atendimento.cliente
    }
    const verificaValidacoes = this.validacoes(params).filter( validacao => !validacao.valido );
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