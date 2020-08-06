import Chance from 'chance';
import ReactDOM from 'react-dom';

import dataProvider from '../../client/data-provider';
import {UserList} from '../../client/components/users';

jest.mock('react-dom');
jest.mock('../../client/components/users');
jest.mock('../../client/data-provider');

describe('client', () => {
    const chance = new Chance();

    let expectedApp,
        expectedSelectedDOMElement;

    beforeAll(() => {
        expectedSelectedDOMElement = chance.string();
        document.querySelector = jest.fn().mockReturnValue(expectedSelectedDOMElement);

        require('../../client/client');

        expectedApp = ReactDOM.render.mock.calls[0][0];
    });

    describe('react-admin component', () => {
        test('should do render Admin component from react-admin', () => {
            const adminComponent = expectedApp.type();

            expect(adminComponent.props.dataProvider).toStrictEqual(dataProvider);

            const resourceComponent = adminComponent.props.children;

            expect(resourceComponent.props.name).toBe('users');
            expect(resourceComponent.props.list).toBe(UserList);
        });
    });

    describe('selected element for rendering DOM', () => {
        test('should select the correct component for rendering', () => {
            expect(ReactDOM.render.mock.calls[0][1]).toBe(expectedSelectedDOMElement);
            expect(document.querySelector).toHaveBeenCalledTimes(1);
            expect(document.querySelector).toHaveBeenCalledWith('#app');
        });
    });
});
