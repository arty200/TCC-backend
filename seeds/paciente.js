exports.seed = function(knex) {

  return knex('pacientes').del().then(function () {
    return knex('pacientes').insert([
      {name: 'Rodrigo Gurgel',cpf:'18327965482',age:'25',weight:'63',sex:'M'}
    ])
  })
};


