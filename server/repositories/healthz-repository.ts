import type { GetRowFromRepository } from "../services/healthz-service";

import { getDBClient } from "../adapters/db-client-adapter";

export const selectOne: GetRowFromRepository = () => getDBClient().select(1);
