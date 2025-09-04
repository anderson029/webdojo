describe('Formulário de Consultoria',()=>{
  it('Deve solicitar a consultoria individual',()=>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.goTo('button','Formulários')
  })
})