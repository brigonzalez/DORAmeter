import Chance from 'chance';
import express from 'express';

import {logInfo} from '../../../server/server-services/logger-service';
import {registerGraphQL} from '../../../server/server-services/graphql-server';
import {startServer} from '../../../server/server-services/web-server';

jest.mock('express');
jest.mock('../../../server/server-services/graphql-server');
jest.mock('../../../server/server-services/logger-service');

describe('web server', () => {
    const chance = new Chance();

    describe('startServer', () => {
        let expectedExpressServer,
            expectedStaticContent;

        beforeEach(() => {
            expectedExpressServer = {
                [chance.string()]: chance.string(),
                get: jest.fn(),
                listen: jest.fn(),
                post: jest.fn(),
                use: jest.fn()
            };
            (express as jest.Mock).mockReturnValue(expectedExpressServer);
            expectedStaticContent = chance.string();
            express.static = jest.fn().mockReturnValue(expectedStaticContent);
        });

        test('should register graphql', async () => {
            await startServer();

            expect(registerGraphQL).toHaveBeenCalledTimes(1);
            expect(registerGraphQL).toHaveBeenCalledWith(expectedExpressServer);
        });

        test('should register client', async () => {
            await startServer();

            expect(expectedExpressServer.use).toHaveBeenCalledWith(expectedStaticContent);
            expect(express.static).toHaveBeenCalledTimes(1);
            expect(express.static).toHaveBeenCalledWith('dist-client');
        });

        test('should start listening to requests', async () => {
            const PORT = 4444;

            await startServer();

            expect(expectedExpressServer.listen).toHaveBeenCalledTimes(1);
            expect(expectedExpressServer.listen).toHaveBeenCalledWith(PORT, expect.any(Function));

            const listenFunction = expectedExpressServer.listen.mock.calls[0][1];

            listenFunction();
            expect(logInfo).toHaveBeenCalledTimes(1);
            expect(logInfo).toHaveBeenCalledWith(`🚀 Server ready on port ${PORT}`);
        });
    });
});
