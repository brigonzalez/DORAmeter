import Chance from "chance";
import sub from "date-fns/sub";
import fetch from "cross-fetch";

import { getDBClient } from "../../server/adapters/db-client-adapter";
import type { DeploymentFrequency } from "../../types/deployment-frequency.types";

const dbClient = getDBClient();

const insertApp = async (appName: string) => {
  // @ts-ignore
  const [{ app_id }] = await dbClient
    .returning("*")
    .insert({
      name: appName,
    })
    .into("app");

  return app_id;
};

const insertEvent = async (appId: string, createdTimestamp: string) => {
  const [{ event_type_id }] = await dbClient
    .select("event_type_id", "event_type")
    .from("event_type")
    .where({
      event_type: "DEPLOYMENT",
    });

  await dbClient
    .insert({
      app_id: appId,
      created_timestamp: createdTimestamp,
      event_type_id,
    })
    .into("event");
};

const setupTestsForDeploymentFrequency = async (
  appName: string,
  lastDeploymentTimestamp: Date | null
) => {
  const appId = await insertApp(appName);

  if (lastDeploymentTimestamp) {
    await insertEvent(appId, lastDeploymentTimestamp.toISOString());
  }
};

const makeRequestToRetrieveDeploymentFrequency = async (
  appName: string
): Promise<DeploymentFrequency> => {
  const response = await fetch(
    `http://localhost:3000/api/deployment-frequencies/${appName}`
  );

  return (await response.json()) as DeploymentFrequency;
};

describe("deployment frequency query", () => {
  const chance = new Chance();

  describe("elite performing deployment frequency app", () => {
    const elitePerformingAppName = chance.word();
    const lastDeploymentTimestamp = sub(new Date(), {
      hours: chance.integer({
        max: 12,
        min: 1,
      }),
    });

    beforeAll(async () => {
      await setupTestsForDeploymentFrequency(
        elitePerformingAppName,
        lastDeploymentTimestamp
      );
    });

    test("should return elite rating for deployment frequency app", async () => {
      const data = await makeRequestToRetrieveDeploymentFrequency(
        elitePerformingAppName
      );

      expect(data).toMatchObject({
        appName: elitePerformingAppName,
        rating: "ELITE",
      });
    });
  });

  describe("high performing deployment frequency app", () => {
    const highPerformingAppName = `${chance.word()}${chance.word()}`;
    const chanceDays = chance.d6() + 1;
    const lastDeploymentTimestamp = sub(new Date(), {
      days: chanceDays,
    });

    beforeAll(async () => {
      await setupTestsForDeploymentFrequency(
        highPerformingAppName,
        lastDeploymentTimestamp
      );
    });

    test("should return high rating for deployment frequency app", async () => {
      const data = await makeRequestToRetrieveDeploymentFrequency(
        highPerformingAppName
      );

      expect(data).toMatchObject({
        appName: highPerformingAppName,
        rating: "HIGH",
      });
    });
  });

  describe("medium performing deployment frequency app", () => {
    const mediumPerformingAppName = `${chance.word()}${chance.word()}`;
    const lastDeploymentTimestamp = sub(new Date(), {
      weeks: chance.integer({
        max: 3,
        min: 3,
      }),
    });

    beforeAll(async () => {
      await setupTestsForDeploymentFrequency(
        mediumPerformingAppName,
        lastDeploymentTimestamp
      );
    });

    test("should return medium rating for deployment frequency app", async () => {
      const data = await makeRequestToRetrieveDeploymentFrequency(
        mediumPerformingAppName
      );

      expect(data).toMatchObject({
        appName: mediumPerformingAppName,
        rating: "MEDIUM",
      });
    });
  });

  describe("low performing deployment frequency app", () => {
    const lowPerformingAppName = `${chance.word()}${chance.word()}`;
    const lastDeploymentTimestamp = sub(new Date(), {
      months: chance.d4(),
    });

    beforeAll(async () => {
      await setupTestsForDeploymentFrequency(
        lowPerformingAppName,
        lastDeploymentTimestamp
      );
    });

    test("should return low rating for deployment frequency app", async () => {
      const data = await makeRequestToRetrieveDeploymentFrequency(
        lowPerformingAppName
      );

      expect(data).toMatchObject({
        appName: lowPerformingAppName,
        rating: "LOW",
      });
    });
  });

  describe("none performing deployment frequency app", () => {
    describe("deployment event is added for the app", () => {
      const nonPerformingAppName = `${chance.word()}${chance.word()}`;
      const lastDeploymentTimestamp = sub(new Date(), {
        years: chance.d4(),
      });

      beforeAll(async () => {
        await setupTestsForDeploymentFrequency(
          nonPerformingAppName,
          lastDeploymentTimestamp
        );
      });

      test("should return none rating for deployment frequency app", async () => {
        const data = await makeRequestToRetrieveDeploymentFrequency(
          nonPerformingAppName
        );

        expect(data).toMatchObject({
          appName: nonPerformingAppName,
          rating: "NONE",
        });
      });
    });

    describe("deployment event is not added for the app", () => {
      const nonPerformingAppName = `${chance.word()}${chance.word()}`;
      const lastDeploymentTimestamp = new Date(1969, 12, 28);

      beforeAll(async () => {
        await setupTestsForDeploymentFrequency(
          nonPerformingAppName,
          lastDeploymentTimestamp
        );
      });

      test("should return none rating for deployment frequency app", async () => {
        const data = await makeRequestToRetrieveDeploymentFrequency(
          nonPerformingAppName
        );

        expect(data).toMatchObject({
          appName: nonPerformingAppName,
          rating: "NONE",
        });
      });
    });
  });
});
