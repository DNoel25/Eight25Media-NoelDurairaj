describe('Contact Form', () => {
  beforeEach(() => {
    // Make sure we’re testing on a desktop viewport
    cy.viewport(1280, 800);
  });

  it('fills contact form with sample data and asserts values', () => {
    cy.fixture('contact').then((data) => {
      // Visit homepage
      cy.visit('/');

      // Click on Contact or Let's Talk link
      cy.contains('header a, nav a, a', /contact|let.?s\s*talk/i)
        .first()
        .click({ force: true });

      // Confirm navigation to Contact page
      cy.location('pathname').should('match', /(contact|lets-talk)/i);

      // Dismiss cookie consent banner if present
      cy.get('body').then(($body) => {
        const hasConsent = $body
          .find('button, a')
          .filter((_, el) =>
            /accept|agree|got\s*it|okay|ok/i.test(el.textContent || '')
          ).length > 0;
        if (hasConsent) {
          cy.contains('button, a', /accept|agree|got\s*it|okay|ok/i).click({ force: true });
        }
      });

      // Wait for visible inputs/textareas to ensure form is loaded
      cy.get('input:visible, textarea:visible', { timeout: 10000 }).should('exist');

      // Fill and assert Name field
      cy.get('#your-name')
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(data.name, { force: true })
        .should('have.value', data.name);

      // Fill and assert Email field
      cy.get('#your-email')
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(data.email, { force: true })
        .should('have.value', data.email);

      // Fill and assert Message field (fixed selector)
      cy.get('textarea.wpcf7-textarea') // Adjust this selector if needed based on actual form
        .scrollIntoView()
        .should('be.visible')
        .clear()
        .type(data.message, { force: true })
        .should('have.value', data.message);

      // Final confirmation that all values are correct
      cy.get('#your-name').should('have.value', data.name);
      cy.get('#your-email').should('have.value', data.email);
      cy.get('textarea.wpcf7-textarea').should('have.value', data.message);

      // Note: No form submission required for this test
    });
  });
});
