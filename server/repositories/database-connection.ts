import config from 'config';
import knex from 'knex';

let pgClient: knex | null = null;

const createPGClient = (): knex =>
    knex({
        client: 'pg',
        connection: config.get('pg-connection-string'),
        searchPath: ['dorameter']
    });

export const getDBClient = (): knex => {
    if (!pgClient) {
        pgClient = createPGClient();

        return pgClient;
    }

    return pgClient;
};
