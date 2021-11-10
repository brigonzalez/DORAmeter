/// <reference types="cypress" />

describe("apps api", () => {
  describe("get list of apps", () => {
    describe("making a request with no filter", () => {
      it("should return 200 OK with a list of Apps", () => {
        cy.request({
          method: "GET",
          url: "/api/apps",
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.length.greaterThan(8);
          expect(response.body).to.deep.include.members([
            {
              id: "faf01d98-04c5-4877-8163-f3c56c56c2da",
              name: "App A",
            },
            {
              id: "f6b54b3d-59e1-4c84-a868-52bbb7f5969f",
              name: "App B",
            },
            {
              id: "f26ed1ca-969b-4dd1-9043-2ac606b89209",
              name: "App C",
            },
          ]);
        });
      });
    });

    describe("filtering by an app name that does exist", () => {
      it("should return a filtered list", () => {
        cy.request({
          method: "GET",
          url: `/api/apps?name=${encodeURIComponent("App B")}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.eq([
            {
              id: "f6b54b3d-59e1-4c84-a868-52bbb7f5969f",
              name: "App B",
            },
          ]);
        });
      });
    });

    describe("filtering by an app name that does not exist", () => {
      it("should return an empty list", () => {
        cy.request({
          failOnStatusCode: false,
          method: "GET",
          url: "/api/apps?name=Non-Existing-App",
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
