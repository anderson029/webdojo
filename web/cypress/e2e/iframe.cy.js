describe('Tocar o video [IFRAME]', ()=>{

  it('Deve poder tocar o video de exemplo', ()=>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.contains('Video').click()

    cy.get('iframe[title="Video Player"]')
    .should('exist')
    .its('0.contentDocument.body')//pode ter propriedades do elemento, apis, iframes daquela página, nesse caso vamos acessar os novos recursos dos documentos do novo html
    .then(cy.wrap)// recurso para pegar o valor dentro dos objetos
    .as('iFramePlayer')// gravando dentro do alias

    // Após gravar o alias do iframe conseguimnos acessar o novo html e fazer automação normalmente.
    cy.get('@iFramePlayer')
      .find('.play-button')
      .click()
    
    cy.get('@iFramePlayer')
      .find('.pause-button')
      .should('be.visible')
  })
})