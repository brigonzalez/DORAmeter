import Chance from 'chance';
import ReactDOM from 'react-dom';

jest.mock('react-dom');

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
            const resourceComponent = adminComponent.props.children;

            expect(resourceComponent.props.name).toBe('users');
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
