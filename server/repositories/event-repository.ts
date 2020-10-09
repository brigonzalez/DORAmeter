import {
    createEventInRepository,
    getLastEventByAppIdAndEventTypeIdInRepository
} from '../services/domain-services/event-service';

import {getDBClient} from './database-connection';

const EVENT_TABLE = 'event';

export const insertEvent: createEventInRepository = async (event) => {
    const [createdEvent] = await getDBClient()
        .returning('*')
        .insert(event)
        .into(EVENT_TABLE);

    return createdEvent;
};

export const selectLastEventByAppIdAndEventTypeId: getLastEventByAppIdAndEventTypeIdInRepository
    = async (app_id, event_type_id) => {
        const [event] = await getDBClient()
            .select('event_id', 'app_id', 'event_type_id', 'created_timestamp')
            .from(EVENT_TABLE)
            .where({
                app_id,
                event_type_id
            })
            .orderBy('created_timestamp');

        return event;
    };
