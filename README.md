# DORAmeter

> A tool for capturing and reporting DORA metrics

This app is used to capture and display [DORA](https://cloud.google.com/devops/) metrics. It requires a Postgres
database to persist metrics that are reported to it. DORAmeter captures data through a RESTful `POST` request on its
`/events` endpoint, with a payload described below in the [Running Locally](#running-locally) section. It uses GraphQL
to query data for its frontend.

### How the metrics are calculated

#### Deployment Frequency

#### Lead Time

#### Mean Time To Restore

#### Change Failure

### Coverage

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-93.98%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-93.33%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-86.84%25-yellow.svg) | ![Lines](https://img.shields.io/badge/Coverage-94.4%25-brightgreen.svg) |

> The above coverage numbers are not accurate because Jest coverage doesn't play nice with integration tests. Coverage 
> above 80% on all code structures are still enforced.

### Running Locally

1. Start with `yarn` and `yarn dev` (Uses Docker to start up app and dependencies)
2. To add data you can run `yarn migrate-seed-data` or by making the following HTTP request:
```
POST localhost:4444/event
JSON Request Body:
{
  "appName": "app a",
  "buildId": "someBuildId",
  "eventType": "DEPLOYMENT" (To be implemented: "CODE_COMMITTED", "SUCCESSFUL_TEST", "UNSUCCESSFUL_TEST")
}
```

This API saves events through a RESTful API and will query those saved events through GraphQL for its frontend. To see 
the data for the UI:
1. Visit `http://localhost:4444/graphql`
2. To retrieve the deployment frequency of "app a" make the following query:
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

### TODO

There's still some work left. I still need to add the capability to report on:
* Lead Time
* Mean Time To Restore
* Change Failure

This project is also being used to try few opinions found 
[here](https://github.com/brigonzalez/DORAmeter/wiki/Opinions)
