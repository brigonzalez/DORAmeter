import { selectEventTypeByEventType } from "../repositories/event-type-repository";
import { logInfo } from "../helpers/logger-helpers";
import type { EventType } from "../../types/event-type.types";

export interface GetEventTypeByEventTypeFromRepository {
  (event_type: string): Promise<{
    event_type_id: string;
    event_type: string;
  }>;
}

export const getEventTypeByEventType = async (
  eventType: string
): Promise<EventType> => {
  logInfo(`Selecting event type by event type: eventType: ${eventType}`);

  const { event_type_id, event_type } = await selectEventTypeByEventType(
    eventType
  );

  return {
    id: event_type_id,
    type: event_type,
  };
};
