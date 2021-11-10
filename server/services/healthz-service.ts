import { selectOne } from "../repositories/healthz-repository";
import { logError, logInfo } from "../helpers/logger-helpers";

export interface GetRowFromRepository {
  (): Promise<void>;
}

export const areRepositoriesHealthy = async (): Promise<boolean> => {
  try {
    logInfo("Selecting one from DB");
    await selectOne();

    return true;
  } catch (error) {
    logError(error as Error);

    return false;
  }
};
