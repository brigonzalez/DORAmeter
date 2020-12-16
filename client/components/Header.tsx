import React from 'react';

import '../css/header.scss';

// @ts-ignore
import DORAmeterLogo from '../assets/DORAmeter-logo.svg';

const Header = () =>
    <div className={'header'}>
        <img
            alt={'DORAmeter logo'}
            className={'dorameter-logo'}
            src={DORAmeterLogo}
        />
    </div>;

export default Header;
