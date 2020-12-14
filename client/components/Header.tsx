import React from 'react';

import '../css/header.scss';

// @ts-ignore
import DORAmeterLogo from '../assets/DORAmeter-logo@50px.png';

const Header = () =>
    <div className={'header'}>
        <img
            alt={'DORAmeter logo'}
            src={DORAmeterLogo}
        />
    </div>;

export default Header;
