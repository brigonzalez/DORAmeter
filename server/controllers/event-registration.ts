import {Response, Request} from 'express';
import {CREATED} from 'http-status';

import eventRegistrationService from '../services/api-services/event-registration-service';
import webServerErrorHandler from '../utils/web-server-error-handler';

export const handler = async ({body}: Request, response: Response) => {
    const {error} = await eventRegistrationService(body);

    if (error) {
        webServerErrorHandler(error, response);
    } else {
        response.status(CREATED).send();
    }
};

export const path = '/event';

export const method = 'post';
