import {selectEventTypByEventType} from '../repositories/event-type-repository';

export interface getEventTypeFromRepository {
    (event_type: string): Promise<{
        event_type_id: string,
        event_type: string
    }>
}

export const getEventTypeByEventType = (eventType: string) =>
    selectEventTypByEventType(eventType);
