import {getRowFromRepository} from '../services/api-services/healthz-services';

import {getDBClient} from './database-connection';

const dbClient = getDBClient();

export const selectOne: getRowFromRepository = () =>
    dbClient.select(1);
