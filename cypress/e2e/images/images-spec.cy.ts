describe('Images', () => {
  before(() => {
    cy.task('db:seed');
  });

  it('should have a link to the images page', () => {
    cy.visit('/dashboard/images');
    cy.get('a').contains('Images');
  });

  it('should display the search bar', () => {
    cy.visit('/dashboard/images');
    cy.get('input[placeholder="Search images..."]').should('be.visible');
  });

  it('should display the create image button', () => {
    cy.visit('/dashboard/images');
    cy.get('a').contains('Create Image').should('be.visible');
  });

  it('should display the images table', () => {
    cy.visit('/dashboard/images');
    cy.get('table').should('be.visible');
  });
});
