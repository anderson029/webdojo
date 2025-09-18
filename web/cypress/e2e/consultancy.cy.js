describe('Formulário de Consultoria',()=>{
  it('Deve solicitar a consultoria individual',()=>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('Formulários', 'Consultoria')

    cy.get('input[placeholder="Digite seu nome completo"]').type("Anderson de Oliveira")
    cy.get('input[placeholder="Digite seu email"]').type("anderson@teste.com")
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(11999991000)
      .should('have.value', '(11) 99999-1000')
    cy.get('#consultancyType').select('In Company')

    /* Exemplo de conversão de xpath para código Cypress
     label[text()="Tipo de Consultoria"]/..//select   */
    cy.contains('label', 'Tipo de Consultoria')
    .parent()
    .find('select')
    .select('Individual')
  })
})