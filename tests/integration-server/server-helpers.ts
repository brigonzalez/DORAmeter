import fetch from 'node-fetch';

import {startServer} from '../../server/server-services/web-server';

let server;

const sleep = (seconds) =>
    new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });

export const startDORAMeterIfNotRunning = async () => {
    try {
        await fetch('http://localhost:4444/healthz');
    } catch (error) {
        server = await startServer();
        await sleep(1);
    }
};

export const stopDORAMeter = async () => {
    await server.close();
    await sleep(1);
};
