// cypress/e2e/sample_spec.cy.js
describe('My First Test', () => {
    it('visits the Auctionary homepage', () => {
      cy.visit('https://auctionarygo.netlify.app');
      cy.contains('Welcome to Auctionary');
    });
  });
  