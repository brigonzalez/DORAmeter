import {getRowFromRepository} from '../services/healthz-services';

import {getDBClient} from './database-connection';

export const selectOne: getRowFromRepository = async () => {
    const dbClient = getDBClient();

    await dbClient.select(1);
};
