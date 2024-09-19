// cypress/e2e/login_spec.cy.js
describe('Login Test', () => {
    it('logs in with valid credentials', () => {
      // Visit the login page
      cy.visit('https://auctionarygo.netlify.app/login.html');

      // Fill in the email and password fields
      cy.get('#email').type('robfil50219@stud.noroff.no');
      cy.get('#password').type('Halflife');

      // Submit the login form
      cy.get('button[type="submit"]').click();

      // Check for successful login by confirming if the Logout button appears
      cy.get('#logout-btn').should('be.visible');
    });
});
