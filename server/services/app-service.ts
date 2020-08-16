import {selectAppByAppName, insertApp} from '../repositories/app-repository';

export interface getAppFromRepository {
    (name: string): Promise<{
        app_id: string,
        name: string
    }>
}

export const getAppByAppName = (appName: string) =>
    selectAppByAppName(appName);

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
