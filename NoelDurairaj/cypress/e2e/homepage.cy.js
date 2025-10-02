describe('Homepage', () => {
	it('visits homepage and asserts title contains eight25', () => {
		cy.visit('/');
		cy.title().should('match', /eight25/i);
	});

	it('mobile viewport shows hamburger menu', () => {
		cy.viewport(375, 667);
		cy.visit('/');
		cy.get('button, a')
			.filter('[aria-label*="menu" i], [aria-label*="hamburger" i], .hamburger, .menu-toggle, .mobile-menu, .navbar-toggler')
			.should('be.visible');
	});
});



