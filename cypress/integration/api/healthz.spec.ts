/// <reference types="cypress" />

describe("healthz api", () => {
  it("should return 200 OK", () => {
    cy.request({
      method: "GET",
      url: "/api/healthz",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq({
        database: "OK",
        server: "OK",
      });
    });
  });
});
