import express from 'express';

import {setGraphQLEndpoint} from './graphql-server';

const PORT = 3000;

export const startServer = () => {
    const app = express();

    setGraphQLEndpoint(app);

    app.listen(PORT, () =>
        console.log(`🚀 Server ready on port ${PORT}`)
    );
};
