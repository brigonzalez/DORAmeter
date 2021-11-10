type EventEntity = {
  event_id: string;
  app_id: string;
  event_type_id: string;
  created_timestamp: string;
};

type Event = {
  id: string;
  appId: string;
  eventTypeId: string;
  createdTimestamp: string;
};

export type { Event, EventEntity };
