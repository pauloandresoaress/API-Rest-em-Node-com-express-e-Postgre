const Atendimentos = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', async (req, res)  => {
        await Atendimentos.list().then( result => {
            res.status(200).json(result)
        }).catch( err => {
            res.status(400).json(err)
        })
    });

    app.get('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.get(id, res);
    });

    app.post('/atendimentos', async (req, res)  => {
        await Atendimentos.create(req.body)
        .then( atendimento => {
            res.status(201).json(atendimento);
        })
        .catch( error => {
            res.status(400).json(error);
        })
    });

    app.put('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const atendimento = req.body;
        await Atendimentos.update(id, atendimento, res);
    });

    app.delete('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.delete(id, res);
    });
}