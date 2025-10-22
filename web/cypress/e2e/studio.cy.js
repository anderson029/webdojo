describe('Utilizando o Studio do cypress', () => {
  it('Exemplo do cypress studio', () => {
    cy.visit('https://example.cypress.io')
  
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Kitchen Sink')
  })

  it('deve logar com sucesso', () => {
    cy.visit('http://localhost:3000');
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').type('katana123');
    cy.contains('button', 'Entrar').click();
    cy.get('[data-cy="user-name"]').should('have.text', 'Fernando Papito');
  });
})