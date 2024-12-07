import { login } from './login.cy.ts';

describe('Create Post', () => {
  it('should login and create a post', () => {
    login('BASIC');

    cy.contains('Ask Question').click();

    cy.contains('Create Post');

    // Fill out the form
    cy.get('#title').type('My Cypress Post Title');
    cy.get('#body').type('This is a small paragraph to test the post content.');

    // We intercept it but let it pass through, so we don't need to mock it as we have our backend in test mode
    cy.intercept('POST', '/api/posts').as('createPost');

    // Submit the form
    cy.contains('Submit').click();

    // Wait for the request to complete and validate its response
    cy.wait('@createPost')
      .its('response')
      .then((response) => {
        expect(response.statusCode).to.eq(201); // Verify the response status
      });

    // Now we check to see whether the new post is being displayed
    cy.contains('My Cypress Post Title').should('be.visible');
    cy.contains('This is a small paragraph to test the post content.').should('be.visible');
  });

  it('Should allow us to edit the post', () => {
    login('ADMIN');

    // To guarantee that we have a post to edit we will create one and this will then redirect us to that page
    cy.contains('Ask Question').click();
    cy.get('#title').type('My Cypress Post Title');
    cy.get('#body').type('This is a small paragraph to test the post content.');
    cy.contains('Submit').click();

    // Now that we have been redirected to the single post page we can check to make sure that the UI is correct
    cy.url().should('include', '/post');
    cy.contains('My Cypress Post Title').should('be.visible');
    cy.contains('This is a small paragraph to test the post content.').should('be.visible');

    // Now lets click on the edit button
    cy.get('[data-testid="edit-button"]').click();

    // This shows that our modal has popped up again to edit it
    cy.contains('Edit Post').should('be.visible');

    // Fill out this form with edited text
    cy.get('#title').clear().type('Updated Post Title');
    cy.get('#body').clear().type('This is the updated content of the post.');
    cy.contains('Submit').click();

    // After the redirect our single post should be displayed with the updated data
    cy.contains('Updated Post Title').should('be.visible');
    cy.contains('This is the updated content of the post.').should('be.visible');
  });

  it('Trending section should exist and we should be able to upvote a post', () => {
    // Standard Login
    login('BASIC');

    // Navigate to trending, clicking on side nav button
    cy.contains('Trending').click();

    // Find the first post in trending - we set our alias
    cy.get('[data-testid="post-in-collection"]').first().as('firstPost').click();

    // We look for the vote count, we then turn our vote count into an integer
    cy.get('[data-testid="vote-count"]')
      .invoke('text')
      .then((voteCountText) => {
        const initialVoteCount = parseInt(voteCountText, 10);

        // Click on the upvote
        cy.get('[data-testid="upvote-button"]').click();

        // Now we get the count as it is now and compare it to how it was (initial vote count)
        cy.get('[data-testid="vote-count"]').should((newVoteCountText) => {
          const newVoteCount = parseInt(newVoteCountText.text(), 10);
          expect(newVoteCount).to.eq(initialVoteCount + 1);
        });
      });
  });
});
