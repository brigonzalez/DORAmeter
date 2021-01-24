import {getRowFromRepository} from '../services/controller-services/healthz-services';

import {getDBClient} from './database-connection';

export const selectOne: getRowFromRepository = () =>
    getDBClient().select(1);
