import Chance from 'chance';
import express from 'express';

import {registerGraphQL} from '../../../server/server-services/graphql-server';
import {startServer} from '../../../server/server-services/web-server';

jest.mock('express');
jest.mock('../../../server/server-services/graphql-server');

describe('web server', () => {
    const chance = new Chance();

    describe('startServer', () => {
        let expectedExpressServer,
            expectedStaticContent;

        beforeEach(() => {
            expectedExpressServer = {
                listen: jest.fn(),
                use: jest.fn(),
                [chance.string()]: chance.string()
            };
            (express as jest.Mock).mockReturnValue(expectedExpressServer);
            expectedStaticContent = chance.string();
            express.static = jest.fn().mockReturnValue(expectedStaticContent);
            jest.spyOn(console, 'log');
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
            const PORT = 4000;

            await startServer();

            expect(expectedExpressServer.listen).toHaveBeenCalledTimes(1);
            expect(expectedExpressServer.listen).toHaveBeenCalledWith(PORT, expect.any(Function));

            const listenFunction = expectedExpressServer.listen.mock.calls[0][1];

            listenFunction();
            expect(console.log).toHaveBeenCalledTimes(1);
            expect(console.log).toHaveBeenCalledWith(`🚀 Server ready on port ${PORT}`);
        });
    });
});
