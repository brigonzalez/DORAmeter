import joi from "@hapi/joi";

import { logInfo } from "../helpers/logger-helpers";
import { getAppByAppName, createApp } from "./app-service";
import { getEventTypeByEventType } from "./event-type-service";
import { createEvent } from "./event-service";
import type { ApiError } from "../../types/api-error.types";
import type { Event } from "../../types/event.types";

const eventPayloadValidator = joi.object({
  appName: joi.string().required(),
  eventType: joi
    .string()
    .valid(
      "DEPLOYMENT",
      "CODE_COMMITTED",
      "SUCCESSFUL_TEST",
      "UNSUCCESSFUL_TEST"
    )
    .required(),
});

export const registerEvent = async (event: {
  appName: string;
  eventType: string;
}): Promise<Partial<{ event: Event; error: ApiError }>> => {
  const { error } = eventPayloadValidator.validate(event);

  if (error) {
    return {
      error: {
        details: error.message,
        type: "BadRequest",
      },
    };
  }

  logInfo("Registering event");
  let { app } = await getAppByAppName(event.appName);

  if (!app) {
    app = await createApp(event.appName);
  }

  const eventType = await getEventTypeByEventType(event.eventType);

  return {
    event: await createEvent({
      app_id: app.id,
      event_type_id: eventType.id,
    }),
  };
};
