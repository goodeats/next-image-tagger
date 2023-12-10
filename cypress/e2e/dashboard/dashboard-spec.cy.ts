/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Dashboard', () => {
  before(() => {
    cy.task('db:seed');
  });

  it('should have sidenav with links', () => {
    // const home = new Home
    cy.visit('/dashboard');

    cy.get('a').contains('Home');
    cy.get('a').contains('Images');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
