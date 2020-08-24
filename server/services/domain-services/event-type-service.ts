import {selectEventTypeByEventType} from '../../repositories/event-type-repository';

export interface getEventTypeByEventTypeFromRepository {
    (event_type: string): Promise<{
        event_type_id: string,
        event_type: string
    }>
}

export const getEventTypeByEventType = (eventType: string) =>
    selectEventTypeByEventType(eventType);
