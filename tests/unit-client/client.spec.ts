import Chance from 'chance';
import {Fragment} from 'react';
import Favicon from 'react-favicon';
import ReactDOM from 'react-dom';

import Layout from '../../client/components/Layout';
// @ts-ignore
import favicon from '../../client/assets/favicon.ico';

jest.mock('react-dom');
jest.mock('react-favicon');
jest.mock('../../client/components/Layout');
jest.mock('../../client/assets/favicon.ico');

describe('client', () => {
    const chance = new Chance();

    let expectedSelectedDOMElement: string,
        expectedRoot: any,
        expectedFavicon: any,
        expectedLayout: any;

    const cacheChildren = (expectedApp: any) => {
        expectedRoot = expectedApp.type();
        [expectedFavicon, expectedLayout] = expectedRoot.props.children;
    };

    beforeAll(() => {
        expectedSelectedDOMElement = chance.string();
        document.querySelector = jest.fn().mockReturnValue(expectedSelectedDOMElement);

        require('../../client/client');

        const expectedApp = (ReactDOM.render as jest.Mock).mock.calls[0][0];

        cacheChildren(expectedApp);
    });

    describe('selected element for rendering DOM', () => {
        test('should select the correct component for rendering', () => {
            expect((ReactDOM.render as jest.Mock).mock.calls[0][1]).toBe(expectedSelectedDOMElement);
            expect(document.querySelector).toHaveBeenCalledTimes(1);
            expect(document.querySelector).toHaveBeenCalledWith('#app');
        });
    });

    describe('rendered elements', () => {
        test('should render div as root component', () => {
            expect(expectedRoot.type).toBe(Fragment);
        });

        test('should render Apps as child of div root component', () => {
            expect(expectedFavicon.type).toBe(Favicon);
            expect(expectedFavicon.props.url).toBe(favicon);
        });

        test('should render Header as child of div root component', () => {
            expect(expectedLayout.type).toBe(Layout);
        });
    });
});
