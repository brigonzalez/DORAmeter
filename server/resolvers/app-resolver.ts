import graphqlErrorHandler from '../utils/graphql-error-handler';
import {getAppByAppName} from '../services/domain-services/app-service';

const mapToGQLResponse = (app: {app_id: string, name: string}) => ({
    id: app.app_id,
    name: app.name
});

export default async (_: any, {name}: {name: string}) => {
    const {error, app} = await getAppByAppName(name);

    if (error) {
        return graphqlErrorHandler(error);
    }

    return mapToGQLResponse(app);
};
