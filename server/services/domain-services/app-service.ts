import {selectAppByAppName, insertApp} from '../../repositories/app-repository';
import {logError, logInfo} from '../../server-infra/logger-service';

export interface getAppByAppNameFromRepository {
    (name: string): Promise<{
        app_id: string,
        name: string
    }>
}

export const getAppByAppName = async (appName: string) => {
    try {
        logInfo(`Selecting app by app name: appName: ${JSON.stringify(appName, null, 2)}`);
        const app = await selectAppByAppName(appName);

        return {
            app,
            error: null
        };
    } catch (error) {
        logError(error);

        return error;
    }
};

export interface createAppInRepository {
    (app: {
        name: string
    }): Promise<{
        app_id: string,
        name: string
    }>
}

export const createApp = (appName: string) => {
    logInfo(`Inerting app: ${appName}`);

    return insertApp({name: appName});
};
