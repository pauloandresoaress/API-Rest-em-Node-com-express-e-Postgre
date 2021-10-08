const conexao = require('../database/conexao')();
const uploadDeArquivo = require('../archives/uplopadImage');
class Pet{
    create(pet, res){
        uploadDeArquivo(pet.image, pet.name, (error, newPath) => {
            if(error){
                res.status(400).json({ erro: error });
            }else{
                const newPet = { name:pet.name, image:newPath }
                const query = `INSERT INTO PETS(NOME, IMAGEM) VALUES('${newPet.name}','${newPet.image}') RETURNING *`;
                conexao.query(query)
                .then( result => {
                    res.status(201).json({...result.rows[0]});
                }).catch( error => {
                    res.status(400).json({ erro: error });
                });
            }
        })
    }
}

module.exports = new Pet