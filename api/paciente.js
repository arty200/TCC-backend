module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        /*const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }*/

        const paciente = { ...req.body}
        if(req.params.id) paciente.id = req.params.id

        try {

            existsOrError(paciente.name, 'Nome não informado')
            existsOrError(paciente.cpf, 'CPF não informado')
            existsOrError(paciente.age, 'idade não informada')
            existsOrError(paciente.weight, 'Peso inicial não informado')
            existsOrError(paciente.sex, 'Sexo não informado')

            const pacienteFromDB = await app.db('pacientes')
                .where({ cpf: paciente.cpf }).first()
            if(!paciente.id) {
                notExistsOrError(pacienteFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(paciente.id) {
            app.db('pacientes')
                .update(paciente)
                .where({ id: paciente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('pacientes')
                .insert(paciente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Paciente não informado.')

            const rowsDeleted = await app.db('pacientes')
                .where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Paciente não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    //A PRINCIPIO NÃO É NECESSÁRIO
    /*
    const withPath = pacientes => {
        const getParent = (pacientes, parentId) => {
            const parent = pacientes.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const pacientessWithPath = pacientes.map(paciente => {
            let path = paciente.name
            let parent = getParent(pacientes, paciente.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(pacientes, parent.parentId)
            }

            return { ...paciente, path }
        })

        pacientessWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return pacientessWithPath
    }
    */

   const limit = 10 // usado para paginação
    const get = async (req, res) => {

        const page = req.query.page || 1

        const result = await app.db('pacientes').count('id').first()
        const count = parseInt(result.count)

        app.db('pacientes')
            .select('id','name','cpf','age','weight','sex','info','imageUrl')
            .limit(limit).offset(page * limit - limit)
            .then(pacientes => res.json({data: pacientes, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const getNumber = (req,res) => {
        app.db('pacientes')
                .count()
                .then(pacientes => res.json(pacientes))
                .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db('pacientes')
            .where({ id: req.params.id })
            .first()
            .then(paciente => res.json(paciente))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById,getNumber }
}