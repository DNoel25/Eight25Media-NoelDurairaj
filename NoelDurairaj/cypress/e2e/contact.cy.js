describe('Contact Form', () => {
	it('fills contact form with sample data and asserts values', () => {
		cy.fixture('contact').then((data) => {
			// Navigate via site UI to avoid hard-coded path differences
			cy.visit('/');
			cy.contains('header a, nav a, a', /contact|let.?s\s*talk/i).first().click({ force: true });
			cy.location('pathname').should('match', /(contact|lets-talk)/i);

			// Dismiss cookie banner if present
			cy.get('body').then(($body) => {
				const hasConsent = $body.find('button, a').filter((_, el) => /accept|agree|got\s*it|okay|ok/i.test(el.textContent || '')).length > 0;
				if (hasConsent) {
					cy.contains('button, a', /accept|agree|got\s*it|okay|ok/i).click({ force: true });
				}
			});

			// Wait for any visible inputs or textareas (some pages don't use a <form>)
			cy.get('input:visible, textarea:visible', { timeout: 10000 }).should('exist');

			const nameSelectors = [
				'input[name*="name" i]',
				'input[name*="full" i]',
				'input[id*="name" i]',
				'input[placeholder*="name" i]'
			];
			const emailSelectors = [
				'input[type="email"]',
				'input[name*="email" i]',
				'input[id*="email" i]'
			];
			const messageSelectors = [
				'textarea[name*="message" i]',
				'textarea[id*="message" i]',
				'textarea[placeholder*="message" i]',
				'textarea'
			];

			function getByLabelOrFallback(labelRegex, fallbackSelectors) {
				return cy.get('label', { timeout: 0 }).then(($labels) => {
					const labels = Array.from($labels);
					const match = labels.find((l) => labelRegex.test((l.textContent || '').trim()));
					if (match) {
						const forId = match.getAttribute('for');
						if (forId) {
							return cy.get(`#${forId}`);
						}
						const $candidate = Cypress.$(match)
							.closest('label, div, section, form')
							.find('input, textarea')
							.first();
						if ($candidate.length) {
							return cy.wrap($candidate);
						}
					}
					return cy.get(fallbackSelectors.join(',')).filter(':visible').first();
				});
			}

			function typeIntoField(chainable, text) {
				chainable.scrollIntoView().clear().type(text, { delay: 0 }).should('have.value', text);
			}

			getByLabelOrFallback(/name|full\s*name/i, nameSelectors).then(($el) => typeIntoField(cy.wrap($el), data.name));
			getByLabelOrFallback(/email/i, emailSelectors).then(($el) => typeIntoField(cy.wrap($el), data.email));
			getByLabelOrFallback(/message|how\s*can\s*we\s*help/i, messageSelectors).then(($el) => typeIntoField(cy.wrap($el), data.message));

			// Ensure we did not submit and remain on a contact-like path
			cy.location('pathname').should('match', /(contact|lets-talk)/i);
		});
	});
});


