describe('Login Page', () => {
  it('should display the login page with the text "Login"', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Check if the page contains the words "Sign In"
    cy.contains('Sign In').should('be.visible');
  });

  it('should log in with valid credentials', () => {
    cy.visit('http://localhost:5173/login');

    // Use environment variables for credentials
    cy.get('#email').type(Cypress.env('basicUsername'));
    cy.get('#password').type(Cypress.env('password'));

    cy.contains('Login').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Signed in as');
  });
});
