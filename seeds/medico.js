const bcrypt = require('bcrypt-nodejs')

exports.seed = function(knex) {
  const salt = bcrypt.genSaltSync(10)
  const encryptedPassword = bcrypt.hashSync('123456', salt)

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Rodrigo BussyNess', email:'nessquick@grdelicia.com',cpf:'96325874153',especiality:'ZOEIRA',password:encryptedPassword}
      ]);
    });
};

return knex('pacientes').del().then(function () {
  return knex('pacientes').insert([
    {name: 'Rodrigo Gurgel',cpf:'18327965482',age:'25',weight:'63',sex:'M'}
  ])
})
