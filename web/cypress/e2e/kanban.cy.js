describe('Kanban board', ()=>{
  it('Deve mover uma tarefa de Todo para Done e atualizar o board',()=>{
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.contains('Kanban').click()

    const dataTransfer = new DataTransfer()

    cy.contains('div[draggable=true]', 'Documentar API')
      .trigger('dragstart', {dataTransfer}) // Inicia o click e o arrasta
    
    cy.get('.column-done')
      .trigger('drop', {dataTransfer}) // solta  a task na coluna done
      .find('h3')
      .should('have.text', 'Done (4)')

    cy.get('.column-done')
      .should('include.text', 'Documentar API')
      .and('include.text', 'Criar documentação da API com Swagger')
  })
})