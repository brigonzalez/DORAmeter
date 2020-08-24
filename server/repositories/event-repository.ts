import {
    createEventInRepository,
    selectLastEventByAppIdAndEventTypeIdInRepository
} from '../services/domain-services/event-service';

import {getDBClient} from './database-connection';

const EVENT_TABLE = 'event';
const dbClient = getDBClient();

export const insertEvent: createEventInRepository = async (event) => {
    const [createdEvent] = await dbClient
        .returning('*')
        .insert(event)
        .into(EVENT_TABLE);

    return createdEvent;
};

export const selectLastEventByAppIdAndEventTypeId: selectLastEventByAppIdAndEventTypeIdInRepository
    = async (app_id, event_type_id) => {
        const [event] = await dbClient
            .first('event_id', 'app_id', 'event_type_id', 'created_timestamp')
            .from(EVENT_TABLE)
            .where({
                app_id,
                event_type_id
            })
            .orderBy('created_timestamp');

        return event;
    };
