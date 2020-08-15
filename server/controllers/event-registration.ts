import {Response, Request} from 'express';
import {CREATED} from 'http-status';

export const handler = ({body}: Request, response: Response) => {
    // TODO: call service functions to persist app and event

    response.status(CREATED).send();
};

export const path = '/';

export const method = 'post';
