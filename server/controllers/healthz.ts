import {Response, Request} from 'express';
import {OK} from 'http-status';

import {areRepositoriesHealthy} from '../services/healthz-services';

export const handler = async (_: Request, response: Response) => {
    const database = await areRepositoriesHealthy() ? 'OK' : 'Not OK';

    response.status(OK).send({
        database,
        server: 'OK'
    });
};

export const path = '/healthz';
