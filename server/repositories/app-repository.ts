import {getAppByAppNameFromRepository, createAppInRepository} from '../services/domain-services/app-service';

import {getDBClient} from './database-connection';

const APP_TABLE = 'app';
const dbClient = getDBClient();

export const selectAppByAppName: getAppByAppNameFromRepository = async (name) => {
    const [app] = await dbClient
        .select('app_id', 'name')
        .from(APP_TABLE)
        .where({
            name
        });

    return app;
};

export const insertApp: createAppInRepository = async (app) => {
    const [createdApp] = await dbClient
        .returning('*')
        .insert(app)
        .into(APP_TABLE);

    return createdApp;
};
