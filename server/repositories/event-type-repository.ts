import {getEventTypeFromRepository} from '../services/event-type-service';

import {getDBClient} from './database-connection';

const EVENT_TYPE_TABLE = 'event_type';

export const selectEventTypByEventType: getEventTypeFromRepository = async (event_type: string) => {
    const dbClient = getDBClient();
    const [eventTypeResult] = await dbClient
        .select('event_type_id', 'event_type')
        .from(EVENT_TYPE_TABLE)
        .where({
            event_type
        });

    return eventTypeResult;
};
