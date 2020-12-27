import React from 'react';
import {render, screen} from '@testing-library/react';

import Header from '../../client/components/Header';

import '@testing-library/jest-dom/extend-expect';

describe('header', () => {
    test('renders Header', () => {
        render(<Header />);

        // @ts-ignore
        expect(screen.getByAltText('DORAmeter logo')).toBeInTheDocument();
    });
});
