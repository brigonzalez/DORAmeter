import React from 'react';

// @ts-ignore
import EliteBadge from '../assets/Elite-Badge.svg';
// @ts-ignore
import HighBadge from '../assets/High-Badge.svg';
// @ts-ignore
import MediumBadge from '../assets/Medium-Badge.svg';
// @ts-ignore
import LowBadge from '../assets/Low-Badge.svg';
// @ts-ignore
import NoneBadge from '../assets/None-Badge.svg';

const badgeMap = {
    ELITE: EliteBadge,
    HIGH: HighBadge,
    LOW: LowBadge,
    MEDIUM: MediumBadge,
    NONE: NoneBadge
};

const metricDisplayNameMap = {
    CF: 'Change Failure',
    DF: 'Deployment Frequency',
    LT: 'Lead Time',
    MTTR: 'Mean Time to Restore Service'
};

const AppMetricDetail = ({rating, metric}) =>
    <div className={'app-metric-detail'}>
        <div>{`${metricDisplayNameMap[metric]}: `}</div>
        <img
            alt={`${metricDisplayNameMap[metric]} badge`}
            src={badgeMap[rating]}
        />
    </div>;

export default AppMetricDetail;
