import express from 'express';

import {setGraphQLEndpoint} from './graphql-server';

const PORT = 4000;

export const startServer = () => {
    const app = express();

    setGraphQLEndpoint(app);
    app.use(express.static('dist-client'));

    app.listen(PORT, () =>
        console.log(`🚀 Server ready on port ${PORT}`)
    );
};
