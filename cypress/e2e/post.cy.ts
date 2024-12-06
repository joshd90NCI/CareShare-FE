describe('Create Post', () => {
  cy.visit('http://localhost:8080/login');

  // Use environment variables for credentials
  cy.get('#email').type(Cypress.env('basicUsername'));
  cy.get('#password').type(Cypress.env('password'));

  cy.contains('Login').click();

  cy.contains('Ask Question').click();

  cy.contains('Create Post');
});
