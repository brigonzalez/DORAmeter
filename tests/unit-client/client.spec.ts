import Chance from 'chance';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';

import Header from '../../client/components/Header';
import Apps from '../../client/components/Apps';

jest.mock('react-dom');
jest.mock('../../client/components/Header');
jest.mock('../../client/components/Apps');

// TODO: Switch out React tests to use RTL
describe('client', () => {
    const chance = new Chance();

    let expectedSelectedDOMElement: string,
        expectedRoot: any,
        expectedHeader: any,
        expectedAppDetails: any;

    const cacheChildren = (expectedApp: any) => {
        expectedRoot = expectedApp.type();
        [expectedHeader, expectedAppDetails] = expectedRoot.props.children;
    };

    beforeAll(() => {
        expectedSelectedDOMElement = chance.string();
        document.querySelector = jest.fn().mockReturnValue(expectedSelectedDOMElement);

        require('../../client/client');

        const expectedApp = (ReactDOM.render as jest.Mock).mock.calls[0][0];

        cacheChildren(expectedApp);
    });

    describe('react-admin component', () => {
        test('should render div as root component', () => {
            expect(expectedRoot.type).toBe(Fragment);
        });

        test('should render Header as child of div root component', () => {
            expect(expectedHeader.type).toBe(Header);
        });

        test('should render Apps as child of div root component', () => {
            expect(expectedAppDetails.type).toBe(Apps);
        });
    });

    describe('selected element for rendering DOM', () => {
        test('should select the correct component for rendering', () => {
            expect((ReactDOM.render as jest.Mock).mock.calls[0][1]).toBe(expectedSelectedDOMElement);
            expect(document.querySelector).toHaveBeenCalledTimes(1);
            expect(document.querySelector).toHaveBeenCalledWith('#app');
        });
    });
});
