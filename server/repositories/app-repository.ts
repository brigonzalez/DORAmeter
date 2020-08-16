import {getAppFromRepository, createAppInRepository} from '../services/app-service';

import {getDBClient} from './database-connection';

const APP_TABLE = 'app';

export const selectAppByAppName: getAppFromRepository = async (name) => {
    const dbClient = getDBClient();
    const [app] = await dbClient
        .select('app_id', 'name')
        .from(APP_TABLE)
        .where({
            name
        });

    return app;
};

export const insertApp: createAppInRepository = async (app) => {
    const dbClient = getDBClient();
    const [createdApp] = await dbClient
        .returning('*')
        .insert(app)
        .into(APP_TABLE);

    return createdApp;
};
