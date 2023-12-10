describe('Image', () => {
  before(() => {
    cy.task('db:seed');
  });

  it('should find image link on table and click', () => {
    cy.visit('/dashboard/images');
    cy.get('table a').first().click();

    // fix to use faker where it will be easier to get id
    cy.url().should('include', '/dashboard/images/');
  });
});
