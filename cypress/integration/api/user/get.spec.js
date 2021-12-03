/* eslint-disable no-undef */
/// <reference types="cypress" />
let propertyArray = [
  "_id",
  "firstName",
  "lastName",
  "email",
  "admin",
  "favoriteColor",
  "birthYear"
];

describe("GET requests", () => {
  context("GET /user", () => {
    it("should return a list of all users", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:5000/user"
      }).should(response => {
        //cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200);
        expect(response.body[0]).to.have.property(propertyArray[0]);
        //TODO add more property tests
      });
    });
  });
  // FIXME brittle test > mock user and response
  context("GET /user/{userId}", () => {
    it("should return a specific user", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:5000/user/61a7045e50085a313846b330"
      }).should(response => {
        //cy.log(JSON.stringify(response.body))
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property(propertyArray[1], "Nikko");
        expect(response.body).to.have.property(propertyArray[2], "Armstrong");
      });
    });
  });
});
