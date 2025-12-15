describe('Gereciamento de perfis do gitHub', ()=> {

beforeEach(()=>{
  cy.login()
  cy.goTo('Tabela', 'Perfis do GitHub')

})
  it('Deve poder cadastrar um novo perfil no gitHub',()=>{
    cy.log('todo')
    cy.get('#name').type('Anderson')
    cy.get('#username').type('anderson029')
    cy.get('#profile').type('QA')

    cy.contains('button', 'Adicionar Perfil').click()
  })

})