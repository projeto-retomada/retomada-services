import knex from 'knex';

const db = knex({
    client: 'mysql',
    connection: {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'retomada'
    },
    pool: { min: 0, max: 7 }
});

export default db;