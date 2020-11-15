import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        database: 'retomada',
        user:     'postgres',
        password: 'postgres'
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