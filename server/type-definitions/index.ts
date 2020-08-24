import {gql} from 'apollo-server-express';

export default gql`
    type Query {
        app: App!
    }

    type App {
        id: ID!,
        name: String!
        deploymentFrequency: DeploymentFrequency!
    }
    
    type DeploymentFrequency {
        rating: Rating!
        lastDeploymentTimestamp: String!
        followingDeploymentTimestamp: String!
    }
    
    enum Rating {
        ELITE
        HIGH
        MEDIUM
        LOW
        NONE
    }
`;
