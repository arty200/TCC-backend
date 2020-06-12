
module.exports = app => {
    app.api.get('/',app.api.user.test)
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)
        .patch(app.api.user.getNumber)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/pacientes')
        .all(app.config.passport.authenticate())
        .get(app.api.paciente.get)
        .post(app.api.paciente.save)
        .patch(app.api.paciente.getNumber)

    /*
    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)*/

    app.route('/pacientes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.paciente.getById)
        .put(app.api.paciente.save)
        .delete(app.api.paciente.remove)

    app.route('/pesagem')
        //.all(app.config.passport.authenticate())
        .get(app.api.pesagem.get)
        .post(app.api.pesagem.save)

    app.route('/pesagem/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.pesagem.getById)
        .put(app.api.pesagem.save)
        .delete(app.api.pesagem.remove)

    app.route('/pacientes/:id/pesagem')
        .all(app.config.passport.authenticate())
        //.get(app.api.pesagem.getByPaciente)
        .get(app.api.pesagem.getByPacientId)

}