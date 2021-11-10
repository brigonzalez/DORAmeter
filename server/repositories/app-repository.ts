import type {
  CreateAppInRepository,
  GetAllAppsFromRepository,
  GetAppByAppNameFromRepository,
} from "../services/app-service";

import { getDBClient } from "../adapters/db-client-adapter";

const APP_TABLE = "app";

const selectAppByAppName: GetAppByAppNameFromRepository = async (name) => {
  const [app] = await getDBClient()
    .select("app_id", "name")
    .from(APP_TABLE)
    .where({
      name,
    });

  return app;
};

const insertApp: CreateAppInRepository = async (app) => {
  const [createdApp] = await getDBClient()
    .returning("*")
    .insert(app)
    .into(APP_TABLE);

  return createdApp as unknown as ReturnType<CreateAppInRepository>;
};

const selectAllApps: GetAllAppsFromRepository = () => {
  return getDBClient().select("app_id", "name").from(APP_TABLE);
};

export { selectAppByAppName, insertApp, selectAllApps };
