class Home {
  visit() {
    cy.visit('http://localhost:3000/');
  }

  getDashboardLink() {
    return cy.get('a[href*="dashboard"]');
  }

  getDashboardTitle() {
    return cy.get('h1');
  }

  clickDashboardLink() {
    this.getDashboardLink().click();
  }
}
