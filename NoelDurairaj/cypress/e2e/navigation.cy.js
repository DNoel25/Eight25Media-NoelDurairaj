describe('Navigation', () => {
	it('navigates to Work page and verifies content', () => {
		cy.visit('/');
		cy.contains('header a, nav a, a', /work/i).first().click({ force: true });
		cy.location('pathname').should('match', /work/i);
		cy.contains(/our work/i, { matchCase: false }).should('be.visible');
	});
});



