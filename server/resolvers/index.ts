import appResolver from './app-resolver';
import deploymentFrequencyResolver from './deployment-frequency-resolver';

export default ({
    deploymentFrequency: deploymentFrequencyResolver,
    Query: {
        app: appResolver
    }
});
