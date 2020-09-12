# DORAmeter

| Statements                | Branches                | Functions                | Lines                |
| ------------------------- | ----------------------- | ------------------------ | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

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
