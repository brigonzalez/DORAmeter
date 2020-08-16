import {Response, Request} from 'express';
import {CREATED} from 'http-status';

import eventRegistrationService from '../services/event-registration-service';

export const handler = async ({body}: Request, response: Response) => {
    await eventRegistrationService(body);

    response.status(CREATED).send();
};

export const path = '/event';

export const method = 'post';
