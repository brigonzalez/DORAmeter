import resolvers from '../../../server/resolvers';

describe('resolvers', () => {
    test('should output correct Query function', () => {
        expect(resolvers.Query.teams()).toStrictEqual({});
    });
});
