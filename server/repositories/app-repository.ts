import {getDBClient} from './database-connection';

const APP_TABLE = 'app';

export const selectAppByAppName = (appName: string) => {
    const dbClient = getDBClient();

    return dbClient
        .select('app_id', 'name')
        .from(APP_TABLE)
        .where({
            name: appName
        });
};
