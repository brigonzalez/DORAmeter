import type {
  EventEntity,
  CreateEventInRepository,
  GetLastEventByAppIdAndEventTypeIdInRepository,
} from "../services/event-service";

import { getDBClient } from "../adapters/db-client-adapter";

const EVENT_TABLE = "event";

const insertEvent: CreateEventInRepository = async (event) => {
  const [createdEvent] = await getDBClient()
    .returning("*")
    .insert(event)
    .into(EVENT_TABLE);

  return createdEvent as unknown as EventEntity;
};

const selectLastEventByAppIdAndEventTypeId: GetLastEventByAppIdAndEventTypeIdInRepository =
  async (app_id, event_type_id) => {
    const [event] = await getDBClient()
      .select("event_id", "app_id", "event_type_id", "created_timestamp")
      .from(EVENT_TABLE)
      .where({
        app_id,
        event_type_id,
      })
      .orderBy("created_timestamp");

    return event;
  };

export { insertEvent, selectLastEventByAppIdAndEventTypeId };
