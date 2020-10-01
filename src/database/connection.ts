import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        host:'ec2-34-234-185-150.compute-1.amazonaws.com',
        user: 'uyzucgnwapnnyi',
        password: '30213ddd10c8d91cb767a9edbce497915c1e2aa0f513d18b7a2c454759e4eea0',
        database: 'd7hq8r6v8rnbjf'
    },
    pool: { min: 0, max: 7 }
});

export default db;