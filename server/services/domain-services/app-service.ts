import {selectAppByAppName, insertApp} from '../../repositories/app-repository';
import {logError} from '../../server-infra/logger-service';

export interface getAppByAppNameFromRepository {
    (name: string): Promise<{
        app_id: string,
        name: string
    }>
}

export const getAppByAppName = async (appName: string) => {
    try {
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

export const createApp = (appName: string) =>
    insertApp({name: appName});
