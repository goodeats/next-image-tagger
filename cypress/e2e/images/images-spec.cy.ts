import { imagesSeedJson } from './../../../prisma/seed-data';

describe('Images', () => {
  before(() => {
    cy.task('db:seed');
  });

  beforeEach(() => {
    const images = imagesSeedJson.map((image) => {
      cy.intercept('GET', image.url, {
        fixture: 'images/images/pat_400x400.jpg',
      });
    });

    cy.visit('/dashboard/images');
  });

  context('breadcrumbs', () => {
    it('should have a link to the images page', () => {
      cy.get('a').contains('Images');
    });
  });

  context('create image link', () => {
    it('should navigate to /dashboard/images/new page when Create Image button is clicked', () => {
      cy.get('a').contains('Create Image').click();
      cy.url().should('include', '/dashboard/images/new');
    });
  });

  context('images table', () => {
    it('should display the images table headers', () => {
      cy.get('table').within(() => {
        cy.get('th').should('have.length', 6);
        cy.get('th').eq(0).should('contain', 'Image');
        cy.get('th').eq(1).should('contain', 'Title');
        cy.get('th').eq(2).should('contain', 'Collection');
        cy.get('th').eq(3).should('contain', 'Date Added');
        cy.get('th').eq(4).should('contain', 'Tags');
        cy.get('th').eq(5).should('contain', 'Edit or Delete');
      });
    });

    it('should display the images table row content', () => {
      const images = sortedImages();
      const image = images[0];

      cy.get('table').within(() => {
        cy.get('tbody tr').should('have.length', imagesSeedJson.length);
        cy.get('tbody tr')
          .first()
          .within(() => {
            cy.get('td').should('have.length', 6);

            // image
            cy.get('td').eq(0).find('a').find('img').should('be.visible');

            // title
            cy.get('td').eq(1).find('a').should('contain', image.title);

            // collection
            cy.get('td')
              .eq(2)
              .find('a')
              .should('contain', image.collectionName || 'n/a');

            // date added
            cy.get('td').eq(3).should('be.visible');

            // tags
            cy.get('td').eq(4).find('a').should('contain', '2');

            // Edit and delete buttons
            cy.get('td').eq(5).find('a').should('have.length', 1);
            cy.get('td').eq(5).find('button').should('have.length', 1);
          });
      });
    });
  });

  context('image search bar', () => {
    it('should display the search bar', () => {
      cy.get('input[placeholder="Search images..."]').should('be.visible');
    });

    it('should display the search results', () => {
      const images = sortedImages();
      const image = images[0];
      const { title } = image;

      cy.get('input[placeholder="Search images..."]').should('be.visible');
      cy.get('input[placeholder="Search images..."]').type(title);
      cy.get('table').within(() => {
        cy.get('tbody tr').should('have.length', 1);
      });
    });
  });
});

const sortedImages = () =>
  imagesSeedJson.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();

    if (aTitle < bTitle) return -1;
    if (aTitle > bTitle) return 1;
    return 0;
  });
