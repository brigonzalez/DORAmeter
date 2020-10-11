import {selectEventTypeByEventType} from '../../repositories/event-type-repository';
import {logInfo} from '../../server-infra/logger-service';

export interface getEventTypeByEventTypeFromRepository {
    (event_type: string): Promise<{
        event_type_id: string,
        event_type: string
    }>
}

export const getEventTypeByEventType = (eventType: string) => {
    logInfo(`Selecting event type by event type: eventType: ${eventType}`);

    return selectEventTypeByEventType(eventType);
};
