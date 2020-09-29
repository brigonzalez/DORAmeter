import {getAppByAppName} from '../services/domain-services/app-service';

const mapToGQLResponse = (app: {app_id: string, name: string}) => ({
    id: app.app_id,
    name: app.name
});

export default async (_: any, {name}: {name: string}) => {
    const app = await getAppByAppName(name);

    return mapToGQLResponse(app);
};
