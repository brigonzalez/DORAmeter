import type { GetEventTypeByEventTypeFromRepository } from "../services/event-type-service";

import { getDBClient } from "../adapters/db-client-adapter";

const EVENT_TYPE_TABLE = "event_type";

export const selectEventTypeByEventType: GetEventTypeByEventTypeFromRepository =
  async (event_type: string) => {
    const [eventTypeResult] = await getDBClient()
      .select("event_type_id", "event_type")
      .from(EVENT_TYPE_TABLE)
      .where({
        event_type,
      });

    return eventTypeResult;
  };
