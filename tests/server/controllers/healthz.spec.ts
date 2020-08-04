import {handler, path} from '../../../server/controllers/healthz';
import {selectOne} from '../../../server/repositories/healthz-repository';

jest.mock('../../../server/repositories/healthz-repository');

describe('healthz controller', () => {
    describe('handler', () => {
        test('should register correct healthz handler function', async () => {
            await handler();

            expect(selectOne)
                .toHaveBeenCalledTimes(1)
                .toHaveBeenCalledWith();
        });
    });

    describe('path', () => {
        test('should register correct healthz path', () => {
            expect(path).toBe('/healthz');
        });
    });
});
