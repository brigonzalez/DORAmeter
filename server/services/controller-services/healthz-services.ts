import {logError, logInfo} from '../../server-infra/logger-service';
import {selectOne} from '../../repositories/healthz-repository';

export interface getRowFromRepository {
    (): Promise<void>
}

export const areRepositoriesHealthy = async (): Promise<boolean> => {
    try {
        logInfo('Selecting one from DB');
        await selectOne();

        return true;
    } catch (error) {
        logError(error);

        return false;
    }
};
