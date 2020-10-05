import knex from 'knex';

const db = knex({
    client: 'mysql',
    connection: {
        host:'localhost',
        user: 'root',
        password: 'masterkey4191',
        database: 'retomada'
    },
    pool: { min: 0, max: 12 }
});

export default db;