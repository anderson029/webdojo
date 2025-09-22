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

    /* //span[text()='Pessoa Física']/..//input 
    Primeira forma de realizar a conversão do xpath para cypress encadeando passo a passo
    cy.contains('span', 'Pessoa Física')
      .parent()
      .find('input')
      .check()
    */

      //Segunda forma de converter o xpath, passando o label que elemento pai e buscando por texto que esta dentro do label elemento filho
      cy.contains('label', 'Pessoa Física')
      .find('input')
      .check()
      .should('be.checked')
      .should('exist')

      cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked')
      

    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type('73046653000')
      .should('have.value', '730.466.530-00')
  })
})