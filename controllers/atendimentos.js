const Atendimentos = require('../models/atendimentos');
module.exports = app => {
    app.get('/atendimentos', async (req, res)  => {
        await Atendimentos.list(res);
    });

    app.get('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        Atendimentos.get(id, res);
    });

    app.post('/atendimentos', async (req, res)  => {
        await Atendimentos.create(req.body, res);
    });

    app.patch('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const atendimento = req.body;
        await Atendimentos.update(id, atendimento, res);
    })
}