import { Config } from "knex";
import path from 'path';

export const configuration: Config = {
    client: 'mysql',
    connection: {
        host:'localhost',
        user: 'root',
        password: '',
        database: 'retomada'
    },
    pool: { min: 0, max: 7 },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
}
export const development: Config = { ...configuration }
export const production: Config = { ...configuration }