import appResolver from './app-resolver';
import deploymentFrequencyResolver from './deployment-frequency-resolver';

export default ({
    App: {
        deploymentFrequency: deploymentFrequencyResolver
    },
    Query: {
        app: appResolver
    }
});
