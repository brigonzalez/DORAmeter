import {insertEvent, selectLastEventByAppIdAndEventTypeId} from '../../repositories/event-repository';
import {logInfo} from '../../server-infra/logger-service';

export interface createEventInRepository {
    (event: {
        app_id: string,
        event_type_id: string,
    }): Promise<{
        event_id: string,
        app_id: string,
        event_type_id: string,
    }>
}

export const createEvent = (event: {
        app_id: string,
        event_type_id: string,
    }) => {
    logInfo(`Inserting event: event ${JSON.stringify(event, null, 2)}`);

    return insertEvent(event);
};

export interface getLastEventByAppIdAndEventTypeIdInRepository {
    (app_id: string, event_type_id: string): Promise<{
        event_id: string,
        app_id: string,
        event_type_id: string,
        created_timestamp: string
    }>
}

export const getLastEventByAppIdAndEventTypeId = (appId: string, eventTypeId: string) => {
    logInfo(`Selecting last event by appId and eventTypeId: appId: ${appId}, eventTypeId: ${eventTypeId}`);

    return selectLastEventByAppIdAndEventTypeId(appId, eventTypeId);
};
