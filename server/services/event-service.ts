import {insertEvent} from '../repositories/event-repository';

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
