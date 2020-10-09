import getDeploymentFrequency from '../services/api-services/deployment-frequency-service';

export default ({name}: {name: string}) =>
    getDeploymentFrequency(name);
