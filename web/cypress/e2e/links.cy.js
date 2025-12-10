describe('Links abrindo nova guia/janela', ()=> {
  // validando se o link esta indo para o lugar correto, link externo
  it('Validando o atributo do link do Instagram', ()=> {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="instagram-link"]')
    .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
    .and('have.attr', 'target', '_blank')
  })
  //link interno que abre em um nova jenela que precisa ser validado
  it ('Acessa o link dos termos de uso', ()=>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.contains('Formulários').click()

    cy.contains('a', 'termos de uso')
      .invoke('removeAttr', 'target') //.invoke remove o atributo target(responsável por abrir uma nova janela) para poder o termo abrir na mesma janela.
      .click()
    cy.contains('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
      .should('be.visible')
  })
})