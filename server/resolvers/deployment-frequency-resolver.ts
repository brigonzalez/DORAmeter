import graphqlErrorHandler from '../utils/graphql-error-handler';
import getDeploymentFrequency from '../services/controller-services/deployment-frequency-service';

export default async ({name}: {name: string}) => {
    const {error, ...deploymentFrequency} = await getDeploymentFrequency(name);

    if (error) {
        return graphqlErrorHandler(error);
    }

    return deploymentFrequency;
};
