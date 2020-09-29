import {getRowFromRepository} from '../services/api-services/healthz-services';

import {getDBClient} from './database-connection';

export const selectOne: getRowFromRepository = () =>
    getDBClient().select(1);
