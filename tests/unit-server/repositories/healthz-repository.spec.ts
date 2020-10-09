import Chance from 'chance';

import {selectOne} from '../../../server/repositories/healthz-repository';
import {getDBClient} from '../../../server/repositories/database-connection';

jest.mock('../../../server/repositories/database-connection');

describe('healthz repositoy', () => {
    const chance = new Chance();

    afterEach(() => {
        jest.resetModules();
    });

    describe('selectOne', () => {
        let expectedDBClient: {select: any};

        beforeEach(() => {
            expectedDBClient = {
                select: jest.fn().mockResolvedValue(chance.string())
            };
            (getDBClient as jest.Mock).mockReturnValue(expectedDBClient);
        });

        test('should get the database client', async () => {
            await selectOne();

            expect(getDBClient).toHaveBeenCalledTimes(1);
            expect(getDBClient).toHaveBeenCalledWith();
        });

        test('should select 1 from the database', async () => {
            await selectOne();

            expect(expectedDBClient.select).toHaveBeenCalledTimes(1);
            expect(expectedDBClient.select).toHaveBeenCalledWith(1);
        });

        describe('select 1 throws and error', () => {
            let expectedError: string;

            beforeEach(() => {
                expectedError = chance.string();
                expectedDBClient.select.mockRejectedValue(expectedError);
                (getDBClient as jest.Mock).mockReturnValue(expectedDBClient);
            });

            test('should throw error if cannot select 1 from the database', async () => {
                try {
                    await selectOne();
                    fail('selectOne should have thrown error');
                } catch (error) {
                    expect(error).toBe(expectedError);
                }
            });
        });
    });
});
