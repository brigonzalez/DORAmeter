/// <reference types="cypress" />

describe("deployment-frequencies api", () => {
  describe("get deployment frequencies for all apps", () => {
    it("should return 200 OK with deployment frequencies for all apps", () => {
      cy.request({
        method: "GET",
        url: "/api/deployment-frequencies",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.greaterThan(8);
        expect(response.body[0].rating).to.eq("ELITE");
        expect(response.body[0].appName).to.eq("App A");
      });
    });
  });

  describe("get deployment frequency for an app name", () => {
    describe("making request for an app name that exists", () => {
      it("should return 200 OK with a deployment frequency for an app", () => {
        cy.request({
          method: "GET",
          url: `/api/deployment-frequencies/${encodeURIComponent("App A")}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.rating).to.eq("ELITE");
          expect(response.body.appName).to.eq("App A");
        });
      });
    });

    describe("making request for an app name that does not exist", () => {
      it("should return 404 Not Found with a message", () => {
        cy.request({
          failOnStatusCode: false,
          method: "GET",
          url: "/api/deployment-frequencies/Non-Existing-App",
        }).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.deep.eq({
            message: "App not found",
          });
        });
      });
    });
  });
});
