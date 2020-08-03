import {getDBClient} from './database-connection';

export const selectOne = async () => {
    const dbClient = getDBClient();

    await dbClient.select(1);
};
