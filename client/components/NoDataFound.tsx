import React from 'react';

const NoDataFound = () =>
    <div className={'alert-message'}>
        <p>{'No data found!'}</p>
        <p>
            {'Try making a POST request to the `/event` endpoint with the following request body:'}
            <br /> {/* eslint-disable-line react/forbid-elements, react/jsx-one-expression-per-line */}
            {'{"appName": "app a", "buildId": "someBuildId", "eventType": "DEPLOYMENT" | "CODE_COMMITTED" | "SUCCESSFUL_TEST" | "UNSUCCESSFUL_TEST"}'}
        </p>
    </div>;

export default NoDataFound;
