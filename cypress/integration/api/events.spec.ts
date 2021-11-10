/// <reference types="cypress" />

describe("events api", () => {
  describe("post an event", () => {
    describe("a valid payload is passed", () => {
      it("should return a 201 Created with the new event", () => {
        cy.request({
          body: {
            appName: "NewAppName",
            eventType: "DEPLOYMENT",
          },
          method: "POST",
          url: "/api/events",
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.id).to.exist;
          expect(response.body.appId).to.exist;
          expect(response.body.eventTypeId).to.exist;
          expect(response.body.createdTimestamp).to.exist;
        });
      });
    });

    describe("an invalid payload is passed", () => {
      it("should return a 400 BadRequest with the details of the error when an invalid eventType is passed", () => {
        cy.request({
          body: {
            appName: "NewAppName",
            eventType: "NONEXISTENTEVENTTYPE",
          },
          failOnStatusCode: false,
          method: "POST",
          url: "/api/events",
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.deep.eq({
            message:
              '"eventType" must be one of [DEPLOYMENT, CODE_COMMITTED, SUCCESSFUL_TEST, UNSUCCESSFUL_TEST]',
          });
        });
      });

      it("should return a 400 BadRequest with the details of the error when no appName is passed", () => {
        cy.request({
          body: {
            eventType: "NONEXISTENTEVENTTYPE",
          },
          failOnStatusCode: false,
          method: "POST",
          url: "/api/events",
        }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.deep.eq({
            message: '"appName" is required',
          });
        });
      });
    });
  });
});
