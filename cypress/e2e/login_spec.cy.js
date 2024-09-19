// cypress/e2e/login_spec.cy.js
describe('Login Test', () => {
    it('logs in with valid credentials', () => {
      cy.visit('https://auctionarygo.netlify.app/login.html');
      cy.get('input[name="email"]').type('robfil50219@stud.noroff.no');
      cy.get('input[name="password"]').type('Halflife');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); // Verify redirection after login
    });
  });
  