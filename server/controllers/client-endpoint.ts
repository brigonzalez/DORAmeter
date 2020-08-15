import {Response, Request} from 'express';
import {OK} from 'http-status';

export const handler = ({body}: Request, response: Response) => {
    console.log(body);

    response.status(OK).send({});
};

export const path = '/';

export const method = 'post';
