import {getAppByAppName} from '../services/domain-services/app-service';

export default (_: any, {name}: {name: string}) =>
    getAppByAppName(name);
