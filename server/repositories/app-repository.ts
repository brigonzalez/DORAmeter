import {getAppByAppNameFromRepository, createAppInRepository} from '../services/domain-services/app-service';

import {getDBClient} from './database-connection';

const APP_TABLE = 'app';

export const selectAppByAppName: getAppByAppNameFromRepository = async (name) => {
    const [app] = await getDBClient()
        .select('app_id', 'name')
        .from(APP_TABLE)
        .where({
            name
        });

    return app;
};

export const insertApp: createAppInRepository = async (app) => {
    const [createdApp] = await getDBClient()
        .returning('*')
        .insert(app)
        .into(APP_TABLE);

    return createdApp;
};
