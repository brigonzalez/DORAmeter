import joi from '@hapi/joi';

import {logError, logInfo} from '../../server-infra/logger-service';
import {getAppByAppName, createApp} from '../domain-services/app-service';
import {getEventTypeByEventType} from '../domain-services/event-type-service';
import {createEvent} from '../domain-services/event-service';

const eventPayloadValidator =
    joi.object({
        appName: joi.string().required(),
        buildId: joi.string().required(),
        eventType: joi.string().valid('DEPLOYMENT', 'CODE_COMMITTED', 'SUCCESSFUL_TEST', 'UNSUCCESSFUL_TEST').required()
    });

export default async (event: {
    appName: string,
    buildId: string,
    eventType: string
}): Promise<{
    error: Error | null
}> => {
    try {
        const {error} = eventPayloadValidator.validate(event);

        if (error) {
            return {
                error
            };
        }

        logInfo('Registering event');
        let {app} = await getAppByAppName(event.appName);

        if (!app) {
            app = await createApp(event.appName);
        }

        const eventType = await getEventTypeByEventType(event.eventType);

        await createEvent({
            app_id: app.app_id,
            event_type_id: eventType.event_type_id
        });

        return {
            error: null
        };
    } catch (error) {
        logError(error);

        return {
            error
        };
    }
};
