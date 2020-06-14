// Update with your config settings.

//Para ser exportado, build de produção
db = {

  development : {
    client: 'postgresql',
    connection: {
      database: 'cadastro',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection:process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    },
  }

};

module.exports = db.production


//Rodar com nodemon localHost
/*module.exports = {

    client: 'postgresql',
    connection: {
      database: 'cadastro',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};*/
