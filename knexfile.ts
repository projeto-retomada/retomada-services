import { Config } from "knex";
import path from 'path';

export const configuration: Config = {
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
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
}
export const development: Config = { ...configuration }
export const production: Config = { ...configuration }
