const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const pesagem = { ...req.body }
        let idPaciente
        if(req.params.id) pesagem.id = req.params.id

        try {
            existsOrError(pesagem.name, 'Nome não informado')
            existsOrError(pesagem.date, 'Data não informada')
            existsOrError(pesagem.weight, 'Peso não informado')
            existsOrError(pesagem.pacientesId, 'ID do paciente não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }
        //pode ser melhorado
        app.db('pacientes')
            .where({ id: pesagem.pacientesId })
            .then(idPaciente = pesagem.pacientesId)
            .catch(err => res.status(500).send(err))

        try {
            existsOrError(idPaciente, 'ID não compativel com o de nenhum paciente')
        }catch(msg){
            res.status(400).send(msg)
        }

        if(pesagem.date == 'x'){
            pesagem.date= new Date();
        }

        

        if(pesagem.id) {
            app.db('pesagem')
                .update(pesagem)
                .where({ id: pesagem.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pesagem')
                .insert(pesagem)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('pesagem')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Pesagem não foi encontrada.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('pesagem').count('id').first()
        const count = parseInt(result.count)

        app.db('pesagem')
            .select('id', 'name', 'date', 'weight','pacientesId')
            .limit(limit).offset(page * limit - limit)
            .then(pesagem => res.json({ data: pesagem, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('pesagem')
            .where({ id: req.params.id })
            .first()
            .then(pesagem => {
                return res.json(pesagem)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByPacientId = async (req,res) => {
        const page = req.query.page || 1
        
        app.db('pesagem')
                .select('id','name','date','weight')
                .where({ pacientesId: req.params.id })
                .then(pesagem => {
                    return res.json(pesagem)
                })
                .catch(err => res.status(500).send(err))
        
    }


    return { save, remove, get, getById, getByPacientId }
}