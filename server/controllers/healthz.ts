import {selectOne} from '../repositories/healthz-repository';

export const handler = () => {
    selectOne();
};

export const path = '/healthz';
