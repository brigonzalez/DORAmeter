import {
  insertEvent,
  selectLastEventByAppIdAndEventTypeId,
} from "../repositories/event-repository";
import type { EventEntity, Event } from "../../types/event.types";
import { logInfo } from "../helpers/logger-helpers";
import type { ApiError } from "../../types/api-error.types";

interface CreateEventInRepository {
  (event: { app_id: string; event_type_id: string }): Promise<EventEntity>;
}

const createEvent = async (event: {
  app_id: string;
  event_type_id: string;
}): Promise<Event> => {
  logInfo(`Inserting event: event ${JSON.stringify(event, undefined, 2)}`);

  const { event_id, app_id, event_type_id, created_timestamp } =
    await insertEvent(event);

  return {
    appId: app_id,
    createdTimestamp: created_timestamp,
    eventTypeId: event_type_id,
    id: event_id,
  };
};

interface GetLastEventByAppIdAndEventTypeIdInRepository {
  (app_id: string, event_type_id: string): Promise<EventEntity>;
}

const getLastEventByAppIdAndEventTypeId = async (
  appId: string,
  eventTypeId: string
): Promise<Partial<{ event: Event; error: ApiError }>> => {
  logInfo(
    `Selecting last event by appId and eventTypeId: appId: ${appId}, eventTypeId: ${eventTypeId}`
  );

  const eventResult = await selectLastEventByAppIdAndEventTypeId(
    appId,
    eventTypeId
  );

  if (!eventResult) {
    return {
      error: {
        details: "Event not found",
        type: "NotFound",
      },
    };
  }

  const { event_id, app_id, event_type_id, created_timestamp } = eventResult;

  return {
    event: {
      appId: app_id,
      createdTimestamp: created_timestamp,
      eventTypeId: event_type_id,
      id: event_id,
    },
  };
};

export { createEvent, getLastEventByAppIdAndEventTypeId };

export type {
  EventEntity,
  CreateEventInRepository,
  GetLastEventByAppIdAndEventTypeIdInRepository,
};
