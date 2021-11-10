import knex, { Knex } from "knex";

let pgClient: Knex;

const createPGClient = (): Knex =>
  knex({
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ["dorameter"],
  });

export const getDBClient = (): Knex => {
  if (!pgClient) {
    pgClient = createPGClient();

    return pgClient;
  }

  return pgClient;
};
