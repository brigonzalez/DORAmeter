# DORAmeter

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-93.98%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-93.33%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-86.84%25-yellow.svg) | ![Lines](https://img.shields.io/badge/Coverage-94.4%25-brightgreen.svg) |

> A tool for capturing and reporting DORA metrics

This app is a server that is used to capture and display [DORA](https://cloud.google.com/devops/) metrics. It requires a Postgres database to persist metrics that are reported to it.

To capture an event with this app, make the following request:
```
POST domain.com/event
{
  "appName": "myApp",
  "buildId": "someBuildId",
  "eventType": "DEPLOYMENT" | "CODE_COMMITTED" | "SUCCESSFUL_TEST" | "UNSUCCESSFUL_TEST"
}
```

This project is still a WIP.

This project is also being used for testing the relationship between test suite quality and test suite fragility. More info on that [here](https://github.com/brigonzalez/DORAmeter/wiki/Test-Suite-Quality-vs-Test-Suite-Fragility-Experiment)
