import {startServer} from './web-server';
import {handler as healthzController} from './controllers/healthz';

const checkHealth = () => healthzController();

(async () => {
    await checkHealth();
    startServer();
})();
