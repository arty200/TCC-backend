const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
var port = process.env.PORT || 3000
//const mongoose = require('mongoose')

//require('./config/mongodb')

app.db = db
//app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


app.get("/", (req,res) => {
    console.log("Envinado resposta")
    res.send("Oi, funcionou")
})


app.listen( port ,() => {
    console.log('Escutando na porta '+ port)
})