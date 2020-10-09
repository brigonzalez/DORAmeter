import config from 'config';
import Chance from 'chance';
import knex from 'knex';
import {when} from 'jest-when';

import {getDBClient} from '../../../server/repositories/database-connection';

jest.mock('knex');
jest.mock('config');

describe('database connection', () => {
    const chance = new Chance();

    describe('getDBClient', () => {
        let expectedKnexClient: string,
            expectedPGConnectionString: string;

        beforeEach(() => {
            expectedKnexClient = chance.string();
            expectedPGConnectionString = chance.string();
            (knex as unknown as jest.Mock).mockReturnValue(expectedKnexClient);
            when(config.get).calledWith('pg-connection-string').mockReturnValue(expectedPGConnectionString);
        });

        test('should create and return the postgres client', () => {
            const actualDBClient = getDBClient();

            expect(expectedKnexClient).toBe(actualDBClient);
            expect(knex).toHaveBeenCalledTimes(1);
            expect(knex).toHaveBeenCalledWith({
                client: 'pg',
                connection: expectedPGConnectionString,
                searchPath: ['dorameter']
            });
        });

        test('should create the postgres client just once', () => {
            getDBClient();
            getDBClient();

            expect(knex).toHaveBeenCalledTimes(1);
        });
    });
});
