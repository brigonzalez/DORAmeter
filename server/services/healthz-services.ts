import {logError} from '../server-services/logger-service';
import {selectOne} from '../repositories/healthz-repository';

export interface getRowFromRepository {
    (): Promise<void>
}

export const areRepositoriesHealthy = async () => {
    try {
        await selectOne();

        return true;
    } catch (error) {
        logError(error);

        return false;
    }
};
