import Chance from 'chance';

import {logError} from '../../../../server/server-infra/logger-service';
import {selectOne} from '../../../../server/repositories/healthz-repository';
import {areRepositoriesHealthy} from '../../../../server/services/api-services/healthz-services';

jest.mock('../../../../server/repositories/healthz-repository');
jest.mock('../../../../server/server-infra/logger-service');

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
            let expectedError: string;

            beforeEach(() => {
                expectedError = chance.string();
                (selectOne as jest.Mock).mockRejectedValue(expectedError);
            });

            test('should selectOne from the repositories', async () => {
                const actualResponse = await areRepositoriesHealthy();

                expect(actualResponse).toBe(false);
                expect(logError).toHaveBeenCalledTimes(1);
                expect(logError).toHaveBeenCalledWith(expectedError);
            });
        });
    });
});
