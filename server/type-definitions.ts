export default `
    type Query {
        teams: [Team]
    }

    type Team {
        id: ID,
        name: String
    }
`;
