import {getAppByAppName, createApp} from './app-service';
import {getEventTypeByEventType} from './event-type-service';
import {createEvent} from './event-service';

export default async (event: {
    appName: string,
    eventType: string,
    buildNumber: string
}) => {
    let app = await getAppByAppName(event.appName);

    if (!app) {
        app = await createApp(event.appName);
    }

    const eventType = await getEventTypeByEventType(event.eventType);

    await createEvent({
        app_id: app.app_id,
        event_type_id: eventType.event_type_id
    });
};
