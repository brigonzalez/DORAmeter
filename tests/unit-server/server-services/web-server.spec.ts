import Chance from 'chance';
import express from 'express';

import {logInfo} from '../../../server/server-infra/logger-service';
import {registerGraphQL} from '../../../server/server-infra/graphql-server';
import {startServer} from '../../../server/server-infra/web-server';

jest.mock('express');
jest.mock('../../../server/server-infra/graphql-server');
jest.mock('../../../server/server-infra/logger-service');

describe('web server', () => {
    const chance = new Chance();

    describe('startServer', () => {
        let expectedExpressServer: any,
            expectedStaticContent: string;

        beforeEach(() => {
            expectedExpressServer = {
                [chance.string()]: chance.string(),
                get: jest.fn(),
                listen: jest.fn(),
                post: jest.fn(),
                use: jest.fn()
            };
            (express as unknown as jest.Mock).mockReturnValue(expectedExpressServer);
            expectedStaticContent = chance.string();
            // @ts-ignore
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
