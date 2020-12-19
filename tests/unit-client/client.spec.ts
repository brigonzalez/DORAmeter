import Chance from 'chance';
import ReactDOM from 'react-dom';

import Header from '../../client/components/Header';
import AppDetails from '../../client/components/AppDetails';

jest.mock('react-dom');
jest.mock('../../client/components/Header');
jest.mock('../../client/components/AppDetails');

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
            expect(expectedRoot.type).toBe('div');
            expect(expectedRoot.props.className).toBe('app');
        });

        test('should render Header as child of div root component', () => {
            expect(expectedHeader.type).toBe(Header);
        });

        test('should render AppDetails as child of div root component', () => {
            expect(expectedAppDetails.type).toBe(AppDetails);
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
