import {Server} from 'http';

import fetch from 'node-fetch';

import {LOCALHOST_URL} from '../constants';
import {startServer} from '../../server/server-services/web-server';

let server: Server;

const sleep = (seconds: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });

export const startDORAMeterIfNotRunning = async () => {
    try {
        await fetch(`${LOCALHOST_URL}/healthz`);
    } catch (error) {
        server = await startServer();
        await sleep(1);
    }
};

export const stopDORAMeter = async () => {
    await server.close();
    await sleep(1);
};
