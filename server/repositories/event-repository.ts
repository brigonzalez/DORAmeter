import {createEventInRepository} from '../services/event-service';

import {getDBClient} from './database-connection';

const EVENT_TABLE = 'event';

export const insertEvent: createEventInRepository = async (event) => {
    const dbClient = getDBClient();
    const [createdEvent] = await dbClient
        .returning('*')
        .insert(event)
        .into(EVENT_TABLE);

    return createdEvent;
};
