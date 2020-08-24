import {insertEvent, selectLastEventByAppIdAndEventTypeId} from '../../repositories/event-repository';

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
    }) =>
    insertEvent(event);

export interface selectLastEventByAppIdAndEventTypeIdInRepository {
    (app_id: string, event_type_id: string): Promise<{
        app_id: string,
        name: string
    }>
}

export const getLastEventByAppIdAndEventTypeId = async (appId: string, eventTypeId: string) =>
    selectLastEventByAppIdAndEventTypeId(appId, eventTypeId);
