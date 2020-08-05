import Chance from 'chance';

import {selectOne} from '../../../server/repositories/healthz-repository';
import {areRepositoriesHealthy} from '../../../server/services/healthz-services';

jest.mock('../../../server/repositories/healthz-repository');

describe('healthz services', () => {
    const chance = new Chance();

    describe('areRepositoriesHealthy', () => {
        test('should selectOne from the repositories', async () => {
            await areRepositoriesHealthy();

            expect(selectOne).toHaveBeenCalledTimes(1);
            expect(selectOne).toHaveBeenCalledWith();
        });
        describe('areRepositoriesHealthy returns successfully', () => {
            test('should selectOne from the repositories', async () => {
                const actualResponse = await areRepositoriesHealthy();

                expect(actualResponse).toBe(true);
            });
        });

        describe('areRepositoriesHealthy returns unsuccessfully', () => {
            let expectedError;

            beforeEach(() => {
                expectedError = chance.string();
                (selectOne as jest.Mock).mockRejectedValue(expectedError);
                jest.spyOn(console, 'error');
            });

            test('should selectOne from the repositories', async () => {
                const actualResponse = await areRepositoriesHealthy();

                expect(actualResponse).toBe(false);
                expect(console.error).toHaveBeenCalledTimes(1);
                expect(console.error).toHaveBeenCalledWith(expectedError);
            });
        });
    });
});
