import knex from 'knex';

const db = knex({
    client: 'mysql',
    connection: {
        database: 'retomada',
        user:     'root',
        password: 'masterkey4191'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
});

export default db;