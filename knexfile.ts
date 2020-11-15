import { Config } from "knex";
import path from 'path';

export const configuration: Config = {
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user:     'postgres',
        password: 'postgresql',
        database: 'retomada'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
}
export const development: Config = { ...configuration }
export const production: Config = { ...configuration }
