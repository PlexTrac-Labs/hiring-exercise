/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Login to the application", () => {
  it("opens the web app and logs in", () => {
    //Arrange
    cy.visit("http://localhost:8080");

    //Act
    cy.get("#userNameInput").type("tester");
    cy.get("#passwordInput").type("password");
    cy.get(".btn").click();

    //Assert
    cy.get(".btn-danger").should("contain", "Logout");
  });
});

describe("Logout of the application", () => {
  it("opens the web app and logs in", () => {
    //Arrange
    cy.visit("http://localhost:8080/");

    //Act
    cy.get(".btn-danger").click();

    //Assert
    cy.get(".col-12 > h1").should("contain", "Please Login");
  });
});
