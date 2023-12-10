/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Navigation', () => {
  it('should navigate to the dashboard page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "dashboard" and click it
    cy.get('a[href*="dashboard"]').click();

    // The new url should include "/dashboard"
    cy.url().should('include', '/dashboard');

    // The new page should contain an h1 with "Dashboard"
    cy.get('h1').contains('Dashboard');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
