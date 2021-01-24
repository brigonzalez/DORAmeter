import graphqlErrorHandler from '../utils/graphql-error-handler';
import {getAppByAppName, getAllApps} from '../services/domain-services/app-service';

const mapToAppGQLResponse = (app: {app_id: string, name: string}) => ({
    id: app.app_id,
    name: app.name
});

const mapToAppsGQLResponse = (apps: [{app_id: string, name: string}]) =>
    apps.map((app) => ({
        id: app.app_id,
        name: app.name
    }));

export const appByNameResolver = async (_: any, {name}: {name: string}) => {
    const {error, app} = await getAppByAppName(name);

    if (error) {
        return graphqlErrorHandler(error);
    }

    return mapToAppGQLResponse(app);
};

export const appsResolver = async () => {
    const {error, apps} = await getAllApps();

    if (error) {
        return graphqlErrorHandler(error);
    }

    return mapToAppsGQLResponse(apps);
};
