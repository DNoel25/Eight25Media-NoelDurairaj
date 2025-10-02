describe('Responsive Check - Mobile View', () => {
  it('displays hamburger menu on mobile viewport', () => {
    // Set mobile viewport size (iPhone 6/7/8 dimensions)
    cy.viewport(375, 667);

    // Visit homepage
    cy.visit('/');

    // Optional: Accept cookies if shown
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

    // ✅ Check if hamburger menu is visible
    cy.get('button, .menu-toggle, .hamburger, .mobile-menu-icon') // Adjust based on actual site
      .filter(':visible')
      .should('exist');
  });
});