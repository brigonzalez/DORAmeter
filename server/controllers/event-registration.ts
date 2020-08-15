import {Response, Request} from 'express';
import {CREATED} from 'http-status';

export const handler = (_: Request, response: Response) => {
    response.status(CREATED).send();
};

export const path = '/event';

export const method = 'post';
