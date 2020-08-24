import {getEventTypeByEventTypeFromRepository} from '../services/domain-services/event-type-service';

import {getDBClient} from './database-connection';

const EVENT_TYPE_TABLE = 'event_type';
const dbClient = getDBClient();

export const selectEventTypeByEventType: getEventTypeByEventTypeFromRepository = async (event_type: string) => {
    const [eventTypeResult] = await dbClient
        .select('event_type_id', 'event_type')
        .from(EVENT_TYPE_TABLE)
        .where({
            event_type
        });

    return eventTypeResult;
};
