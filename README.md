# DORAmeter

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-93.98%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-93.33%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-86.84%25-yellow.svg) | ![Lines](https://img.shields.io/badge/Coverage-94.4%25-brightgreen.svg) |

> A tool for capturing and reporting DORA metrics

This app is a server that is used to capture and display [DORA](https://cloud.google.com/devops/) metrics. It requires a Postgres database to persist metrics that are reported to it.

To test:
1. Start with `yarn` and `yarn dev` (Uses Docker to start up app and dependencies)
2. To capture an event with this app, make the following HTTP request:
```
POST localhost.com/event
{
  "appName": "app a",
  "buildId": "someBuildId",
  "eventType": "DEPLOYMENT" (To be implemented: "CODE_COMMITTED", "SUCCESSFUL_TEST", "UNSUCCESSFUL_TEST")
}
```

This API saves events through a RESTful API and will query those saved events through graphql for its frontend. To see the data for the UI:
1. Visit `http://localhost:4444/graphql`
2. To retrieve `deployment-frequency` make the following query:
```graphql
{
  app(name: "app a") {
    deploymentFrequency {
      lastDeploymentTimestamp
			rating
    }
  }
}
```

This project is still a WIP.

This project is also being used for:
* Testing the relationship between test suite quality and test suite fragility. More info on that [here](https://github.com/brigonzalez/DORAmeter/wiki/Test-Suite-Quality-vs-Test-Suite-Fragility-Experiment)
* Testing some error handling and API dependency opinions. More info on that [here](https://github.com/brigonzalez/DORAmeter/wiki/Opinions)
